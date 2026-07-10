---
title: String
description: String literals, interpolation, and block strings in Mace.
sidebar:
  order: 6
---

Mace has three string literal forms.

## Single-quoted strings

Single-quoted strings do not interpolate.

```mace
'value'
```

## Double-quoted strings

Double-quoted strings support interpolation with `$(...)`.

```mace
"Hello $(name)"
```

## Block strings

Triple-quoted block strings are for multi-line text and also support
interpolation.

```mace
"""
Hello $(name)
Welcome to Mace.
"""
```

## Interpolation rules

The expression inside `$(...)` is a normal Mace expression and must resolve to a
runtime value.

```mace
{
  message: "Sum: $(2 + 2)"
}
```

## Read next

- [Variables](/reference/variables/)
- [Docs](/reference/docs/)
- [Spec](/reference/spec/)
