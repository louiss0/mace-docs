---
title: Language Reference
description: Rules and semantics for every Mace language feature.
---

Mace is a typed configuration language that produces deterministic object
data. Every Mace file evaluates to a single output object.

A file can contain:

- an optional script block for imports, types, schemas, and variables
- exactly one output block

The output block is where data is emitted. The script block is where you define
the imports, types, and values that feed into it.

```mace
|===|
string name = "Ada";
int age = 27;
|===|

{
  name: name,
  age: age
}
```

## The output block

The output block is the only required part of a Mace file. It produces a record
of named fields, each holding a data value.

```mace
{
  name: "Ada",
  enabled: true,
  score: 42
}
```

### Fields

Each field is a `name: value` pair. Non-final fields are separated with `,`,
and a trailing comma on the final field is optional. Field names must be
unique within the block.

Fields hold data values such as strings, integers, floats, booleans, arrays,
and records:

```mace
{
  greeting: "hello",
  count: 3,
  ratio: 1.5,
  active: true,
  tags: ["config", "demo"],
  nested: {
    key: "value"
  }
}
```

Fields can also reference variables declared in the script block.

### Expressions

All expressions in Mace are pure and deterministic.

Supported expression forms:

- identifiers
- member access: `value.member`
- string, int, float, and boolean literals
- array literals
- record literals
- `$self` references

Supported operators:

- unary: `!`, `~`, unary `+`, unary `-`
- arithmetic: `+`, `-`, `*`, `/`, `%`, `**`
- shift: `<<`, `>>`, `>>>`
- comparison: `<`, `<=`, `>`, `>=`
- equality: `==`, `!=`
- structural merge: `left <> right`
- bitwise: `&`, `|`, `^`
- logical: `&&`, `||`
- ternary conditional: `condition ? when_true : when_false`

### Structural merge

Structural merge operands must be identifiers, object literals, or array
literals. Records merge deeply and arrays concatenate from left to right.

### Numbers and numeric operators

Mace has two numeric primitives: `int` and `float`.

For `+`, `-`, `*`, `/`, `%`, and `**`:

- `int` with `int` produces an `int`
- if either operand is a `float`, the result is a `float`

For numeric comparisons:

- `int` and `float` may be compared together
- comparisons always produce a `boolean`

Examples:

```mace
{
  whole: 9 % 4,
  mixed_sum: 1 + 2.5,
  mixed_mod: 9 % 2.5,
  power: 2 ** 3.0,
  ordered: 3 < 3.5
}
```

This evaluates to values equivalent to:

- `whole` => `1`
- `mixed_sum` => `3.5`
- `mixed_mod` => `1.5`
- `power` => `8.0`
- `ordered` => `true`

These operators remain `int`-only:

- bitwise: `&`, `|`, `^`, `~`
- shift: `<<`, `>>`, `>>>`

Member access with `.` resolves to value field access.

```mace
|===|
string suffix = "one";
|===|

{
  sum: 2 + 2,
  label: "item-$(suffix)",
  flag: 10 > 5 ? true : false
}
```

### `$self`

`$self` refers to the output object being constructed. Output fields are
evaluated top to bottom, so `$self` may only read fields that have already
been evaluated.

```mace
{
  base: 4,
  doubled: $self.base * 2
}
```

### Strings

Mace has three string literal forms:

- single-quoted: `'hello'` with no interpolation
- double-quoted: `"Hello $(name)"` with interpolation
- block strings: `"""..."""` for multi-line strings with interpolation

Interpolation uses `$(...)`. The expression inside is parsed as a normal Mace
expression and must resolve to a runtime value.

### Comments

Comments use the `/=` prefix.

- line comment: `/=` to end of line
- block comment: `/=` ... `=/`

Comments are discarded during parsing. For preserved metadata, see
[Documentation Syntax](/reference/documentation-syntax/).

## Directives

A directive list is placed before the output block's opening `{` using square
brackets. If no directive is present, the output mode defaults to `data`.

### `output = data`

The default mode. Output fields are expressions that produce values.

### `output = data, schema = <Name>`

Data mode with schema validation against a named schema.

### `output = data, schema_file = "<path>"`

Data mode with schema validation loaded from another Mace file.

### `output = data, parse = <Schema>`

Validates the host-provided runtime input record against the named schema, then
exposes each schema field as a variable inside the output block.

```mace
|===|
schema Runtime: { env: string; };
|===|
[output = data, parse = Runtime]
{
  env: env,
}
```

### `output = data, parse_file = "<path>"`

Loads schema declarations from the referenced Mace file, validates the
host-provided runtime input record against those declarations, and exposes
the matching fields as variables inside the output block.

```mace
[output = data, parse_file = "./runtime.mace"]
{
  env: env,
}
```

