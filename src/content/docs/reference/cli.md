---
title: CLI Reference
description: Commands provided by the Mace CLI.
---

## Install

```bash
go install github.com/louiss0/mace/cmd@latest
```

You can also run directly from source:

```bash
go run ./cmd --help
```

## Root command

The root command is `mace`.

## Commands

- `mace json <path>` evaluates a Mace file and prints JSON output
- `mace import <path> [path...]` converts JSON, YAML, and TOML to `.mace`
- `mace nodes <path>` prints parsed node structure
- `mace source <path>` prints canonical formatted Mace source
- `mace lsp` starts the Language Server Protocol server over stdio

## LSP support

The built-in server currently supports:

- diagnostics
- completions
- hover
- definitions
- document symbols
- code actions
- formatting

## Bindings

Official bindings are available for:

- Node: `@code-fixer-23/mace-node` — [npmx.dev](https://npmx.dev/package/@code-fixer-23/mace-node)
- Python: `mace-python` — [PyPI](https://pypi.org/project/mace-python/)

Both bindings currently wrap the official `mace` CLI.

## Related docs

- [How to Run the Mace LSP](/how-to/run-the-mace-lsp/)
- [How to Format Mace Source](/how-to/format-mace-source/)
