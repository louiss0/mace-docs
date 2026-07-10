---
title: Variables
description: Learn how Mace variables are declared and used.
sidebar:
  order: 5
---

Variables live in the script block.

## Declaration form

Variables are immutable, explicitly typed, and must have an initializer.

```mace
string name = "Ada";
int age = 27;
```

## Nullable variables

Use `nullable` when a variable may be `null`.

```mace
nullable string env = null;
```

## Using variables

Variables can be referenced from later declarations and from the output block.

```mace
|===|
string name = "Ada";
|===|

{
  name: name
}
```

## Important rules

- variables must have an explicit type
- variables must have an initializer
- variables do not mutate
- variables are runtime values, unlike type aliases and schemas

## Read next

- [String](/reference/string/)
- [Number](/reference/number/)
- [Records](/reference/records/)
