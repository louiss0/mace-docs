---
title: Records
description: Record literals, output fields, and member access.
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


## Read next

- [Block Overview](/reference/block-overview/)
- [Schemas](/reference/schemas/)
- [Spec](/reference/spec/)
