---
title: Documentation Syntax
description: How to document Mace code using inline descriptions, doc blocks, and doc declarations.
---

Mace provides three documentation forms. All three are **metadata only** and
never affect evaluation or output.

1. **Inline declaration descriptions** — short annotations written with `/#`.
2. **Inline doc blocks** — block strings attached to output blocks.
3. **Doc declarations** — structured metadata for named types and schemas.

## Inline declaration descriptions

Use `/#` before the terminating `;` to attach a short description to a
declaration or field.

Allowed on:

- `type` declarations
- schema fields
- output fields
- output schema fields

Each declaration or field may have at most one `/#` description. The text
after `/#` is raw metadata, not a string literal.

```mace
|===|
type Name: string /# A user display name;

schema User: {
  name: string /# The user's display name;
  age?: int /# Optional age in years;
};
|===|

[output = data]
{
  name: "Ada" /# The emitted user name;
}
```

In schema output mode, inline descriptions work the same way:

```mace
[output = schema]
{
  name: string /# The user's display name;
  age?: int /# Optional age;
}
```

## Inline doc blocks

An inline doc block is a static triple-quoted block string placed between
the directive list and the opening `{` of an output block.

Rules:

- A directive list **must** be present (e.g. `[output = data]`).
- The block string must appear immediately after the directive list.
- It must be a static block string (no interpolation).
- At most one inline doc block is allowed per output block.

```mace
[output = data]
"""
# User Payload

This block emits user data.
"""
{
  name: "Ada";
}
```

If no directive list is present, an inline doc block is not allowed:

```mace
/= This is valid — no directive, no doc block. =/
{
  name: "Ada";
}
```

## Doc declarations

A `doc` declaration attaches structured metadata to a named `type` or
`schema`. It is written as a separate declaration inside the script block.

```mace
doc <TargetName> {
  summary: "...";
  description: """
...
""";
  props: {
    field_name: "...";
  };
}
```

Rules:

- The target after `doc` must resolve to a named `type` or `schema`.
- Each target may have at most one `doc` declaration.
- Supported entries are `summary`, `description`, and `props`.
- Duplicate or unknown entries are invalid.
- `summary` must be a static string literal.
- `description` must be a static block string.
- `props` is allowed only when the target is a schema.
- `props` keys must match fields on the target schema.

### Documenting a type

```mace
|===|
doc Name {
  summary: "A user display name.";
  description: """
# Name

A reusable alias for user display names.
""";
}

type Name: string;
|===|
```

### Documenting a schema

```mace
|===|
doc User {
  summary: "Represents a user.";
  description: """
# User

A reusable schema that models application users.
""";
  props: {
    name: "The user's display name";
    age: "Optional age in years";
  };
}

schema User: {
  name: string;
  age?: int;
};
|===|
```

## Conflict rules

The same declaration must not be documented by more than one form.

- A `type` with a `doc` declaration must **not** also have an inline `/#`
  description.
- A schema field documented through `doc <Schema> { props: { ... } }` must
  **not** also have an inline `/#` description on the same field.

When structured documentation already exists in a `doc` declaration, extend
that declaration instead of adding a duplicate inline description.

```mace
/= ✗ Invalid — duplicates documentation on Name =/
|===|
doc Name {
  summary: "A display name.";
}

type Name: string /# A display name;
|===|
```

```mace
/= ✓ Valid — use one form only =/
|===|
doc Name {
  summary: "A display name.";
}

type Name: string;
|===|
```

## Comments

Mace comments use the `/=` prefix and are **not** documentation metadata.
Comments are discarded during parsing, while doc forms are preserved.

- **Line comment**: starts with `/=` and continues to the end of the line.
- **Block comment**: starts with `/=` and ends with `=/`.

Disambiguation: if `=/` appears before the next newline, the comment is a
block comment. Otherwise it is a line comment.

```mace
/= This is a line comment

/= This is a block comment =/

/=
  This is also
  a line comment because =/
  does not appear on the first line
=/
```

Use comments for internal notes. Use `/#`, inline doc blocks, or `doc`
declarations for metadata that should be preserved and surfaced by tooling.

## Complete example

This file uses all three documentation forms together:

```mace
from "./shared.mace" import Profile;

|===|
doc Environment {
  summary: "Deployment target.";
  description: """
# Environment

Selects which runtime configuration to apply.
""";
}

enum Environment: string {
  Dev,
  Staging,
  Prod,
};

doc AppConfig {
  summary: "Top-level application configuration.";
  props: {
    env: "The active deployment target";
    name: "Application display name";
    debug: "Enable verbose logging";
  };
}

schema AppConfig: {
  env: Environment;
  name: string;
  debug?: boolean;
};

type AppName: string /# Short alias for the app name;

AppName app = "Mace Demo";
Environment env = Environment.Prod;
|===|

[output = data, schema = AppConfig]
"""
# App Configuration Output

Emits the resolved application configuration as data.
"""
{
  env: env;
  name: app;
  debug: false /# Disabled by default in production;
}
```
