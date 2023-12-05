import { getRamlFiles, getVersions, readRamlFile } from "./lib.mjs";
import path from "path";
import { rimraf } from "rimraf";
import { fileURLToPath } from "url";
import * as cp from "child_process";
import fs from "fs-extra";
import { Generator } from "./Generator2.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const generatedBasePath = path.join(__dirname, "../src/generated");
const openapiBasePath = path.join(__dirname, "../openapi");

const generatedBasePath2 = path.join(__dirname, "../src/generated2");

async function legacy() {
	// Delete previous generation
	await rimraf(generatedBasePath).catch(() => null);
	await fs.mkdir(generatedBasePath, { recursive: true });

	await rimraf(generatedBasePath2).catch(() => null);
	await fs.mkdir(generatedBasePath2, { recursive: true });

	const standards = ["is-04", "is-05"];

	const paths: string[] = [];

	for (const standard of standards) {
		await fs.mkdir(path.join(generatedBasePath, standard), {
			recursive: true,
		});

		const versions = await getVersions(standard);
		for (const version of versions) {
			const openapiPath = path.join(openapiBasePath, standard, version);
			console.log(`Generating ${openapiPath}`);
			await fs.mkdir(openapiPath, {
				recursive: true,
			});

			if (version != "v1.3") continue;

			await new Generator(
				path.join(
					__dirname,
					"..",
					"submodules",
					standard,
					version,
					"APIs",
				),
				path.join(generatedBasePath2, standard, version),
			).run();

			const filePath = path.join(".", standard, version, "index.js");
			const exportName = `${standard.replace(
				/\W+/g,
				"",
			)}_${version.replace(/\D+/g, "")}`;
			paths.push(`export * as ${exportName} from './${filePath}'`);
		}

		await fs.writeFile(
			path.join(generatedBasePath2, "index.ts"),
			paths.join("\n"),
		);
	}
}

// function assertKnownKeys(obj: any, keys: string[]) {
// 	for (const key of Object.keys(obj)) {
// 		if (keys.indexOf(key) === -1)
// 			throw new Error(
// 				`Found unexpected key ${key} in object: ${JSON.stringify(
// 					obj,
// 					undefined,
// 					4,
// 				)}`,
// 			);
// 	}
// }

// is-05 is missing definition of some parameters

legacy();
