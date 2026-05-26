---
title: Documentation Syntax
description: How to document Mace code using inline descriptions, doc blocks, gen_doc, and schema_doc.
---

Mace provides four documentation forms. All four are metadata only and never
affect evaluation or output.

- inline declaration descriptions written with `/#`
- inline doc blocks attached to output blocks
- `gen_doc` declarations for named types and variables
- `schema_doc` declarations for named schemas

## Inline declaration descriptions

Use `/#` before a declaration terminator or field separator to attach a short
description to a declaration or field.

Allowed on:

- `type` declarations
- choice members inside `choice[...]`
- schema fields
- output fields
- output schema fields

Not allowed on:

- variable declarations

```mace
|===|
type Name: string /# A user display name;
type Status: choice["Pending", "Running"] /# Runtime status values;

schema User: {
  name: string /# The user's display name,
  age?: int /# Optional age in years
};
|===|

[output = data]
{
  name: "Ada" /# The emitted user name,
}
```

## Inline doc blocks

An inline doc block is a static triple-quoted block string placed between the
directive list and the opening `{` of an output block.

```mace
[output = data]
"""
# User Payload

This block emits user data.
"""
{
  name: "Ada"
}
```

## Documentation declarations

`gen_doc` attaches structured metadata to a named `type` or non-object variable.
`schema_doc` attaches structured metadata to a named `schema` or object-valued variable.

```mace
schema User: {
  name: string,
  age?: int,
};

schema_doc User {
  summary: "Represents a user.",
  description: """
# User

A reusable schema that models application users.
""",
  props: {
    name: "The user's display name",
    age: "Optional age in years",
  },
};
```

```mace
type Name: string;
string greeting = "Hello";

gen_doc Name {
  summary: "A user display name.",
};

gen_doc greeting {
  summary: "Rendered greeting.",
};
```

```mace
type Status: choice["Pending", "Running"];

gen_doc Status {
  summary: "Runtime status.",
};

User profile = {
  name: greeting,
};

schema_doc profile {
  summary: "Profile object.",
  props: {
    name: "Profile display name",
  },
};
```

Rules:

- `gen_doc` must appear after the target `type` or non-object variable declaration
- `schema_doc` must appear after the target `schema` or object-valued variable declaration
- each target may have at most one documentation declaration
- `gen_doc` supports `summary` and `description`
- `schema_doc` supports `summary`, `description`, and `props`
- documentation entries end with `,` inside the declaration body
- `props` entries also use commas, not semicolons
- `props` is allowed only in `schema_doc`
- `props` keys must match fields on the target schema or object-valued variable

## Conflict rules

The same declaration must not be documented by more than one form.

- a `type` with a `gen_doc` declaration must not also have an inline `/#`
- a schema field documented through `schema_doc ... props` must not also have
  an inline `/#` description

## Comments

Mace comments use the `/=` prefix and are not documentation metadata.
Comments are discarded during parsing, while documentation forms are preserved.

## Related docs

- [Language Reference](/reference/language/)
- [How to Validate Output with a Schema](/how-to/validate-output-with-a-schema/)
