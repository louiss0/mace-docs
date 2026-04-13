---
title: Getting Started
description: Build and run your first Mace file.
---

This guide walks through the smallest useful Mace workflow using the current
language spec and CLI.

## 1) Install the CLI

```bash
go install github.com/louiss0/mace/cmd@latest
```

## 2) Create a file

Create `hello.mace`:

```txt
|===|
string name = "Ada";
|===|
[output = data]
{
  greeting: "Hello $(name)";
}
```

This follows the language structure from the spec:

1. Optional imports
2. Optional script block
3. Exactly one output block

## 3) Evaluate to JSON

```bash
mace json ./hello.mace
```

Expected output:

```json
{
  "greeting": "Hello Ada"
}
```

## 4) Format source

```bash
mace source ./hello.mace
```

## 5) Use the built-in LSP

The Mace CLI includes an LSP server. After downloading/installing the CLI:

```bash
mace lsp
```

## 6) Use bindings if needed

- Node: `@code-fixer-23/mace-node`
- Python: `mace-python`
