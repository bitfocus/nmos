// Shared functions

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/* Find all versions in ./submodules/{standard} */
export async function getVersions(standard: string): Promise<string[]> {
	const standardPath = path.join(__dirname, "..", "submodules", standard);
	const files = await fs.readdir(standardPath);
	return files.filter((file) => file.startsWith("v"));
}

class CustomTag {
	type: any;
	data: any;
	constructor(type: any, data: any) {
		this.type = type;
		this.data = data;
	}
}

const tags = ["scalar", "sequence", "mapping"].map(function (kind) {
	// first argument here is a prefix, so this type will handle anything starting with !
	return new yaml.Type("!", {
		kind: kind as any,
		multi: true,
		representName: function (object: any) {
			return object.type;
		},
		represent: function (object: any) {
			return object.data;
		},
		instanceOf: CustomTag,
		construct: function (data, type) {
			return new CustomTag(type, data);
		},
	});
});

const SCHEMA = yaml.DEFAULT_SCHEMA.extend(tags);

// Read a RAML file from ./submodules/{standard}/{version}/APIs/{file} and parse it. It's yaml.
export async function readRamlFile(fullPath: string): Promise<any> {
	const str = await fs.readFile(fullPath, "utf8");

	return yaml.load(str.toString(), { schema: SCHEMA });
}
