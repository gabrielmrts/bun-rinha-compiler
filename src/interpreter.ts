import { Expression } from "./interfaces";

export function interpretExpression(expression: Expression, environment: Record<string, any>): any {
    switch (expression.kind) {
        case "Var":
            return environment[expression.text];
        case "Int":
            return expression.value;
        case "Str":
            return expression.value;
        case "Binary":
            const left = interpretExpression(expression.lhs, environment);
            const right = interpretExpression(expression.rhs, environment);
            switch (expression.op) {
                case "Add":
                    return left + right;
                case "Sub":
                    return left - right;
                case "Mul":
                    return left * right;
                case "Div":
                    if (right === 0) {
                        throw new Error("Division by zero");
                    }
                    return left / right;
                case "Eq":
                    return left === right;
                case "Neq":
                    return left !== right;
                case "Lt":
                    return left < right;
                case "Lte":
                    return left <= right;
                case "Gt":
                    return left > right;
                case "Gte":
                    return left >= right;
                case "And":
                    return left && right;
                case "Or":
                    return left || right;
            }
        case "Call":
            const func = interpretExpression(expression.callee, environment);
            const args = expression.arguments.map(arg => interpretExpression(arg, environment));

            if (typeof func === "function") {
                return func(...args);
            } else {
                throw new Error(`"${expression.callee.text}" is not a function.`);
            }

        case "If":
            const condition = interpretExpression(expression.condition, environment);
            if (condition) {
                return interpretExpression(expression.then, environment);
            } else {
                return interpretExpression(expression.otherwise, environment);
            }
        case "Function":
            return (...args: any[]) => {
                const newEnv = { ...environment };
                for (let i = 0; i < expression.parameters.length; i++) {
                    newEnv[expression.parameters[i].text] = args[i];
                }
                return interpretExpression(expression.value, newEnv);
            };
        case "FunctionCall":
            const userFunc = interpretExpression(expression.callee, environment);
            const userArgs = expression.arguments.map(arg => interpretExpression(arg, environment));
            if (typeof userFunc === "function") {
                return userFunc(...userArgs);
            } else {
                throw new Error(`"${expression.callee.name.text}" is not a function.`);
            }
        case "Let":
            const newEnv = { ...environment };
            newEnv[expression.name.text] = interpretExpression(expression.value, newEnv);
            return interpretExpression(expression.next, newEnv);
        case "Print":
            const result = interpretExpression(expression.value, environment);
            return result;
    }
}