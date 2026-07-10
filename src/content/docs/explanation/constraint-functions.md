---
title: Constraint Functions
description: A design note for future declaration-level validation constraints in Mace.
---

Constraint functions are a planned Mace feature for attaching validation rules
to declarations.

They are not general user-defined functions. They do not produce values. They
exist only to declare validation behavior.

## Core idea

Mace already separates values from structure:

- expressions produce values
- types describe allowed shapes
- schemas validate object structure

Constraint functions would extend that model by adding declaration-level
validation clauses.

## What constraints are

Constraints are built-in validation clauses that may follow typed declarations.
They are part of declaration syntax, not expression syntax.

Planned rule:

> A declaration may be followed by zero or more constraints.
> Constraints do not produce values, cannot be assigned, and cannot appear
> inside expressions.

## Where constraints would be allowed

The intended direction is to allow constraints only after the type portion of a
declaration.

That means they would follow:

- schema fields
- typed variable declarations

Examples:

```mace
schema User: {
  username: string match(re"^[a-z][a-z0-9_]{2,31}$", "Username must start with a letter and contain only lowercase letters, numbers, or underscores"),
  age: int min(13, "Age must be at least 13")
};

|===|
string match(re"^[a-z]+$", "Username must only contain lowercase letters") username = "shelton";
int min(13, "Age must be at least 13") age = 22;
|===|
```

This keeps declarations readable:

- declaration first
- type first
- constraint second

## Placement rule

Constraints should appear immediately after the type.

For schema fields, that means the constraint appears after the field type.
For typed variables, that means the constraint appears after the declared type
and before the variable name.

Good:

```mace
username: string match(re"^[a-z]+$", "Invalid username"),
string match(re"^[a-z]+$", "Invalid username") username = "ada";
```

Not planned:

```mace
match(re"^[a-z]+$", "Invalid username") string username = "ada";
string username match(re"^[a-z]+$", "Invalid username") = "ada";
string username = "ada" match(re"^[a-z]+$", "Invalid username");
```

This preserves declaration-first readability and keeps the grammar predictable.

## Why these are not decorators

The `@name` style was considered and rejected for this feature direction.

For Mace, a constraint should feel like part of the declaration grammar rather
than metadata attached from the outside.

So this direction prefers forms like:

```mace
username: string match(...),
age: int min(...)
```

instead of decorator-like syntax.

## Message rule

A key design rule for this feature is:

> If a constraint takes arguments, it should always require a message.

More formally:

- constraints with one or more non-message arguments must end with a required
  string message argument
- constraints with no arguments may omit a message if that is explicitly
  defined for that constraint
- if a constraint accepts a message, the message is always the last argument

Examples:

```mace
string match(re"^[a-z]+$", "Only lowercase letters allowed") username = "abc";
int min(13, "Must be at least 13") age = 10;
```

That keeps validation output predictable and avoids inconsistent default error
messages.

## Meaning in schemas vs variables

The same syntax can mean the same rule at different stages.

### In schemas

A constraint defines validation rules for values assigned to that field.

```mace
username: string match(re"^[a-z]+$", "Username must contain only lowercase letters")
```

### In variables

A constraint validates the initializer immediately.

```mace
string match(re"^[a-z]+$", "Username must contain only lowercase letters") username = "Ada";
```

This keeps the mental model consistent while letting Mace validate at the right
moment.

## Suggested built-in constraint families

These are natural candidates for built-in constraints.

### String constraints

- `match(pattern, message)`
- `min_length(n, message)`
- `max_length(n, message)`
- `length(min, max, message)`
- `starts_with(prefix, message)`
- `ends_with(suffix, message)`
- `contains(text, message)`

### Number constraints

- `min(value, message)`
- `max(value, message)`
- `range(min, max, message)`
- `positive(message)`
- `negative(message)`

### Array constraints

These are likely later additions:

- `min_items(n, message)`
- `max_items(n, message)`

## Parsing model

A future parser implementation would likely extend the grammar for typed
variable declarations and schema fields so they can accept a repeated
constraint suffix after the type portion.

At a high level, that would look like:

- parse the declared type
- parse zero or more constraints
- if the declaration is a variable, parse the declaration name
- if the declaration is a variable, parse the initializer
- terminate the declaration as usual

Constraints should not be parsed as expressions. They should have their own AST
node shape, likely something like:

- constraint name
- zero or more typed arguments
- required message argument when applicable
- source range for diagnostics

## Validation model

A future processor implementation would likely:

- validate that a constraint is allowed for the declared type
- validate argument count and argument types
- validate that required message arguments exist
- evaluate the constraint against the field value or variable initializer
- collect validation failures with the provided messages

For schemas, collecting all failures is likely the best default because it gives
users the full set of validation problems in one pass.

## Important restrictions

To keep the language simple, constraints should remain declaration-only.

Good:

```mace
username: string match(re"^[a-z]+$", "Invalid username"),
string match(re"^[a-z]+$", "Invalid username") username = "ada";
```

Not allowed:

```mace
some_call(match(...))
a + min(3, "nope")
```

This keeps the parser, analyzer, and mental model much cleaner.

## Why this fits Mace

Constraint functions fit Mace because they extend the language's existing
strengths:

- explicit typed declarations
- deterministic behavior
- schema-driven validation
- clear separation between runtime values and metadata

This gives Mace a real validation layer without turning it into a
general-purpose programming language.

## Status

This is a future-feature design note, not current language behavior.

Before implementation, the remaining decisions to lock down are:

- exact grammar shape for schema-field constraints
- exact grammar shape for typed-variable constraints
- whether multiple constraints can be chained on a single declaration
- which built-in constraints ship first
- whether schema validation stops at first failure or collects all failures

## Related docs

- [Type System Overview](/reference/type-system-overview/)
- [Why Mace Is Deterministic](/explanation/why-mace-is-deterministic/)
