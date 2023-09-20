interface Location {
    start: number;
    end: number;
    filename: string;
}

interface StrExpression {
    kind: "Str";
    value: string;
    location: Location;
}

interface FunctionCallExpression {
  kind: "FunctionCall";
  callee: FunctionExpression;
  arguments: Expression[];
  location: Location;
}

interface VarExpression {
    kind: "Var";
    text: string;
    location: Location;
}

interface IntExpression {
    kind: "Int";
    value: number;
    location: Location;
}

interface BinaryExpression {
    kind: "Binary";
    lhs: Expression;
    op: string;
    rhs: Expression;
    location: Location;
}

interface CallExpression {
    kind: "Call";
    callee: VarExpression;
    arguments: Expression[];
    location: Location;
}

interface IfExpression {
    kind: "If";
    condition: BinaryExpression;
    then: Expression;
    otherwise: Expression;
    location: Location;
}

interface FunctionExpression {
    kind: "Function";
    parameters: VarExpression[];
    value: Expression;
    location: Location;
}

interface LetExpression {
    kind: "Let";
    name: VarExpression;
    value: FunctionExpression;
    next: Expression;
    location: Location;
}

interface PrintExpression {
    kind: "Print";
    value: CallExpression;
    location: Location;
}

export type Expression =
| VarExpression
| IntExpression
| BinaryExpression
| CallExpression
| StrExpression
| IfExpression
| FunctionExpression
| LetExpression
| PrintExpression
| FunctionCallExpression;