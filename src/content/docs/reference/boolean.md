---
title: Boolean
description: Boolean values, comparisons, and conditional logic in Mace.
sidebar:
  order: 8
---

The boolean type has two values:

- `true`
- `false`

## Where booleans come from

Booleans are produced by:

- boolean literals
- comparisons
- equality checks
- logical expressions
- conditional expressions

```mace
{
  active: true,
  allowed: 10 > 5,
  valid: true && false,
  label: 10 > 5 ? "yes" : "no"
}
```

## Operators

Mace supports:

- `!`
- `&&`
- `||`
- comparison operators such as `<` and `>=`
- equality operators `==` and `!=`

## Read next

- [Number](/reference/number/)
- [Records](/reference/records/)
- [Spec](/reference/spec/)
