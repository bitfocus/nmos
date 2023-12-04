import { getRamlFiles, getVersions, readRamlFile } from "./lib";
import { Chalk } from "chalk";

const c = new Chalk({ level: 2 });

async function legacy() {
	const standards = ["is-04", "is-05"];

	for (const standard of standards) {
		console.log(c.bgRed.whiteBright("\n#", standard));

		const versions = await getVersions(standard);
		for (const version of versions) {
			console.log("-", c.yellowBright(version));
			const files = await getRamlFiles(standard, version);
			for (const file of files) {
				console.log(c.magenta(file));
				const raml = await readRamlFile(standard, version, file);
				recurseResources(raml.resources, "", 1, version);
			}
		}
	}
}

function recurseResources(
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
		listMethods(resource.methods, level);

		if (resource.resources) {
			recurseResources(
				resource.resources,
				path + resource.relativeUri,
				level + 1,
				version,
			);
		}
	}
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
