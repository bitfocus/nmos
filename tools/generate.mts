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

				const parsed =
					await wap.WebApiParser.raml10.parse(standardPath);

				// Generate OAS file
				const str = await wap.WebApiParser.oas20.generateString(parsed);
				await fs.writeFile(outPath, str);
				// console.log(str);

				const genPath = path.join(
					generatedBasePath,
					standard,
					version,
					name,
				);

				cp.execSync(
					`openapi-generator-cli generate -i ${outPath} -o ${genPath} -g typescript-fetch -p supportsES6=true --skip-validate-spec`,
				);

				const raml = await readRamlFile(standard, version, file);
				const generated = recurseResources(
					raml.resources,
					"",
					1,
					version,
				);

				const docs: string[] = [];
				if (raml.documentation && raml.documentation.length > 0) {
					docs.push("/**");
					for (const section of raml.documentation) {
						docs.push(` * ## ${section.title}`);
						docs.push(` * ${section.content.trim()}`);
					}
					docs.push("**/");
				}

				generated.unshift(...docs, `export class ${name} {`);
				generated.push("}");

				await fs.writeFile(
					path.join(
						generatedBasePath,
						standard,
						version,
						name + ".ts",
					),
					generated.join("\n"),
				);
			}
		}
	}
}

function recurseResources(
	resources: any[],
	path: string = "/",
	level: number = 0,
	version: string,
): string[] {
	const lines: string[] = [];

	for (const resource of resources) {
		// console.log(resource);
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
		listMethods(resource.methods, level);

		lines.push(`/**`, ` * ${resource.displayName}`, `**/`);

		if (resource.resources) {
			recurseResources(
				resource.resources,
				path + resource.relativeUri,
				level + 1,
				version,
			);
		}
	}

	return lines;
}

function listMethods(methods: any[], level: number) {
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

		listUriParameters(method, level);
	}
}

function listUriParameters(method: any, level: number) {
	const params = method.allUriParameters;
	if (params && params.length) {
		console.log("   ".repeat(level) + "     - params:");

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
		}
	}
}

legacy();
