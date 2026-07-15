---
title: Match Expressions
description: Exhaustively handle variant and choice values.
sidebar:
  order: 10
---

A `match` expression handles every member of a variant or choice:

```mace
variant[string, int] value = 7;

string result = match (value) {
  string => "text",
  int => "number",
};
```

The input must have a `variant[...]` or `choice[...]` type. Concrete values,
arrays, records, and other non-variant types cannot be matched directly.

## Variant patterns

Variant arms use type references. Every resolved member must appear exactly
once:

```mace
schema LocalConfig: { path: string, };
schema RemoteConfig: { url: string, };
variant[LocalConfig, RemoteConfig] config = { path: "/tmp", };

string source = match (config) {
  LocalConfig => "local",
  RemoteConfig => "remote",
};
```

Array types, record types, aliases, and primitive types can be patterns when
they are members of the matched variant.

A variant alias can group multiple source members into one arm. Grouped arms
must not overlap, and together with any concrete arms they must cover the whole
source variant:

```mace
alias TextOrNumber: variant[string, int];
variant[string, int, boolean] value = 7;

string kind = match (value) {
  TextOrNumber => "scalar",
  boolean => "flag",
};
```

Match patterns do not create a new binding. When the matched expression is a
stable variable or member path, that existing path is narrowed to the pattern
type while its arm is checked. A concrete schema arm can therefore access that
schema's fields through the original variable.

## Choice patterns

Choice arms use the exact literal members of the choice:

```mace
alias Environment: choice["dev", "prod"];
Environment environment = "prod";

int workers = match (environment) {
  "dev" => 1,
  "prod" => 4,
};
```

Choice arms cannot use type patterns, and variant arms cannot use literal
patterns.

## Exhaustiveness

There is no default arm. Missing, duplicate, overlapping, unknown, or
incompatible patterns are errors. Every arm ends with a comma, including the
final arm.

Patterns do not introduce a new identifier for the matched value. The matched
expression is evaluated once, and only the selected arm is evaluated.

Arm result types follow conditional result rules. Equal result types stay
concrete; distinct result types form a deduplicated `variant[...]`.
