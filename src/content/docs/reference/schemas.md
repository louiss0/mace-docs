---
title: Schemas
description: Define named record shapes and validate data against them.
sidebar:
  order: 12
---

Schemas define record types with named fields.

## Schema declarations

```mace
schema User: {
  name: string,
  age?: int,
};
```

A schema field is required unless it uses `?`.

## What schemas are for

Schemas are used to:

- validate variables
- validate output data
- describe reusable record shapes
- validate runtime input through `parse` and `parse_file`

## Output validation

A data output block can validate against a named schema.

```mace
|===|
schema User: {
  name: string,
};
|===|
[output = data, schema = User]
{
  name: "Ada"
}
```

## Schema output

Use `[output = schema]` when the output block should emit type structure instead
of runtime values.

## Read next

- [Block Overview](/reference/block-overview/)
- [Type Aliases](/reference/type-aliases/)
- [Docs](/reference/docs/)
