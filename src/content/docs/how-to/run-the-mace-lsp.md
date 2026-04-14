---
title: How to Run the Mace LSP
description: Start the built-in Language Server Protocol server from the CLI.
---

Mace ships its LSP server inside the CLI.

## Start the server

```bash
mace lsp
```

The server runs over stdio, which makes it suitable for editor integration.

## What it supports

The current server supports:

- diagnostics
- completions
- hover
- definitions
- document symbols
- code actions
- formatting

## Related docs

- [CLI Reference](/reference/cli/)
- [First Mace File](/tutorials/first-mace-file/)
