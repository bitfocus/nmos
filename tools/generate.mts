import { getRamlFiles, getVersions, readRamlFile } from "./lib.mjs";
import { Chalk } from "chalk";
import path from "path";
import { rimraf } from "rimraf";
import { fileURLToPath } from "url";
import * as fs from "fs/promises";
import wap from "webapi-parser";
import * as cp from "child_process";

const c = new Chalk({ level: 2 });

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const generatedBasePath = path.join(__dirname, "../src/generated");

async function legacy() {
	// Delete previous generation
	await rimraf(generatedBasePath).catch(() => null);
	await fs.mkdir(generatedBasePath, { recursive: true });

	const standards = ["is-04", "is-05"];

	for (const standard of standards) {
		console.log(c.bgRed.whiteBright("\n#", standard));

		const versions = await getVersions(standard);
		for (const version of versions) {
			await fs.mkdir(path.join(generatedBasePath, standard, version), {
				recursive: true,
			});

			if (version != "v1.3") continue;

			console.log("-", c.yellowBright(version));
			const files = await getRamlFiles(standard, version);
			for (const file of files) {
				console.log(c.magenta(file));

				const name = path.parse(file).name;
				// if (name !== "RegistrationAPI") continue;

				const standardPath = path.join(
					"file:/",
					__dirname,
					"..",
					"submodules",
					standard,
					version,
					"APIs",
					file,
				);

				const outPath = path.join(
					generatedBasePath,
					standard,
					version,
					name + ".json",
				);
				console.log("try", standardPath, outPath);

				// const parsed =
				// 	await wap.WebApiParser.raml10.parse(standardPath);

				// // Generate OAS file
				// const str = await wap.WebApiParser.oas20.generateString(parsed);
				// await fs.writeFile(outPath, str);
				// console.log(str);

				const genPath = path.join(
					generatedBasePath,
					standard,
					version,
					name,
				);

				const raml = await readRamlFile(standard, version, file);

				const schema: any = {
					openapi: "3.0.3",
					info: {
						title: raml.title,
						version: raml.version,
					},
					paths: {},
				};

				for (const docs of raml.documentation) {
					if (docs.title === "Overview") {
						schema.info.description = docs.content.trim();
					} else if (docs.title === "Further Documentation") {
						// schema.externalDocs = {
						// 	description: docs.content.trim(),
						// 	url: "https://example.com", // TODO
						// };
					}
				}

				recurseResources(schema, raml.resources, "", 1, version);

				await fs.writeFile(
					outPath,
					JSON.stringify(schema, undefined, 4),
				);

				cp.execSync(
					`openapi-generator-cli generate -i ${outPath} -o ${genPath} -g typescript-fetch -p supportsES6=true`,
				);
			}
		}
	}
}

function recurseResources(
	schema: any,
	resources: any[],
	path: string = "/",
	level: number = 0,
	version: string,
) {
	for (const resource of resources) {
		console.log(
			"   ".repeat(level) +
				" " +
				c.green(
					resource.absoluteUri
						.replace("http://example.api.com/x-nmos", "")
						.replace("http://api.example.com/x-nmos", "")
						.replace("{version}", version),
				),
		);

		if (schema.paths[resource.relativeUri])
			throw new Error(
				`Resouce ${resource.relativeUri} has already been defined!`,
			);
		const resourceSchema = (schema.paths[resource.relativeUri] = {});

		listMethods(resourceSchema, resource.methods, level);

		if (resource.resources) {
			recurseResources(
				schema,
				resource.resources,
				path + resource.relativeUri,
				level + 1,
				version,
			);
		}
	}
}

function listMethods(resourceSchema: any, methods: any[], level: number) {
	for (const method of methods) {
		console.log(
			"   ".repeat(level) +
				"   " +
				" " +
				c.blue(method.method.toUpperCase()) +
				": " +
				method.description?.trim().replace("\n", "\\n ").substr(0, 50) +
				"[..]",
		);

		if (resourceSchema[method.method])
			throw new Error(`Method already defined`);
		const methodSchema: any = (resourceSchema[method.method] = {});
		methodSchema.summary = method.description;
		methodSchema.responses = {};

		for (const response of method.responses) {
			// if (response.body.length !== 1)
			// 	throw new Error(`Method already defined`);
			// methodSchema.responses[response.code] = {
			// 	description: response.code + "",
			// 	content: response.body[0],
			// };
		}

		console.log(JSON.stringify(method, undefined, 4));

		listUriParameters(methodSchema, method, level);
	}
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

function listUriParameters(methodSchema: any, method: any, level: number) {
	const params = method.allUriParameters;
	if (params && params.length) {
		console.log("   ".repeat(level) + "     - params:");

		methodSchema.parameters = [];

		for (const param of params) {
			console.log(
				"   ".repeat(level) +
					"   " +
					"   " +
					" " +
					c.cyan(param.name) +
					": " +
					param.type,
			);

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
				name: param.name,
				in: "path",
				required: true,
				description: param.description,
				schema,
			});
		}
	}
}

legacy();
