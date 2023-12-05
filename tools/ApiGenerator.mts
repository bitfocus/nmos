import camelcase from "camelcase";
import { HTTP_VERBS } from "./Generator2.mjs";

export class ApiGenerator {
	public async generate(name: string, raml: any): Promise<string[]> {
		const lines = [
			`/* eslint-disable */`,
			`import * as runtime from '../../../base.js'`,
			`import * as schemas from './schemas.js'`,
			"",
		];

		lines.push(`export class ${name} extends runtime.BaseAPI {`);

		const prefixIndex = raml.baseUri.indexOf("/x-nmos/");
		if (prefixIndex === -1) throw new Error("No /x-nmos/ in `baseUri`");
		const version = raml.version;
		const prefix = raml.baseUri
			.slice(prefixIndex + 7)
			.replace("{version}", version);

		lines.push(...(await this.#processResources(prefix, "", raml)));

		// TODO
		lines.push(`}`);

		return lines;
	}

	async #processResources(
		uriPrefix: string,
		pathPrefix: string,
		ramlResources: any,
	): Promise<string[]> {
		// Note: equivalent to `recurseResources`
		const lines: string[] = [];

		let methodName =
			ramlResources.displayName ||
			camelcase(pathPrefix.replace(/\//g, " "));

		for (const match of methodName.matchAll(/{(\w+)}/g)) {
			let keyword: string;
			if (match[1].endsWith("Id")) {
				keyword = "by";
			} else if (match[1].endsWith("Type")) {
				keyword = "of";
			} else {
				throw new Error(`Unhandled parameter naming: ${match[1]}`);
			}
			methodName = methodName.replace(
				`{${match[1]}}`,
				`${keyword} ${match[1]}`,
			);
		}

		for (const [id, resource] of Object.entries(ramlResources)) {
			// TODO - listMethods has some overlap, and we want to ensure we don't miss any keys
			if (id.startsWith("/")) {
				lines.push(
					...(await this.#processResources(
						uriPrefix,
						pathPrefix + id,
						resource,
					)),
				);
			} else if (HTTP_VERBS.includes(id)) {
				lines.push(
					...(await this.#processMethod(
						uriPrefix + pathPrefix,
						methodName,
						id,
						{ ...ramlResources.uriParameters },
						resource,
					)),
				);
			} else if (
				id === "title" ||
				id === "baseUri" ||
				id === "version" ||
				id === "mediaType" ||
				id === "types" ||
				id === "documentation" ||
				id === "traits" ||
				id === "displayName" ||
				id === "uriParameters"
			) {
				// Ignore other raml properties
			} else {
				throw new Error(`Unknown resource/verb: ${id}`);
			}
		}

		return lines;
	}

	async #processMethod(
		uriPath: string,
		displayName: string,
		verb: string,
		uriParameters: any,
		resource: any,
	): Promise<string[]> {
		// Note: equivalent to listMethods
		const lines: string[] = [];

		// TODO - handle traits
		// TODO - handle queryParameters
		// TODO - type

		const methodName = camelcase(`${displayName} ${verb}`);

		let paramsReplace = "";
		let methodArgs: string[] = [];
		let methodGuards: string[] = [];
		for (const [id, param] of Object.entries<any>(uriParameters)) {
			let type: string;
			switch (param.type) {
				case "string":
					type = "string";
					// assertKnownKeys(param, [
					// 	// Parser builtin:
					// 	"displayName",
					// 	"key",
					// 	"required",
					// 	"typePropertyKind",
					// 	// Useful:
					// 	"name",
					// 	"type",
					// 	"pattern",
					// 	"enum",
					// ]);
					// schema = {
					// 	type: "string",
					// 	pattern: param.pattern,
					// 	enum: param.enum,
					// };
					break;
				default:
					throw new Error("Bad param type");
			}

			paramsReplace += `.replace("{${id}}", ${id})`;
			methodArgs.push(`${id}: ${type}`);

			methodGuards.push(
				`if (${id} === null || ${id} === undefined) {`,
				`\tthrow new runtime.RequiredError('${id}', 'Required parameter ${id} was null or undefined when calling ${methodName}.');`,
				`}`,
				"",
			);
		}

		let returnType: any;
		// TODO - error responses?
		if (resource.responses[200]) {
			returnType = "unknown"; //
		}

		lines.push(
			`public async ${methodName}(${methodArgs.join(
				", ",
			)}): Promise<runtime.ApiResponse<${returnType ?? "void"}>> {`,
			...methodGuards.map((l) => `\t${l}`),
			"\tconst queryParameters: any = {};",
			"\tconst headerParameters: runtime.HTTPHeaders = {};",
			"\tconst response = await this.request({",
			`\t\tpath: '${uriPath}'${paramsReplace},`,
			`\t\tmethod: '${verb.toUpperCase()}',`,
			"\t\theaders: headerParameters,",
			"\t\tquery: queryParameters,",
			// "\t}, initOverrides);",
			"\t}, {});",
			returnType
				? "\treturn new runtime.JSONApiResponse(response);"
				: "\treturn new runtime.VoidApiResponse(response);",
			// "\treturn new runtime.JSONApiResponse(response, (jsonValue) => Blueprint200ResponseFromJSON(jsonValue));", // TODO
			"}",
			"",
		);

		return lines.map((l) => `\t${l}`);
	}
}
