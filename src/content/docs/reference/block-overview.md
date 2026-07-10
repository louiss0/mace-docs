---
title: Block Overview
description: Understand the script block, directives, and the output block.
sidebar:
  order: 3
---

A Mace file has two main parts.

## Script block

The script block is optional.

```mace
|===|
string name = "Ada";
|===|
```

Use it for declarations such as:

- imports
- type aliases
- schemas
- documentation declarations
- variables

The script block must come before the output block.

## Output block

The output block is required.

```mace
{
  name: "Ada"
}
```

This block emits the final record.

## Directives

A directive list can appear before the output block.

```mace
[output = data, schema = User]
{
  name: "Ada"
}
```

Common directives are:

- `output = data`
- `output = schema`
- `schema = <Name>`
- `schema_file = "<path>"`
- `parse = <Schema>`
- `parse_file = "<path>"`

## `$self`

In data output, `$self` reads fields that were already evaluated.

```mace
{
  base: 4,
  doubled: $self.base * 2
}
```

## Read next

- [Variables](/reference/variables/)
- [Records](/reference/records/)
- [Schemas](/reference/schemas/)
