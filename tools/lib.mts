// Shared functions

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// @ts-ignore
import raml from "raml2obj";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/* Find all versions in ./submodules/{standard} */
export async function getVersions(standard: string): Promise<string[]> {
	const standardPath = path.join(__dirname, "..", "submodules", standard);
	const files = await fs.readdir(standardPath);
	return files.filter((file) => file.startsWith("v"));
}

/* Find all *.raml files in ./submodules/{standard}/{version}/APIs/ */
export async function getRamlFiles(
	standard: string,
	version: string,
): Promise<string[]> {
	const standardPath = path.join(
		__dirname,
		"..",
		"submodules",
		standard,
		version,
		"APIs",
	);
	const files = await fs.readdir(standardPath);
	return files.filter((file) => file.endsWith(".raml"));
}

// Read a RAML file from ./submodules/{standard}/{version}/APIs/{file} and parse it. It's yaml.
export async function readRamlFile(
	standard: string,
	version: string,
	file: string,
): Promise<any> {
	const standardPath = path.join(
		__dirname,
		"..",
		"submodules",
		standard,
		version,
		"APIs",
		file,
	);

	return await raml.parse(standardPath, {
		extensionsAndOverlays: [],
		collectionFormat: "arrays",
	});
}
