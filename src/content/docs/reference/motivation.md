---
title: Motivation
description: Why Mace exists and why it stays deterministic.
sidebar:
  order: 2
---

Mace exists to make configuration easier to read, validate, and trust.

## The problem it addresses

Many configuration formats are easy to write at first, but harder to grow.
Teams often need:

- reusable values
- shape validation
- clear diagnostics
- strong editor tooling
- documentation beside the config itself

Mace adds those features without turning configuration into arbitrary code.

## Why Mace is deterministic

Mace is designed so the same file and the same inputs produce the same result.
That matters because deterministic configuration is easier to:

- review in pull requests
- cache and compare
- validate in tooling
- use in automation

## How the language supports that

Mace stays predictable by keeping a few rules strict:

- a file produces exactly one output object
- expressions are pure
- variables are immutable
- schemas describe expected record shapes directly
- documentation metadata never changes runtime behavior

## Read next

- [Intro](/reference/intro/)
- [Block Overview](/reference/block-overview/)
- [Spec](/reference/spec/)
