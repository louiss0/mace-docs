---
title: Type Aliases
description: Reusable names for primitive, array, choice, fusion, and variant types.
sidebar:
  order: 11
---

Type aliases give a reusable name to a type.

## Basic aliases

```mace
type Name: string;
type Scores: array<int>;
type Alias: Name;
```

## Choice aliases

Choices define finite literal domains.

```mace
type Fruit: choice["apple", "strawberry", "pecan"];
```

Choice aliases can compose other choice aliases.

```mace
type BaseEnv: choice["dev", "prod"];
type ExtendedEnv: choice[BaseEnv, "preview", true];
```

## Fusion aliases

Fusions compose schema shapes.

```mace
type User: fusion[Profile, Audit];
```

## Variant aliases

Variants define closed alternatives.

```mace
type Scalar: variant[string, int];
type Payload: variant[array<string>, array<int>];
```

## Read next

- [Type System Overview](/reference/type-system-overview/)
- [Schemas](/reference/schemas/)
- [Docs](/reference/docs/)
