---
title: Type Narrowing
description: Test and narrow variant values with the is operator.
sidebar:
  order: 10
---

The `is` operator tests whether a value conforms to a type and returns a
`boolean`:

```mace
value is string
config is LocalConfig
items is array<string>
```

The right side is always a type reference, never a runtime value.

## Narrowing variants

When an `is` test directly controls a conditional expression, Mace narrows the
stable value path in each branch:

```mace
variant[string, int] value = "Mace";

string result = value is string
    ? value
    : "fallback";
```

The true branch sees `string`; the false branch sees `int`. With more members,
the false branch retains a smaller variant in the original member order.
Nested conditionals continue from the already narrowed branch.

## Schemas and arrays

Schema narrowing preserves closed-schema identity and enables member-specific
access:

```mace
schema LocalConfig: { path: string, };
schema RemoteConfig: { url: string, };
variant[LocalConfig, RemoteConfig] config = { path: "/tmp", };

string source = config is LocalConfig ? config.path : config.url;
```

Array tests compare their resolved element types:

```mace
variant[array<string>, string] value = ["first"];
string first = value is array<string> ? value[0] : value;
```

Transparent aliases and choices can also be used as targets.

## Scope and diagnostics

Narrowing exists only inside the two branches of the directly controlled
conditional. It does not change the variable's declared type, escape the
conditional, or flow through a stored boolean. Negated tests do not narrow in
the initial implementation.

A target that cannot match the current source type is rejected with
`mace.type.impossible-narrowing`. An absent `nullable` value does not match its
present target type; the true branch sees the non-nullable present type.
