---
title: Language Reference
description: Rules and semantics for every Mace language feature.
---

Mace is a typed configuration language that produces deterministic object
data. Every Mace file evaluates to a single output object.

A file can contain:

1. Zero or more **import** declarations.
2. An optional **script block** for types, schemas, enums, and variables.
3. Exactly one **output block** — the only required part.

The output block is where data is emitted. The script block is where you
define the types and values that feed into it.

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

---

## The output block

The output block is the only required part of a Mace file. It produces a
record of named fields, each holding a data value.

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

Fields hold data values — strings, integers, floats, booleans, arrays, and
records:

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

Fields can also reference variables declared in the script block:

```mace
|===|
string name = "Ada";
|===|

{
  name: name;
}
```

### Expressions

All expressions in Mace are pure and deterministic.

Supported expression forms:

- Identifiers
- Member access: `value.member` or `Enum.Member`
- String, int, float, and boolean literals
- Array literals
- Record literals
- `$self` references

Supported operators (grouped by category):

- **Unary**: `!`, `~`, unary `+`, unary `-`
- **Arithmetic**: `+`, `-`, `*`, `/`, `%`, `**`
- **Shift**: `<<`, `>>`, `>>>`
- **Comparison**: `<`, `<=`, `>`, `>=`
- **Equality**: `==`, `!=`
- **Bitwise**: `&`, `|`, `^`
- **Logical**: `&&`, `||`
- **Ternary conditional**: `condition ? when_true : when_false`

Member access with `.` resolves to enum members when the left-hand side is
an enum name, and to value field access otherwise.

```mace
{
  sum: 2 + 2;
  label: "item-" + "one";
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

- **Single-quoted**: `'hello'` — no interpolation.
- **Double-quoted**: `"Hello $(name)"` — supports interpolation.
- **Block strings**: `"""..."""` — multi-line, supports interpolation.

Interpolation uses `$(...)`. The expression inside is parsed as a normal
Mace expression and must resolve to a runtime value. Type references are
not valid interpolation expressions.

```mace
"Hello $(name)"
"$(price * quantity)"
"$(user.name)"
"$(Status.Done)"
"$($self.name)"
"""
Name: $(user_name)
"""
```

Rules:

- Inline strings (single- and double-quoted) must not span multiple lines.
- Block strings may span multiple lines.
- Supported escapes: `\\`, `\'`, `\"`, `\n`, `\r`, `\t`.
- Strings used as documentation (`doc` entries, inline doc blocks) must be
  static — no interpolation.

### Comments

Comments use the `/=` prefix.

- **Line comment**: `/=` continues to the end of the line.
- **Block comment**: `/=` ... `=/`.

Disambiguation: if `=/` appears before the next newline, the comment is a
block comment. Otherwise it is a line comment.

```mace
/= line comment

/= block comment =/
```

Comments are discarded during parsing. For metadata that should be
preserved, see [Documentation Syntax](/reference/doc-syntax/).

---

## Directives

A directive list is placed before the output block's opening `{` using
square brackets. If no directive is present, the output mode defaults to
`data`.

### `output = data`

The default mode. Output fields are expressions that produce values.

```mace
[output = data]
{
  name: "Ada";
  age: 27;
}
```

### `output = data, schema = <Name>`

Data mode with schema validation. The output record is validated against
the named schema.

```mace
[output = data, schema = User]
{
  name: "Ada";
  age: 27;
}
```

### `output = data, schema_file = "<path>"`

Data mode with external schema validation. The processor loads type and
schema declarations from the referenced Mace file before validating the
output.

```mace
[output = data, schema_file = "./schemas.mace"]
{
  name: "Ada";
}
```

### `output = schema`

Schema mode. Output fields contain type references instead of expressions.

```mace
[output = schema]
{
  name: string;
  age?: int;
}
```

### Combination rules

- `output = schema` must be used **alone**.
- `output = data` may be combined with `schema` **or** `schema_file`, but
  not both in the same directive list.
- Duplicate output directives are invalid.
- Duplicate output field names are invalid.

---

## Types

This section covers how types are written in Mace. Types are used in the
script block for declarations and in schema-mode output blocks.

### Primitives

The four primitive types:

- `string` — text values
- `int` — integer numbers
- `float` — floating-point numbers
- `boolean` — `true` or `false`

### Arrays

Arrays use `array<T>` syntax:

```mace
array<string>
array<int>
array<User>
array<array<int>>
```

