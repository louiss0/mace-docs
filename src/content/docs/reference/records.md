---
title: Records
description: Record literals, output fields, member access, and structural merge.
sidebar:
  order: 10
---

Records are named field collections.

## Record literals

```mace
{
  name: "Ada",
  enabled: true,
  tags: ["config", "demo"]
}
```

Each field is a `name: value` pair.

## Member access

Use `.` to read a record field.

```mace
|===|
string suffix = "one";
|===|

{
  label: "item-$(suffix)",
  nested: { key: "value" },
  key: $self.nested.key
}
```

## Output records

The output block itself is a record. Fields are evaluated from top to bottom.
That is why `$self` can only read fields that already exist.

## Structural merge

Use `<>` to merge records deeply.

```mace
{
  profile: { name: "Ada" } <> { active: true }
}
```

Records and arrays are the mergeable shapes in Mace.

## Read next

- [Block Overview](/reference/block-overview/)
- [Schemas](/reference/schemas/)
- [Spec](/reference/spec/)
