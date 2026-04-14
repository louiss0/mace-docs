---
title: How to Print Canonical Mace Output
description: Print canonical Mace source from a file with the output command.
---

Use the `output` command when you want canonical Mace output.

This command prints canonical Mace source. It does not evaluate the file into
runtime JSON output.

## Print canonical output

```bash
mace output ./hello.mace
```

The command prints canonical Mace source to stdout.

## When to use it

Use this when you want to:

- normalize whitespace and layout
- inspect the canonical source form
- compare formatting changes consistently

## Related docs

- [CLI Reference](/reference/cli/)
- [First Mace File](/tutorials/first-mace-file/)