### `output = schema`

Schema mode. Output fields contain type references instead of expressions.

### Combination rules

- `output = schema` must be used alone
- `output = data` may be combined with `schema`, `schema_file`, `parse`, or `parse_file`
- `parse = <Schema>` and `schema` are mutually exclusive — `parse` is self-contained
- `parse_file = "<path>"` and `schema_file` are mutually exclusive — `parse_file` is self-contained
- duplicate output directives are invalid
- duplicate output field names are invalid

## Types

Types are used in the script block for declarations and in schema-mode output
blocks.

### Primitives

The four primitive types are `string`, `int`, `float`, and `boolean`.

### Arrays

Arrays use `array<T>` syntax.

```mace
array<string>
array<int>
array<User>
array<array<int>>
```

### Unions

Unions use `union[T1, T2, ...]` syntax and represent schema composition.

```mace
type User: union[Profile, Audit];
```

Schema unions combine member fields into one closed record shape.

### Variants

Variants use `variant[T1, T2, ...]` syntax and represent closed alternatives.

```mace
type Scalar: variant[string, int];
type Input: variant[choice["dev", "prod"], int];
```

Choice members remain literal alternatives inside variants, and tooling may
surface those literal values directly in completions.

## The script block

The script block is where you define types, schemas, and variables that feed
into the output block.

### Delimiters

The script block is delimited by matching pipe delimiters with at least three
`=` characters.

```mace
|===|
/= declarations go here =/
|===|
```

### Variables

Variables are immutable and must have an explicit type. Variables must have an
initializer. The `nullable` keyword marks a variable that may evaluate to
`null`.

```mace
int age = 27;
string name = "Ada";
nullable string env = null;
```

### Type declarations

Type declarations use `:` after the name.

```mace
type Name: string;
type Scores: array<int>;
type Alias: Name;
```

### Schema declarations

Schemas define record types with required and optional fields.

```mace
schema User: {
  name: string,
  age?: int,
};
```

### Choice declarations

Choices are declared through normal type aliases with `choice[...]`.
A choice defines a finite domain of scalar literals.

```mace
type Fruit: choice["apple", "strawberry", "pecan"];
type Status: choice[10, 20, 30];
```

Choice members may mix scalar literal kinds and may reference other choice
aliases.

```mace
type BaseEnv: choice["dev", "prod"];
type ExtendedEnv: choice[BaseEnv, "preview", true];
```

Values assigned to a choice-typed field or variable must match one of the
resolved choice members directly.

```mace
Fruit favorite = "apple";
Status current = 20;
```

Choice aliases are named types, so they can be used anywhere a named
non-schema type is allowed, including variables, schema fields,
schema-mode output fields, imports, and `variant[...]` members.

### Imports

Imports use the existing `from "..." import ...;` syntax, but when present they
belong at the top of the script block.

```mace
|===|
from "./shared.mace" import Name, User;
|===|
```

Pair-style entries inside delimited structures use commas:

- choice members inside `choice[...]`
- schema fields
- output fields
- record literal fields
- documentation entries inside `gen_doc` and `schema_doc`
- `props` entries inside `schema_doc`

Top-level declarations still end with `;`.

Current import rules:

- import paths are resolved relative to the importing file
- only named imports are supported
- only symbols exposed through the imported file's output block are importable
- top-level `type`, `choice`, `schema`, and variable declarations stay internal
  unless they are surfaced through the output block
- there is no explicit `export` keyword
- circular imports are rejected

Imported symbols depend on the imported file's output mode:

- `output = schema` exposes named type-like fields for import
- a schema-mode field whose type is a record, or references a schema, imports
  as a schema
- other schema-mode fields import as types or choices
- `output = data` exposes named values for import

## Array access

Array values can be indexed with zero-based integer access using `[<number>]`.

```mace
[output = data]
{
  names: ["Ada", "Linus", "Grace"],
  first_name: $self.names[0],
  users: [
    { name: "Ada" },
    { name: "Linus" }
  ],
  first_user_name: $self.users[0].name
}
```

Array access also works recursively on nested arrays, including variables:

```mace
|===|
array<array<array<int>>> matrix = [[[1]]];
|===|
[output = data]
{
  value: matrix[0][0][0]
}
```

Rules:

- array access uses zero-based indexing
- the index must be an integer literal
- array access may be chained recursively for nested arrays
- array access requires an array value at each nesting level
- out-of-range indexes are invalid
- member access may follow array access when the indexed element is a record
- invalid access diagnostics report the nesting level that failed

## Validation

The processor validates things like:

- duplicate declarations and fields
- invalid choice members and duplicate resolved choice values
- unknown type references
- type mismatches in variables and expressions
- schema conformance for records and outputs
- import resolution failures and circular imports
- conflicting documentation metadata
