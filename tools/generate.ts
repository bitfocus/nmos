import { getRamlFiles, getVersions } from "./lib";

async function legacy() {
	const standards = ["is-04", "is-05"];

	for (const standard of standards) {
		console.log(standard);

		const versions = await getVersions(standard);
		for (const version of versions) {
			console.log(version);
			const files = await getRamlFiles(standard, version);
			console.log(files);
		}
	}
}

legacy();
