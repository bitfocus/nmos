import * as changeCase from "change-case";

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

/** Generate the types for a portion of a NMOS standard */
export class NMOSApiGenerator {
	public typeDefinitionLines: string[] = [];

	constructor(
		private readonly schemaResources: Map<string, string>,
		private readonly traits: any = {},
	) {}

	/** Run the generator */
	public async generate(name: string, raml: any): Promise<string[]> {
		const lines: string[] = [];

		lines.push(`export class ${name} extends runtime.BaseAPI {`);

		const prefixIndex = raml.baseUri.indexOf("/x-nmos/");
		if (prefixIndex === -1) throw new Error("No /x-nmos/ in `baseUri`");
		const version = raml.version;
		const prefix = raml.baseUri
			.slice(prefixIndex + 7)
			.replace("{version}", version);

		lines.push(...(await this.#processResources(prefix, "", raml)));

		lines.push(`}`);

		return lines;
	}

	/**
	 * Generate a resource
	 * @param uriPrefix Prefix for the resource
	 * @param pathPrefix Path for the resouce
	 * @param ramlResources RAML to parse
	 * @returns Typescript code lines
	 */
	async #processResources(
		uriPrefix: string,
		pathPrefix: string,
		ramlResources: any,
	): Promise<string[]> {
		const lines: string[] = [];

		let methodName =
			ramlResources.displayName ||
			changeCase.camelCase(pathPrefix.replace(/\//g, " "));

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

		const fallbackUriParameters: Record<string, any> = {};
		for (const match of pathPrefix.matchAll(/{(\w+)}/g)) {
			// is-05 is missing some value definitions
			fallbackUriParameters[match[1]] = { type: "string" };
		}

		for (const [id, resource] of Object.entries(ramlResources)) {
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
						{
							...fallbackUriParameters,
							...ramlResources.uriParameters,
						},
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
				id === "uriParameters" ||
				id === "description"
			) {
				// Ignore other raml properties
			} else {
				throw new Error(`Unknown resource/verb: ${id}`);
			}
		}

		return lines;
	}

	/**
	 * Generate a method
	 * @param uriPath Path for the method
	 * @param displayName Name to display for the method
	 * @param verb HTTP verb of the method
	 * @param uriParameters URI parameters
	 * @param resource RAML for the resouce
	 * @returns Typescript code lines
	 */
	async #processMethod(
		uriPath: string,
		displayName: string,
		verb: string,
		uriParameters: Record<string, any>,
		resource: any,
	): Promise<string[]> {
		const lines: string[] = [];

		// TODO - handle traits

		let docs = [];
		if (resource.description) {
			docs.push(resource.description.split("\n"));
		}

		const methodName = changeCase.camelCase(`${displayName} ${verb}`);

		let paramsReplace = "";
		let methodArgs: string[] = [];
		let methodArgsNames: string[] = [];
		let methodGuards: string[] = [];
		for (const [id, param] of Object.entries<any>(uriParameters)) {
			let type: string;
			switch (param.type) {
				case "string":
					type = "string";
					break;
				default:
					throw new Error("Bad param type");
			}

			paramsReplace += `.replace("{${id}}", encodeURIComponent(String(${id})))`;
			methodArgs.push(`${id}: ${type}`);
			methodArgsNames.push(id);

			methodGuards.push(
				`if (${id} === null || ${id} === undefined) {`,
				`\tthrow new runtime.RequiredError('${id}', 'Required parameter ${id} was null or undefined when calling ${methodName}.');`,
				`}`,
				"",
			);

			docs.push(
				`@param ${id} ${param.description || param.displayName || ""}`,
			);
		}

		const hasBody = !!resource.body;
		if (hasBody) {
			let bodyType = "unknown";
			if (typeof resource.body.type === "string") {
				const newType = this.schemaResources.get(resource.body.type);
				if (!newType) {
					throw new Error(
						`Schema not loaded for API: ${resource.body.type}`,
					);
				}
				bodyType = `schemas.${newType}`;
			} else if (resource.body.type.type === "!include") {
				const newType = this.schemaResources.get(
					resource.body.type.data,
				);
				if (!newType) {
					throw new Error(
						`Schema not loaded for API: ${resource.body.type.data}`,
					);
				}
				bodyType = `schemas.${newType}`;
			} else {
				throw new Error(
					`Unsupported response contents: ${JSON.stringify(
						resource.body,
					)}`,
				);
			}

			methodArgs.push(`body: ${bodyType}`);
			methodArgsNames.push("body");
		}

		const hasQuery =
			resource.queryParameters &&
			Object.keys(resource.queryParameters).length > 0;
		if (hasQuery) {
			const queryType = changeCase.pascalCase(`Query ${methodName}`);
			methodArgs.push(`queryParameters?: ${queryType}`);
			methodArgsNames.push("queryParameters");

			this.typeDefinitionLines.push(`export interface ${queryType} {`);

			for (const [key, param] of Object.entries<any>(
				resource.queryParameters,
			)) {
				if (param) {
					// TODO - test/verify this route some more
					let paramType = param.type ?? "any";
					if (paramType.enum) {
						paramType = paramType.enum
							.map((v: any) => `"${v}"`)
							.join(" | ");
					}

					this.typeDefinitionLines.push(`\t${key}?: ${paramType}`);
				} else {
					// No type info
					this.typeDefinitionLines.push(`\t${key}?: any`);
				}
			}

			this.typeDefinitionLines.push("}", "");
		}

		let returnType: string | undefined;
		// TODO - error responses?
		if (resource.responses[200] && resource.responses[200].body) {
			const responseInfo = resource.responses[200].body;
			if (typeof responseInfo.type === "string") {
				const newType = this.schemaResources.get(responseInfo.type);
				if (!newType) {
					throw new Error(
						`Schema not loaded for API: ${responseInfo.type}`,
					);
				}
				returnType = `schemas.${newType}`;
			} else if (responseInfo.type.type === "!include") {
				const newType = this.schemaResources.get(
					responseInfo.type.data,
				);
				if (!newType) {
					throw new Error(
						`Schema not loaded for API: ${responseInfo.type.data}`,
					);
				}
				returnType = `schemas.${newType}`;
			} else {
				throw new Error(
					`Unsupported response contents: ${JSON.stringify(
						responseInfo,
					)}`,
				);
			}
		}

		const hasPagination = resource.is?.includes("paged");
		const hasRql = resource.is?.includes("rql");
		const hasDowngrade = resource.is?.includes("downgrade");
		const hasAncestry = resource.is?.includes("ancestry");

		if (hasPagination) {
			// TODO - this should also be reflected in the response type?
			const trait = this.traits["paged"];
			for (const [key, value] of Object.entries<any>(trait)) {
				// TODO
			}
		}

		if (docs.length > 0) {
			docs = ["/**", ...docs.map((l) => ` * ${l}`), "**/"];
		}

		methodArgs.push(
			`initOverrides?: RequestInit | runtime.InitOverrideFunction`,
		);
		methodArgsNames.push("initOverrides");

		lines.push(
			...docs,
			`public async ${methodName}Raw (${methodArgs.join(
				", ",
			)}): Promise<runtime.ApiResponse<${returnType ?? "void"}>> {`,
			...methodGuards.map((l) => `\t${l}`),
			"\tconst headerParameters: runtime.HTTPHeaders = {};",
			"\tconst response = await this.request({",
			`\t\tpath: '${uriPath}'${paramsReplace},`,
			`\t\tmethod: '${verb.toUpperCase()}',`,
			"\t\theaders: headerParameters,",
			hasBody ? "\t\tbody: body || {}," : "", // TODO sanitise?
			hasQuery
				? "\t\tquery: (queryParameters || {}) as any,"
				: "\t\tquery: {},",
			"\t}, initOverrides);",
			returnType
				? "\treturn new runtime.JSONApiResponse(response);"
				: "\treturn new runtime.VoidApiResponse(response);", // TODO - wrap result for pagination headers?
			// "\treturn new runtime.JSONApiResponse(response, (jsonValue) => Blueprint200ResponseFromJSON(jsonValue));", // TODO sanitise?
			"}",
			"",
		);

		lines.push(
			...docs,
			`public async ${methodName} (${methodArgs.join(", ")}): Promise<${
				returnType ?? "void"
			}> {`,
			`\tconst response = await this.${methodName}Raw(${methodArgsNames.join(
				", ",
			)});`,
			"\treturn await response.value();",
			"}",
			"",
		);

		return lines.map((l) => `\t${l}`);
	}
}