Arrays must be homogeneous — all elements share the same type. Nested
arrays and arrays of schemas are supported.

### Unions

Unions use `union[T1, T2, ...]` syntax and represent **schema
composition**:

```mace
type User: union[Profile, Audit];
```

Rules:

- Union members **must** be schemas.
- A union combines all member schema fields into one closed record shape.
- Conflicting fields across member schemas are invalid.
- Required fields stay required unless **every** member marks the field
  optional.

```mace
schema Profile: { name: string; };
schema Audit: { created_at: string; };
type User: union[Profile, Audit];

/= User requires both name and created_at =/
```

### Variants

Variants use `variant[T1, T2, ...]` syntax and represent **closed
alternatives**:

```mace
type Scalar: variant[string, int];
```

Rules:

- A variant value must match **exactly one** member.
- Record members are closed — unknown fields are rejected.
- Record values may not mix fields from different variant members.
- If a value matches zero or more than one member, validation fails.

Variants can also be written inline on schema fields:

```mace
schema ValueBox: {
  value: variant[string, int];
};
```

---

## The script block

The script block is where you define types, schemas, enums, and variables
that feed into the output block.

### Delimiters

The script block is delimited by matching pipe delimiters with at least
three `=` characters:

```mace
|===|
/= declarations go here =/
|===|
```

Both delimiters must use the same number of `=` characters. `|===|` and
`|====|` are both valid.

### Variables

Variables are immutable and must have both an explicit type and an
initializer. Bindings use `=`; type declarations use `:`.

```mace
int age = 27;
string name = "Ada";
boolean active = true;
array<int> scores = [1, 2, 3];
```

The `injectable` keyword marks a variable whose value is supplied at
runtime. Injectables do not require an initializer — an error is raised if
no value is injected.

```mace
injectable string env;
```

Variables are available to later declarations and to the output block.
Type inference is not part of the current language.

### Type declarations

Type declarations use `:` after the name. `=` is reserved for variable
initializers and enum member values.

Type aliases can target primitive types, array types, or named types:

```mace
type Name: string;
type Scores: array<int>;
type Alias: Name;
```

### Schema declarations

Schemas define record types with required and optional fields. They also
use `:` after the declared name.

```mace
schema User: {
  name: string;
  age?: int;
};
```

Rules:

- Field names must be unique within a schema.
- A `?` after the field name makes it optional.

### Enum declarations

Enums define named scalar types with a backing type and a fixed set of
unique member values.

```mace
enum Fruit: string {
  Apple,
  Strawberry,
  Pecan,
};

enum Status: int {
  Pending,
  Running,
  Done,
};
```

Rules:

- Supported backing types are `string` and `int`.
- Member names must be unique within the enum.
- Member values must be unique within the enum.
- All members must be **all-implicit** or **all-explicit** — mixing is
  invalid.
- An implicit `string` member uses its member name exactly as written.
- An implicit `int` member uses its zero-based declaration index.
- Explicit `string` values must be string literals.
- Explicit `int` values must be integer literals.

Enum values are accessed with the `.` operator:

```mace
Fruit favorite = Fruit.Apple;
```

When an enum type is expected, raw backing values (e.g. `"Apple"`) are
**not** assignable — you must use `EnumName.MemberName`.

Enums may be used in variable declarations, schema fields, output schema
fields, and imports.

### Imports

Imports must appear before the script block and output block.

```mace
from "./shared.mace" import Name, User;
```

Rules:

- Import paths are resolved **relative to the importing file**.
- Only named imports are supported.
- Only symbols exposed through the imported file's **output block** are
  importable. Top-level `type`, `enum`, `schema`, and variable declarations
  are internal unless surfaced through the output block.
- There is no explicit `export` keyword.
- Circular imports are rejected.

What is importable depends on the referenced file's output mode:

- `output = schema` exposes named type-like fields. A field whose type is a
  record or references a schema is imported as a schema; other fields are
  imported as types or enums.
- `output = data` exposes named values.

---

## Validation

The processor validates:

- Duplicate declarations, schema fields, output directives, and output
  fields
- Duplicate enum member names and enum values
- Mixed implicit and explicit enum members
- Invalid enum backing types and member literal types
- Unknown type references
- Type mismatches in variables and expressions
- Enum-constrained values in variables and schema-validated output
- Schema conformance for record literals and output blocks
- Mixed-type array literals
- Import resolution failures and circular imports
- Duplicate or conflicting documentation on the same declaration or field
