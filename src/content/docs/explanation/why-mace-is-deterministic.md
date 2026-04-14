---
title: Why Mace Is Deterministic
description: Understand why Mace focuses on repeatable, predictable output.
---

Mace is designed to produce the same output for the same inputs.

## Why that matters

Deterministic configuration is easier to:

- review in code
- validate in tooling
- cache and compare
- trust in automation

## How the language supports this

Mace keeps evaluation predictable by combining a few constraints:

- a file produces exactly one output object
- expressions are pure
- declarations are explicit
- schemas describe expected shapes directly
- documentation metadata does not change runtime behavior

## Why interpolation fits this model

Mace prefers interpolation inside strings because it keeps text assembly local to
the string being emitted. That makes configuration easier to read than treating
text construction as general-purpose string programming.

## Related docs

- [Language Reference](/reference/language/)
- [First Mace File](/tutorials/first-mace-file/)
