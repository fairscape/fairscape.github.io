---
title: fairscape-models
description: "The FAIRSCAPE data model: Pydantic classes to build and validate RO-Crate metadata."
---

The FAIRSCAPE data model. Pydantic classes for every entity in a FAIRSCAPE
RO-Crate (`Dataset`, `Software`, `Computation`, `MLModel`, `Experiment`,
`Sample`, `Instrument`, …). Use it to build crate metadata in Python and to
validate a `ro-crate-metadata.json`.

It is the **create** step of [FAIRSCAPE](/), next to
[fairscape_conversion](/tools/conversion/).

## Install

```bash
pip install fairscape-models
```

## Example

Describe a dataset:

```python
from fairscape_models import Dataset

ds = Dataset.model_validate({
    "@id": "ark:59852/dataset-counts",
    "name": "Cell counts",
    "author": "Jane Doe",
    "description": "Per-well cell counts from the imaging run.",
    "keywords": ["imaging", "counts"],
    "datePublished": "2026-09-25",
    "format": "csv",
    "contentUrl": "file:///data/counts.csv",
})
print(ds.model_dump_json(by_alias=True, exclude_none=True, indent=2))
```

Validate a whole crate:

```python
import json
from fairscape_models import ROCrateV1_2

crate = ROCrateV1_2.model_validate(json.load(open("ro-crate-metadata.json")))
```

## Details

- **Profile.** The current profile is the
  [FAIRSCAPE Release RO-Crate Profile v0.2](https://fairscape.github.io/profile/0.2/)
  (`https://w3id.org/fairscape/profile/0.2`). A crate declares it on its root
  entity with `dct:conformsTo`. Besides the entity requirements the models
  enforce, v0.2 adds [SHACL validation rules](https://fairscape.github.io/profile/0.2/validation/)
  for how entities link. For example, `generatedBy` must point at a Computation
  or Experiment. The EVI vocabulary is
  [`profiles/evi-vocabulary.ttl`](https://github.com/fairscape/fairscape_models/blob/main/profiles/evi-vocabulary.ttl).
- **Generated files.** [`json-schemas/`](https://github.com/fairscape/fairscape_models/blob/main/json-schemas),
  [`typescript-types/`](https://github.com/fairscape/fairscape_models/blob/main/typescript-types) and the EVI vocabulary are all
  generated from the Python classes:

  ```bash
  python scripts/generate_json_schemas.py
  python scripts/generate_ts_types.py
  python scripts/generate_profile.py profiles/evi-vocabulary.ttl
  ```

- **Crosswalks.** `fairscape_models/conversion/` maps to and from Datasheets
  for Datasets and Croissant / Croissant-RAI.

Source: [github.com/fairscape/fairscape_models](https://github.com/fairscape/fairscape_models)
