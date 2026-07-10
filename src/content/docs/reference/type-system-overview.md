---
title: Type System Overview
description: A quick map of the kinds of types that Mace supports.
sidebar:
  order: 4
---

Mace is explicit about types. Types are used in variable declarations, schema
fields, type aliases, and schema output.

## Primitive types

The primitive types are:

- `string`
- `int`
- `float`
- `boolean`

## Composite types

Mace also supports:

- `array<T>` for ordered lists
- record-shaped schemas for named fields
- `choice[...]` for finite literal domains
- `variant[...]` for closed alternatives
- `fusion[...]` for schema composition

## Named types

You can give a type a reusable name with a type alias.

```mace
type Name: string;
type Tags: array<string>;
```

## Where types are used

Types appear in:

- variable declarations
- schema fields
- type aliases
- schema-mode output blocks
- validation rules for records and arrays

## Read next

- [String](/reference/string/)
- [Number](/reference/number/)
- [Boolean](/reference/boolean/)
- [Arrays](/reference/arrays/)
- [Type Aliases](/reference/type-aliases/)
- [Schemas](/reference/schemas/)
