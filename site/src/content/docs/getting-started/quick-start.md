---
title: Quick start
description: "Go from a datasheet to a validated, viewable and published RO-Crate."
---

This walks one crate through every step: create it, check it, view it,
grade it and publish it.

## Install

```bash
pip install fairscape-models fairscape-conversion
pip install git+https://github.com/fairscape/fairscape_artifacts
pip install git+https://github.com/fairscape/AIreadiness-grader
pip install git+https://github.com/fairscape/fairscape_publish
```

## 1. Create

Convert a Datasheet for Datasets into a crate with
[fairscape-conversion](/tools/conversion/). Other formats (Snakemake,
Cromwell, Galaxy, MLflow, REDCap, …) work the same way.

```bash
mkdir my-crate
python -m fairscape_conversion.core.cli convert d4d import datasheet.yaml my-crate/ro-crate-metadata.json
```

## 2. Validate

Check it against the data model in [fairscape-models](/tools/models/):

```python
import json
from fairscape_models import ROCrateV1_2

ROCrateV1_2.model_validate(json.load(open("my-crate/ro-crate-metadata.json")))
```

## 3. View

Build the datasheet, evidence graph and preview with
[fairscape-artifacts](/tools/artifacts/):

```bash
fairscape-artifacts all my-crate
# my-crate/ro-crate-datasheet.html, ro-crate-evidence-graph.html, ro-crate-preview.html
```

## 4. Assess

Grade it against the AI-Ready rubric with the
[AI-Readiness grader](/tools/grader/):

```bash
fairscape-evidence my-crate -o review
# review/ai-ready-review.html
```

## 5. Publish

Check that it's ready, then create a draft deposit with
[fairscape-publish](/tools/publish/):

```bash
fairscape-publish check my-crate
fairscape-publish zenodo my-crate --token $ZENODO_TOKEN --sandbox
```

To host crates on your own server instead, use
[fairscape-lite](/tools/lite/).
