import * as fs from "fs/promises";
import { compile } from "json-schema-to-typescript";
import { generateName } from "json-schema-to-typescript/dist/src/utils.js";
import path from "path";
import { readRamlFile } from "./lib.mjs";
import { NMOSApiGenerator } from "./NMOSApiGenerator.mjs";
import * as changeCase from "change-case";
import ts from "typescript";

interface TypeInfo {
	name: string;
	lines: string;
}

/** Generate the types for an NMOS standard */
export class NMOSStandardVersionGenerator {
	constructor(
		private readonly sourcePath: string,
		private readonly destPath: string,
	) {}

	/**
	 * Run the generator
	 * @param version Version number of this standard
	 */
	public async run(version: string): Promise<void> {
		await fs.mkdir(this.destPath, { recursive: true });

		const schemaTypes = await this.#compileSchemas(version);
		await this.#generateApis(schemaTypes);
	}

	/**
	 * Compile the typescript schemas to interfaces
	 * @param version Version number of this standard
	 * @returns Map of schema types names
	 */
	async #compileSchemas(version: string): Promise<Map<string, string>> {
		const typeNames = new Map<string, string>();

		const allTypes: Record<string, string> = {};

		const schemas: string[] = [];
		const files = await fs.readdir(path.join(this.sourcePath, "schemas"));
		for (const file of files) {
			if (!file.endsWith(".json")) continue;

			const schemaJsonStr = await fs.readFile(
				path.join(this.sourcePath, "schemas", file),
			);
			const schemaJson = JSON.parse(schemaJsonStr.toString());

			const schema = await compile(schemaJson, file, {
				cwd: path.join(this.sourcePath, "schemas"),
				declareExternallyReferenced: false,
				additionalProperties: false,
				ignoreMinAndMaxItems: true,
			});

			schemas.push(schema);

			let title = schemaJson.title;
			if (!title) {
				title = path.parse(file).name;
				if (title.endsWith("-schema")) title = title.slice(0, -7);
				if (title.startsWith(version))
					title = title.slice(version.length + 1);

				title = changeCase.pascalCase(title);
			}

			if (!title) {
				throw new Error(`Schema is missing title: ${file}`);
			}
			const generatedName = generateName(schemaJson.title, new Set());
			const usedNames = new Set(typeNames.values());
			let useName = generatedName;
			for (let i = 1; usedNames.has(useName); i++) {
				useName = `${generatedName}${i}`;
			}

			typeNames.set(`schemas/${file}`, useName);

			console.log(`schemas/${file}`, useName);

			// Strip out any duplicates
			const newTypes = this.#parseGeneratedTypes(
				file,
				schema,
				generatedName,
				useName,
			);
			for (const typeDef of newTypes) {
				console.log(useName, typeDef.name);
				const existingDef = allTypes[typeDef.name];
				if (existingDef && existingDef !== typeDef.lines)
					typeDef.name += Date.now(); // HACK
				// throw new Error(
				// 	`Found multiple different implementations of ${typeDef.name}.\n${existingDef}\n${typeDef.lines}`,
				// );

				allTypes[typeDef.name] = typeDef.lines;
			}
		}

		// Write to file
		const fullSchema =
			"/* eslint-disable */\n" + Object.values(allTypes).join("\n\n");
		await fs.writeFile(path.join(this.destPath, "schemas.ts"), fullSchema);

		return typeNames;
	}

	#parseGeneratedTypes(
		filename: string,
		schema: string,
		renameFrom: string,
		renameTo: string,
	): TypeInfo[] {
		const result: TypeInfo[] = [];

		const sourceFile = ts.createSourceFile(
			filename,
			schema,
			ts.ScriptTarget.ES2022,
			undefined,
			ts.ScriptKind.TS,
		);
		const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

		// Loop through the root AST nodes of the file
		ts.forEachChild(sourceFile, (node) => {
			if (
				ts.isTypeAliasDeclaration(node) ||
				ts.isInterfaceDeclaration(node)
			) {
				let nodeName = node.name.getText(sourceFile);
				if (nodeName === renameFrom) {
					nodeName = renameTo;
					// ts.visitNode(node, (n) => {});
				}
				result.push({
					name: nodeName,
					lines: printer.printNode(
						ts.EmitHint.Unspecified,
						node,
						sourceFile,
					),
				});
			} else if (node.kind === ts.SyntaxKind.EndOfFileToken) {
				// Normal
			} else {
				const result = printer.printNode(
					ts.EmitHint.Unspecified,
					node,
					sourceFile,
				);
				throw new Error(
					`Unknown typescript token: ${node.kind}\n${result}`,
				);
			}
		});

		// const schemaLines = schema.split("\n");
		// let typeInfo: [name: string, startLine: number] | null = null;
		// for (let i = 0; i < schemaLines.length; i++) {
		// 	const line = schemaLines[i];
		// 	if (typeInfo == null) {
		// 		const lineMatch = line.match(/export (interface|type) (\S+) /i);
		// 		// console.log(lineMatch);
		// 		if (lineMatch) {
		// 			// console.log(lineMatch[2], lineMatch);
		// 			typeInfo = [lineMatch[2], i];
		// 		}
		// 	} else {
		// 		const endTypeMatch = line.match(/^  \| (\S+);/);
		// 		if (endTypeMatch || line.startsWith("}")) {
		// 			const typeLines = schemaLines.slice(typeInfo[1], i + 1);

		// 			result.push({
		// 				name: typeInfo[0],
		// 				lines: typeLines.join("\n"),
		// 			});
		// 		}
		// 	}
		// }

		// process.exit();
		return result;
	}

	/**
	 * Compile the api schemas to classes
	 * @param schemaTypes Map of schema types names
	 */
	async #generateApis(schemaTypes: Map<string, string>): Promise<void> {
		const names: string[] = [];

		const files = await fs.readdir(this.sourcePath);
		for (const file of files) {
			if (!file.endsWith(".raml")) continue;

			const name = await this.#generateApi(schemaTypes, file);
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

	/**
	 * Compile the api schemas to a class
	 * @param schemaTypes Map of schema types names
	 * @param filename Filename of the api portion to generate
	 */
	async #generateApi(
		schemaResources: Map<string, string>,
		filename: string,
	): Promise<string> {
		const name = path.parse(filename).name;

		const raml = await readRamlFile(path.join(this.sourcePath, filename));

		const localResources = new Map<string, string>(
			schemaResources.entries(),
		);

		if (raml.types) {
			for (const [key, value] of Object.entries<any>(raml.types)) {
				localResources.set(key, localResources.get(value.data)!);
			}
		}

		const apiGenerator = new NMOSApiGenerator(localResources, raml.traits);

		const lines = [
			`/* eslint-disable */`,
			`import * as runtime from '../../../base.js'`,
			`import * as schemas from './schemas.js'`,
			"",
		];

		const classLines = await apiGenerator.generate(name, raml);
		lines.push(...apiGenerator.typeDefinitionLines, ...classLines);

		await fs.writeFile(
			path.join(this.destPath, `${name}.ts`),
			lines.join("\n"),
		);

		return name;
	}
}
