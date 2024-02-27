import { getVersions } from "./lib.mjs";
import path from "path";
import { rimraf } from "rimraf";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { NMOSStandardVersionGenerator } from "./NMOSStandardVersionGenerator.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const generatedBasePath = path.join(__dirname, "../src/generated");

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

// Delete previous generation
await rimraf(generatedBasePath).catch(() => null);
await fs.mkdir(generatedBasePath, { recursive: true });

const standards = ["is-04", "is-05"];

const paths: string[] = [];

// run the generator for each standard and version
for (const standard of standards) {
	const versions = await getVersions(standard);
	for (const version of versions) {
		console.log(`Generating ${standard} - ${version}`);

		await new NMOSStandardVersionGenerator(
			path.join(__dirname, "..", "submodules", standard, version, "APIs"),
			path.join(generatedBasePath, standard, version),
		).run(version);

		// re-export the types
		const filePath = path.join(".", standard, version, "index.js");
		const exportName = `${standard.replace(/\W+/g, "")}_v${version.replace(
			/\D+/g,
			"",
		)}`;
		paths.push(`export * as ${exportName} from './${filePath}'`);
	}

	await fs.writeFile(
		path.join(generatedBasePath, "index.ts"),
		paths.join("\n"),
	);
}
