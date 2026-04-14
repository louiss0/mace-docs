---
title: Documentation Syntax
description: How to document Mace code using inline descriptions, doc blocks, gen_doc, and schema_doc.
---

Mace provides four documentation forms. All four are metadata only and never
affect evaluation or output.

- inline declaration descriptions written with `/#`
- inline doc blocks attached to output blocks
- `gen_doc` declarations for named types and variables
- `schema_doc` declarations for named schemas and enums

## Inline declaration descriptions

Use `/#` before the terminating `;` to attach a short description to a
declaration or field.

Allowed on:

- `type` declarations
- schema fields
- output fields
- output schema fields

Not allowed on:

- variable declarations

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
  name: "Ada";
}
```

## Documentation declarations

`gen_doc` attaches structured metadata to a named `type` or variable.
`schema_doc` attaches structured metadata to a named `schema` or `enum`.

```mace
schema User: {
  name: string;
  age?: int;
};

schema_doc User {
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
```

```mace
type Name: string;
string greeting = "Hello";

gen_doc Name {
  summary: "A user display name.";
}

gen_doc greeting {
  summary: "Rendered greeting.";
}
```

```mace
enum Status: string {
  Pending,
  Running,
};

schema_doc Status {
  summary: "Runtime status.";
}
```

Rules:

- `gen_doc` must appear after the target `type` or variable declaration
- `schema_doc` must appear after the target `schema` or `enum` declaration
- each target may have at most one documentation declaration
- supported entries are `summary`, `description`, and `props`
- `props` is allowed only in `schema_doc`, and only when the target is a schema

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
