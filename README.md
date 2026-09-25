# FAIRSCAPE

FAIRSCAPE packages research data, software and computations as
[RO-Crates](https://www.researchobject.org/ro-crate/) with full provenance:
what was used, what produced it, and who ran it. The tools are small Python
packages. Each one does one step:

```
  CREATE                        VIEW / ASSESS                        PUBLISH
  ──────                        ─────────────                        ───────
  fairscape_models      ─┐                ┌─ fairscape_artifacts ─┐    ┌──▶ fairscape_publish   (Dataverse, Zenodo, Figshare, DataCite)
                         ├──▶ RO-Crate ───┤                       ├────┤
  fairscape_conversion  ─┘                └─ AIreadiness-grader ──┘    └──▶ fairscape_lite      (your own server)
```

| Step | Package | What it does |
|---|---|---|
| **Create** | [fairscape_models](https://github.com/fairscape/fairscape_models) | The data model. Pydantic classes for every entity in a crate (Dataset, Software, Computation, MLModel, …). You use it to build and validate `ro-crate-metadata.json`. |
| **Create** | [fairscape_conversion](https://github.com/fairscape/fairscape_conversion) | Turns metadata you already have into a crate: Datasheets for Datasets, Snakemake, Cromwell/WDL, Galaxy, MLflow, REDCap, Frictionless, C2M2, Workflow Run RO-Crate. Exports to Croissant, D4D and others. |
| **View** | [fairscape_artifacts](https://github.com/fairscape/fairscape_artifacts) | Takes a finished crate and builds the pages people read: an HTML datasheet, an interactive evidence graph, a preview of every entity and an AI-Ready review. |
| **Assess** | [AIreadiness-grader](https://github.com/fairscape/AIreadiness-grader) | Grades a crate (or a Croissant or schema.org JSON-LD file) against the AI-Ready rubric: 28 criteria in seven areas. It writes a review page and suggests fixes. `fairscape_artifacts` uses it for the review section of the datasheet. |
| **Publish** | [fairscape_publish](https://github.com/fairscape/fairscape_publish) | Pushes the crate and its files to Dataverse, Zenodo or Figshare, or mints a DataCite DOI. |
| **Publish** | [fairscape_lite](https://github.com/fairscape/fairscape_lite) | A small server you run yourself. It indexes a folder of crates and gives you search, ARK resolution and evidence graphs in a web UI. |

## Quick start

```bash
pip install fairscape-models fairscape-conversion
pip install git+https://github.com/fairscape/fairscape_artifacts
pip install git+https://github.com/fairscape/fairscape_publish
pip install git+https://github.com/fairscape/AIreadiness-grader
```

**1. Create:** convert a Datasheet for Datasets into a crate:

```bash
mkdir my-crate
python -m fairscape_conversion.core.cli convert d4d import datasheet.yaml my-crate/ro-crate-metadata.json
```

**2. Check:** validate it against the model:

```python
import json
from fairscape_models import ROCrateV1_2

ROCrateV1_2.model_validate(json.load(open("my-crate/ro-crate-metadata.json")))
```

**3. View:** build the datasheet and evidence graph:

```bash
fairscape-artifacts all my-crate
# my-crate/ro-crate-datasheet.html, ro-crate-evidence-graph.html, ro-crate-preview.html
```

**4. Assess:** grade it against the AI-Ready rubric:

```bash
fairscape-evidence my-crate -o review
# review/ai-ready-review.html, review/ai-ready-evidence.json
```

**5. Publish:** check the crate is ready, then deposit a draft:

```bash
fairscape-publish check my-crate
fairscape-publish zenodo my-crate --token $ZENODO_TOKEN --sandbox
```

Or host it yourself with [fairscape_lite](https://github.com/fairscape/fairscape_lite).

## The profile

Crates built with these tools conform to the **FAIRSCAPE Release RO-Crate
Profile v0.1** (`https://w3id.org/fairscape/profile/0.1`). Its JSON Schemas,
TypeScript types and EVI vocabulary are generated from `fairscape_models`.
