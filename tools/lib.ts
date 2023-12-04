// Shared functions

import fs from "fs/promises";
import path from "path";

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
