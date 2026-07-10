---
title: Arrays
description: Array types, array literals, and array access in Mace.
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

## Array access

Arrays use zero-based indexing with an integer literal.

```mace
{
  names: ["Ada", "Linus", "Grace"],
  first_name: $self.names[0]
}
```

Array access can be chained for nested arrays.

```mace
|===|
array<array<array<int>>> matrix = [[[1]]];
|===|
[output = data]
{
  value: matrix[0][0][0]
}
```

## Array merge

When `<>` is used on arrays, the arrays concatenate from left to right.

## Read next

- [Records](/reference/records/)
- [Type Aliases](/reference/type-aliases/)
- [Schemas](/reference/schemas/)
