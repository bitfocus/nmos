import * as fs from "fs/promises";
import { compileFromFile } from "json-schema-to-typescript";
import { bundle } from "@apidevtools/json-schema-ref-parser";
import path from "path";
import cp from "child_process";

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
		const lines = [
			`/* eslint-disable */`,
			`import * as runtime from '../../../base.js'`,
			`import * as schemas from './schemas.js'`,
			"",
		];

		const name = path.parse(filename).name;

		lines.push(`export class ${name} extends runtime.BaseAPI {`);
		// TODO

		lines.push(`}`);

		await fs.writeFile(
			path.join(this.destPath, `${name}.ts`),
			lines.join("\n"),
		);

		return name;
	}
}
