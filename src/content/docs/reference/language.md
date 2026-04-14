---
title: Language Reference
description: Rules and semantics for every Mace language feature.
---

Mace is a typed configuration language that produces deterministic object
data. Every Mace file evaluates to a single output object.

A file can contain:

- zero or more import declarations
- an optional script block for types, schemas, enums, and variables
- exactly one output block

The output block is where data is emitted. The script block is where you define
the types and values that feed into it.

```mace
|===|
string name = "Ada";
int age = 27;
|===|

{
  name: name;
  age: age;
}
```

## The output block

The output block is the only required part of a Mace file. It produces a record
of named fields, each holding a data value.

```mace
{
  name: "Ada";
  enabled: true;
  score: 42;
}
```

### Fields

Each field is a `name: value;` pair terminated by `;`. Field names must be
unique within the block.

Fields hold data values such as strings, integers, floats, booleans, arrays,
and records:

```mace
{
  greeting: "hello";
  count: 3;
  ratio: 1.5;
  active: true;
  tags: ["config", "demo"];
  nested: {
    key: "value";
  };
}
```

Fields can also reference variables declared in the script block.

### Expressions

All expressions in Mace are pure and deterministic.

Supported expression forms:

- identifiers
- member access: `value.member` or `Enum.Member`
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
- bitwise: `&`, `|`, `^`
- logical: `&&`, `||`
- ternary conditional: `condition ? when_true : when_false`

Member access with `.` resolves to enum members when the left-hand side is an
enum name, and to value field access otherwise.

```mace
|===|
string suffix = "one";
|===|

{
  sum: 2 + 2;
  label: "item-$(suffix)";
  flag: 10 > 5 ? true : false;
}
```

### `$self`

`$self` refers to the output object being constructed. Output fields are
evaluated top to bottom, so `$self` may only read fields that have already
been evaluated.

```mace
{
  base: 4;
  doubled: $self.base * 2;
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

### `output = schema`

Schema mode. Output fields contain type references instead of expressions.

### Combination rules

- `output = schema` must be used alone
- `output = data` may be combined with `schema` or `schema_file`, but not both
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

### Variants

Variants use `variant[T1, T2, ...]` syntax and represent closed alternatives.

```mace
type Scalar: variant[string, int];
```

## The script block

The script block is where you define types, schemas, enums, and variables that
feed into the output block.

### Delimiters

The script block is delimited by matching pipe delimiters with at least three
`=` characters.

```mace
|===|
/= declarations go here =/
|===|
```

### Variables

Variables are immutable and must have both an explicit type and an initializer.
The `injectable` keyword marks a variable whose value is supplied at runtime.

```mace
int age = 27;
string name = "Ada";
injectable string env;
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
  name: string;
  age?: int;
};
```

### Enum declarations

Enums define named scalar types with a backing type and a fixed set of members.
Mace supports two backing types, so there are two kinds of enums:

- `string` enums
- `int` enums

Both kinds support two declaration styles:

- implicit values for every member
- explicit values for every member

You must pick one style per enum. Mixing implicit and explicit members in the
same enum is invalid.

#### Implicit `string` enums

Implicit `string` enum members use the member name itself as the runtime value.

```mace
enum Fruit: string {
  Apple,
  Strawberry,
  Pecan,
};
```

This behaves like:

- `Fruit.Apple` => `"Apple"`
- `Fruit.Strawberry` => `"Strawberry"`
- `Fruit.Pecan` => `"Pecan"`

#### Explicit `string` enums

Explicit `string` enums assign every member a string literal.

```mace
enum Fruit: string {
  Apple = "apple",
  Strawberry = "strawberry",
  Pecan = "pecan",
};
```

Every explicit value must be a string literal, and enum values must still be
unique.

#### Implicit `int` enums

Implicit `int` enum members use their zero-based declaration index.

```mace
enum Status: int {
  Pending,
  Running,
  Done,
};
```

This behaves like:

- `Status.Pending` => `0`
- `Status.Running` => `1`
- `Status.Done` => `2`

#### Explicit `int` enums

Explicit `int` enums assign every member an integer literal.

```mace
enum Status: int {
  Pending = 10,
  Running = 20,
  Done = 30,
};
```

Every explicit value must be an integer literal, and enum values must still be
unique.

#### Using enum values

Enum values are accessed with the `.` operator.

```mace
Fruit favorite = Fruit.Apple;
Status current = Status.Running;
```

When an enum value is required, you must use the enum member access form. Raw
backing values such as `"Apple"` or `1` are not assignable to enum-typed
fields or variables.

Enums are named types, so they can be used anywhere a named non-schema type is
allowed, including variables, schema fields, schema-mode output fields, and
imports.

### Imports

Imports must appear before the script block and output block.

```mace
from "./shared.mace" import Name, User;
```

Current import rules:

- import paths are resolved relative to the importing file
- only named imports are supported
- only symbols exposed through the imported file's output block are importable
- top-level `type`, `enum`, `schema`, and variable declarations stay internal
  unless they are surfaced through the output block
- there is no explicit `export` keyword
- circular imports are rejected

Imported symbols depend on the imported file's output mode:

- `output = schema` exposes named type-like fields for import
- a schema-mode field whose type is a record, or references a schema, imports
  as a schema
- other schema-mode fields import as types or enums
- `output = data` exposes named values for import

## Validation

The processor validates things like:

- duplicate declarations and fields
- duplicate enum member names and values
- unknown type references
- type mismatches in variables and expressions
- schema conformance for records and outputs
- import resolution failures and circular imports
- conflicting documentation metadata
