import { expect, test } from "bun:test";
import { interpretExpression } from "./interpreter";

test("fib", async () => {
    const jsonFile = Bun.file("./files/fib.json", { type: "application/json" });
    const jsonContent = await jsonFile.json();
    
    const result = interpretExpression(jsonContent.expression, {});

    expect(result).toBe(55);
});

test("combination", async () => {
    const jsonFile = Bun.file("./files/combination.json", { type: "application/json" });
    const jsonContent = await jsonFile.json();
    
    const result = interpretExpression(jsonContent.expression, {});

    expect(result).toBe(45);
});

test("print", async () => {
    const jsonFile = Bun.file("./files/print.json", { type: "application/json" });
    const jsonContent = await jsonFile.json();
    
    const result = interpretExpression(jsonContent.expression, {});

    expect(result).toBe("Hello world");
});

test("sum", async () => {
    const jsonFile = Bun.file("./files/sum.json", { type: "application/json" });
    const jsonContent = await jsonFile.json();
    
    const result = interpretExpression(jsonContent.expression, {});

    expect(result).toBe(15);
});
