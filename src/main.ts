import { interpretExpression } from "./interpreter";

if (Bun.argv.length < 3) {
    console.log("Use: bun main.ts path/to/file.json");
    process.exit(0);
}

const jsonPath = Bun.argv[2];
const jsonFile = Bun.file(jsonPath, { type: "application/json" });
const jsonContent = await jsonFile.json();

const result = interpretExpression(jsonContent.expression, {});

console.log(result);
