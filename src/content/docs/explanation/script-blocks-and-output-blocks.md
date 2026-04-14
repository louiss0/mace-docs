---
title: Script Blocks and Output Blocks
description: Understand why Mace separates declarations from emitted output.
---

Mace separates reusable declarations from emitted data.

## Script blocks

A script block is where you define:

- variables
- types
- schemas
- enums
- documentation declarations

These declarations support the final output, but they are not themselves the
result of the file.

## Output blocks

The output block is the actual result of evaluation.

That separation keeps the language easy to read:

- declarations explain available building blocks
- the output block shows what the file emits

## Why this split helps

This model makes Mace files easier to scan because you can answer two different
questions quickly:

- what values and types are available?
- what object does this file produce?

## Related docs

- [Language Reference](/reference/language/)
- [How to Validate Output with a Schema](/how-to/validate-output-with-a-schema/)
