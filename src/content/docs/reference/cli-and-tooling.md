---
title: CLI and Tooling
description: Mace CLI commands, built-in LSP support, and official bindings.
---
## Install and download

Download/install the Mace CLI:

```bash
go install github.com/louiss0/mace/cmd@latest
```

You can also run directly from source:

```bash
go run ./cmd --help
```

## CLI commands

The root command is `mace`.

- `mace json <path>`: evaluate a Mace file and print JSON output
- `mace import <path> [path...]`: convert JSON, YAML, and TOML to `.mace`
- `mace nodes <path>`: print parsed node structure
- `mace source <path>`: print canonical formatted Mace source
- `mace lsp`: start the Language Server Protocol server over stdio

## Downloadable LSP support

Mace has LSP support in the CLI itself. Once the CLI is downloaded/installed,
you already have the LSP:

```bash
mace lsp
```

The server currently supports diagnostics, completions, hover, definitions,
document symbols, code actions, and formatting.

## Node and Python bindings

Mace includes official bindings for Node and Python:

- Node: `bindings/node` (`@code-fixer-23/mace-node`)
- Python: `bindings/python` (`mace-python`)

Both bindings currently wrap the official `mace` CLI.
