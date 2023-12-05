import * as fs from "fs/promises";
import { compileFromFile } from "json-schema-to-typescript";
import { bundle } from "@apidevtools/json-schema-ref-parser";
import path from "path";
import cp from "child_process";
import { readRamlFile2 } from "./lib.mjs";
import { ApiGenerator } from "./ApiGenerator.mjs";

export const HTTP_VERBS = [
	"get",
	"post",
	"put",
	"delete",
	"head",
	"options",
	"trace",
	"patch",
	"connect",
];

export class Generator {
	constructor(
		private readonly sourcePath: string,
		private readonly destPath: string,
	) {}

	public async run(): Promise<void> {
		await fs.mkdir(this.destPath, { recursive: true });

		await this.#compileSchemas();
		await this.#generateApis();
	}

	async #compileSchemas(): Promise<void> {
		const schemas: string[] = [];
		const files = await fs.readdir(path.join(this.sourcePath, "schemas"));
		for (const file of files) {
			if (!file.endsWith(".json")) continue;

			const schema = await compileFromFile(
				path.join(this.sourcePath, "schemas", file),
				{
					cwd: path.join(this.sourcePath, "schemas"),
					declareExternallyReferenced: false,
					additionalProperties: false,
				},
			);

			schemas.push(schema);
		}

		// TODO - parse ts and stip out duplicates

		await fs.writeFile(
			path.join(this.destPath, "schemas.ts"),
			schemas.join("\n\n"),
		);
	}

	async #generateApis(): Promise<void> {
		const names: string[] = [];

		const files = await fs.readdir(this.sourcePath);
		for (const file of files) {
			if (!file.endsWith(".raml")) continue;

			const name = await this.#generateApi(file);
			names.push(name);
		}

		// TODO - generate more in here?
		const lines = names.map((name) => `export * from './${name}.js'`);
		lines.push(`export * from './schemas.js'`);

		await fs.writeFile(
			path.join(this.destPath, `index.ts`),
			lines.join("\n"),
		);
	}

	async #generateApi(filename: string): Promise<string> {
		const name = path.parse(filename).name;

		const raml = await readRamlFile2(path.join(this.sourcePath, filename));

		const apiGenerator = new ApiGenerator();
		const lines = await apiGenerator.generate(name, raml);

		await fs.writeFile(
			path.join(this.destPath, `${name}.ts`),
			lines.join("\n"),
		);

		return name;
	}
}
