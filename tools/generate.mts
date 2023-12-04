import { getRamlFiles, getVersions, readRamlFile } from "./lib.mjs";
import path from "path";
import { rimraf } from "rimraf";
import { fileURLToPath } from "url";
import * as cp from "child_process";
import fs from "fs-extra";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const generatedBasePath = path.join(__dirname, "../src/generated");

async function legacy() {
	// Delete previous generation
	await rimraf(generatedBasePath).catch(() => null);
	await fs.mkdir(generatedBasePath, { recursive: true });

	const standards = ["is-04", "is-05"];

	for (const standard of standards) {
		const versions = await getVersions(standard);
		for (const version of versions) {
			await fs.mkdir(path.join(generatedBasePath, standard, version), {
				recursive: true,
			});

			if (version != "v1.3") continue;

			// Copy json schema fragments
			await fs.copy(
				path.join(
					__dirname,
					"..",
					"submodules",
					standard,
					version,
					"APIs",
					"schemas",
				),
				path.join(generatedBasePath, standard, version, "schemas"),
			);

			const rootSchema: any = {
				openapi: "3.1.0",
				info: {
					title: standard,
					version: version,
					description: `AMWA NMOS ${standard}`,
				},
				paths: {},
				servers: [
					{
						url: "http://api.example.com/x-nmos",
						description:
							"Testing URI - for use during development only!",
					},
				],
			};

			const files = await getRamlFiles(standard, version);
			for (const file of files) {
				const name = path.parse(file).name;

				const raml = await readRamlFile(standard, version, file);

				const resourceLookups: Record<string, any> = {};

				if (raml.types) {
					for (const [id, value] of Object.entries<any>(raml.types)) {
						if (value.type !== "!include")
							throw new Error("Only includes are handled!");
						resourceLookups[id] = `${value.data}`;
					}
				}

				const shortname = name.endsWith("API")
					? name.slice(0, -3)
					: name;

				const schemaPaths = {};
				recurseResources(
					resourceLookups,
					schemaPaths,
					raml,
					"",
					version,
					shortname,
				);

				const prefixIndex = raml.baseUri.indexOf("/x-nmos/");
				if (prefixIndex === -1)
					throw new Error("No /x-nmos/ in `baseUri`");
				const prefix = raml.baseUri
					.slice(prefixIndex + 7)
					.replace("{version}", version);

				for (const [p, obj] of Object.entries(schemaPaths)) {
					rootSchema.paths[path.join(prefix, p)] = obj;
				}
			}

			const rootSchemaPath = path.join(
				generatedBasePath,
				standard,
				version,
				"openapi.json",
			);

			await fs.writeFile(
				rootSchemaPath,
				JSON.stringify(rootSchema, undefined, 4),
			);

			const genPath = path.join(
				generatedBasePath,
				standard,
				version,
				"NameHere",
			);

			cp.execSync(
				`openapi-generator-cli generate -i ${rootSchemaPath} -o ${genPath} -g typescript-fetch -p supportsES6=true`,
			);
		}
	}
}

function recurseResources(
	resourceLookups: Record<string, any>,
	schemaPaths: any,
	resources: any[],
	path: string = "/",
	version: string,
	name: string,
) {
	for (const [id, resource] of Object.entries(resources)) {
		// TODO - listMethods has some overlap, and we want to ensure we don't miss any keys
		if (!id.startsWith("/")) continue;

		if (schemaPaths[id])
			throw new Error(`Resouce ${id} has already been defined!`);
		const resourceSchema = (schemaPaths[id] = {});

		listMethods(resourceLookups, resourceSchema, resource, name);

		if (resource) {
			recurseResources(
				resourceLookups,
				schemaPaths,
				resource,
				path + id,
				version,
				name,
			);
		}
	}
}

function listMethods(
	resourceLookups: Record<string, any>,
	resourceSchema: any,
	methods: any,
	name: string,
) {
	const methodNames = [
		"get",
		"post",
		"put",
		"delete",
		"head",
		"options",
		"trace",
		"patch",
		"connect",
	]; // TODO
	for (const methodName of methodNames) {
		const method = methods[methodName];
		if (!method) continue;

		if (resourceSchema[methodName])
			throw new Error(`Method already defined`);
		const methodSchema: any = (resourceSchema[methodName] = {});
		methodSchema.summary = method.description;
		methodSchema.responses = {};
		methodSchema.tags = [name];

		for (const [code, response] of Object.entries<any>(method.responses)) {
			if (!response) {
				methodSchema.responses[code] = {
					description: code + "",
					// headers: response.headers,
					// content: response.body,
				};
			} else {
				let content = undefined;
				if (response.body) {
					let schema = null;
					if (typeof response.body.type === "string") {
						schema = {
							$ref:
								resourceLookups[response.body.type] ??
								`#/components/${response.body.type}`,
						};
					} else if (response.body.type.type === "!include") {
						schema = {
							$ref: response.body.type.data,
						};
					} else {
						throw new Error("Response body unhandled");
					}
					// let example = undefined;
					if (response.body.example) {
						// if (typeof response.body.example === "string") {
						// 	example = {
						// 		$ref: resourceLookups[
						// 			response.body.example.type
						// 		],
						// 	};
						// } else
						// if (response.body.example.type === "!include") {
						// 	schema = {
						// 		$ref: response.body.example.data,
						// 	};
						// } else {
						// 	throw new Error("Response example unhandled");
						// }
						// This needs some extra path copying and translation to work, not worth it for now
					}

					if (schema)
						content = {
							"application/json": {
								schema: schema,
								// example,
							},
						};
				}

				methodSchema.responses[code] = {
					description: response.description ?? code + "",
					headers: response.headers,
					content: content,
				};
			}
		}

		if (method.body) {
			if (typeof method.body.type === "string") {
				methodSchema.requestBody = {
					content: {
						"application/json": {
							schema: {
								$ref:
									resourceLookups[method.body.type] ??
									`#/components/${method.body.type}`,
							},
						},
					},
				};
			} else if (method.body.type.type === "!include") {
				methodSchema.requestBody = {
					content: {
						"application/json": {
							schema: {
								$ref: method.body.type.data,
							},
						},
					},
				};
			} else {
				throw new Error("Response body unhandled");
			}
		}
	}
	listUriParameters(resourceSchema, methods);
}

function assertKnownKeys(obj: any, keys: string[]) {
	for (const key of Object.keys(obj)) {
		if (keys.indexOf(key) === -1)
			throw new Error(
				`Found unexpected key ${key} in object: ${JSON.stringify(
					obj,
					undefined,
					4,
				)}`,
			);
	}
}

function listUriParameters(methodSchema: any, resource: any) {
	const params = resource.uriParameters;
	if (params && Object.keys(params).length) {
		methodSchema.parameters = [];

		for (const [id, param] of Object.entries<any>(params)) {
			let schema = undefined;
			switch (param.type) {
				case "string":
					assertKnownKeys(param, [
						// Parser builtin:
						"displayName",
						"key",
						"required",
						"typePropertyKind",
						// Useful:
						"name",
						"type",
						"pattern",
						"enum",
					]);
					schema = {
						type: "string",
						pattern: param.pattern,
						enum: param.enum,
					};
					break;
				default:
					throw new Error("Bad param type");
			}

			methodSchema.parameters.push({
				name: id,
				in: "path",
				required: true,
				description: param.description,
				schema,
			});
		}
	}
}

legacy();
