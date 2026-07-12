---
title: Arrays
description: Array types and array literals in Mace.
sidebar:
  order: 9
---

Arrays are ordered lists of values.

## Array types

Use `array<T>` to describe an array of values.

```mace
array<string>
array<int>
array<array<int>>
```

## Array literals

```mace
["config", "demo"]
[1, 2, 3]
```

## Array merge

When `<>` is used on arrays, the arrays concatenate from left to right.

## Read next

- [Records](/reference/records/)
- [Type Aliases](/reference/type-aliases/)
- [Schemas](/reference/schemas/)
