---
title: Type Aliases
description: Reusable names for primitive, array, choice, fusion, and variant types.
sidebar:
  order: 11
---

Type aliases give a reusable name to a type.

## Basic aliases

```mace
alias Name: string;
alias Scores: array<int>;
alias Alias: Name;
```

## Choice aliases

Choices define finite literal domains.

```mace
alias Fruit: choice["apple", "strawberry", "pecan"];
```

Choice aliases can compose other choice aliases.

```mace
alias BaseEnv: choice["dev", "prod"];
alias ExtendedEnv: choice[BaseEnv, "preview", true];
```

## Fusion aliases

Fusions compose schema shapes.

```mace
alias User: fusion[Profile, Audit];
```

## Variant aliases

Variants define closed alternatives.

```mace
alias Scalar: variant[string, int];
alias Payload: variant[array<string>, array<int>];
```

## Read next

- [Type System Overview](/reference/type-system-overview/)
- [Schemas](/reference/schemas/)
- [Docs](/reference/docs/)
