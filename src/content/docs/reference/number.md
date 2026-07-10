---
title: Number
description: Numeric types and operators in Mace.
sidebar:
  order: 7
---

Mace has two numeric primitives:

- `int`
- `float`

## Literals

```mace
1
42
3.14
```

## Numeric operators

Mace supports:

- `+`, `-`, `*`, `/`, `%`, `**`
- `<`, `<=`, `>`, `>=`
- `==`, `!=`

Bitwise and shift operators are integer-only:

- `&`, `|`, `^`, `~`
- `<<`, `>>`, `>>>`

## Result rules

For arithmetic:

- `int` with `int` produces `int`
- if either operand is `float`, the result is `float`

```mace
{
  whole: 9 % 4,
  mixed: 1 + 2.5,
  power: 2 ** 3.0
}
```

## Read next

- [Boolean](/reference/boolean/)
- [Arrays](/reference/arrays/)
- [Spec](/reference/spec/)
