import * as fs from "fs/promises";
import { compileFromFile } from "json-schema-to-typescript";
import { bundle } from "@apidevtools/json-schema-ref-parser";
import path from "path";
import cp from "child_process";
import { readRamlFile2 } from "./lib.mjs";
import camelcase from "camelcase";

const HTTP_VERBS = [
	"get",
	"post",
	"put",
	"delete",
	"head",
	"options",
	"trace",
	"patch",
	"connect",
];

export class Generator {
	constructor(
		private readonly sourcePath: string,
		private readonly destPath: string,
	) {}

	public async run(): Promise<void> {
		await fs.mkdir(this.destPath, { recursive: true });

		await this.#compileSchemas();
		await this.#generateApis();
	}

	async #compileSchemas(): Promise<void> {
		const schemas: string[] = [];
		const files = await fs.readdir(path.join(this.sourcePath, "schemas"));
		for (const file of files) {
			if (!file.endsWith(".json")) continue;

			const schema = await compileFromFile(
				path.join(this.sourcePath, "schemas", file),
				{
					cwd: path.join(this.sourcePath, "schemas"),
					declareExternallyReferenced: false,
					additionalProperties: false,
				},
			);

			schemas.push(schema);
		}

		// TODO - parse ts and stip out duplicates

		await fs.writeFile(
			path.join(this.destPath, "schemas.ts"),
			schemas.join("\n\n"),
		);
	}

	async #generateApis(): Promise<void> {
		const names: string[] = [];

		const files = await fs.readdir(this.sourcePath);
		for (const file of files) {
			if (!file.endsWith(".raml")) continue;

			const name = await this.#generateApi(file);
			names.push(name);
		}

		// TODO - generate more in here?
		const lines = names.map((name) => `export * from './${name}.js'`);
		lines.push(`export * from './schemas.js'`);

		await fs.writeFile(
			path.join(this.destPath, `index.ts`),
			lines.join("\n"),
		);
	}

	async #generateApi(filename: string): Promise<string> {
		const lines = [
			`/* eslint-disable */`,
			`import * as runtime from '../../../base.js'`,
			`import * as schemas from './schemas.js'`,
			"",
		];

		const name = path.parse(filename).name;

		lines.push(`export class ${name} extends runtime.BaseAPI {`);

		const raml = await readRamlFile2(path.join(this.sourcePath, filename));

		const prefixIndex = raml.baseUri.indexOf("/x-nmos/");
		if (prefixIndex === -1) throw new Error("No /x-nmos/ in `baseUri`");
		const prefix = raml.baseUri.slice(prefixIndex + 7);
		// .replace("{version}", version); // TODO

		lines.push(...(await this.#processResources(prefix, "", raml)));

		// TODO

		lines.push(`}`);

		await fs.writeFile(
			path.join(this.destPath, `${name}.ts`),
			lines.join("\n"),
		);

		return name;
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
			// console.log("m", match);
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
					...(await this.processMethod(
						pathPrefix,
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

	async processMethod(
		uriPath: string,
		displayName: string,
		verb: string,
		uriParameters: any,
		resource: any,
	): Promise<string[]> {
		const lines: string[] = [];

		// TODO - handle traits
		// TODO - handle queryParameters
		// TODO - responses
		// TODO - type

		console.log("TODO method", uriPath, verb);
		// TODO - equivalent to listMethods

		const methodName = camelcase(`${displayName} ${verb}`);
		const returnType = "any";

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

			// TODO
			// methodGuards.push(`if () {}`)
		}

		// .replace(
		// 	`{\${\"blueprintId\"}}`,
		// 	encodeURIComponent(String(requestParameters.blueprintId)),
		// );

		lines.push(
			`public async ${methodName}(${methodArgs.join(
				", ",
			)}): Promise<${returnType}> {`,
			...methodGuards.map((l) => `\t${l}`),
			"\tconst queryParameters: any = {};",
			"\tconst headerParameters: runtime.HTTPHeaders = {};",
			"\tconst response = await this.request({",
			`\t\tpath: '${uriPath}'${paramsReplace},`,
			`\t\tmethod: '${verb.toUpperCase()}',`,
			"\t\theaders: headerParameters,",
			"\t\tquery: queryParameters,",
			// "\t}, initOverrides);",
			"\t}, {});", // TODO
			"\treturn new runtime.JSONApiResponse(response);",
			// "\treturn new runtime.JSONApiResponse(response, (jsonValue) => Blueprint200ResponseFromJSON(jsonValue));", // TODO
			"}",
			"",
		);

		//  if (requestParameters.blueprintId === null || requestParameters.blueprintId === undefined) {
		//     throw new runtime.RequiredError('blueprintId','Required parameter requestParameters.blueprintId was null or undefined when calling blueprint.');
		// }

		return lines.map((l) => `\t${l}`);
	}
}
