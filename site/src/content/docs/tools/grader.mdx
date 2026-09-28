---
title: AI-Readiness grader
description: "Grade a dataset's metadata against the AI-Ready rubric, then improve it."
---

Grades a dataset's metadata against the *Rubric for Review of AI-readiness
Evaluation Criteria*: 28 criteria in seven domains (FAIRness, Provenance,
Characterization, Pre-model Explainability, Ethics, Sustainability,
Computability), each scored 0, 1 or 2. The input can be an RO-Crate, a
[Croissant](https://mlcommons.org/croissant/) file or plain schema.org JSON-LD.

It is part of the **view and assess** step, next to
[fairscape-artifacts](/tools/artifacts/), which uses it for the AI-Ready
section of the datasheet.

## Install

```bash
pip install git+https://github.com/fairscape/AIreadiness-grader
```

## Example

```bash
fairscape-evidence path/to/crate -o review
```

```
review/
  ai-ready-review.html      review page: evidence and an automated estimate per criterion
  ai-ready-evidence.json    the same evidence as data
```

The input can also be a single JSON-LD file, a URL, `kaggle:owner/slug` or
`hf:org/name`.

## Commands

| Command | What it does |
|---|---|
| `fairscape-evidence` | Collects the evidence for every criterion and writes the review page. Needs no model. |
| `fairscape-grade` | Has an LLM score every criterion (example below). |
| `fairscape-improve` | Writes an offline form listing the missing properties, easiest first, with a live score estimate. Download the improved `ro-crate-metadata.json` when you're done. |

```bash
fairscape-grade path/to/crate grading --model anthropic:claude-sonnet-5 --api-key $ANTHROPIC_API_KEY
```

## Details

- **Scoring.** The overall score is the mean of the seven domain scores.
  Some criteria are gates (for example, FAIRness `0.a` must score 2). A failed
  gate marks the result *Gating FAIL*, but the score is still reported.
- **Models.** `--model` takes any [pydantic-ai](https://ai.pydantic.dev/)
  model string (`anthropic:`, `openai:`, `google:`, `groq:`). Any
  OpenAI-compatible server works through `openai:` with `OPENAI_BASE_URL` set.
- **Offline.** Pass `--no-network` to skip URL and registry lookups.

Source: [github.com/fairscape/AIreadiness-grader](https://github.com/fairscape/AIreadiness-grader)
