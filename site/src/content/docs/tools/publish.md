---
title: fairscape-publish
description: "Push an RO-Crate and its files to Dataverse, Zenodo, Figshare or DataCite."
---

Pushes a finished RO-Crate and all its local files to Dataverse, Zenodo or
Figshare, or mints a DOI for it on DataCite.

It is the **publish** step of [FAIRSCAPE](/). To
host crates on your own server instead, use
[fairscape_lite](/tools/lite/).

## Install

```bash
pip install git+https://github.com/fairscape/fairscape_publish
```

## Example

```bash
# Is the crate ready? Nothing is sent over the network.
fairscape-publish check ./my-crate

# Rehearse: print every request, send nothing
fairscape-publish zenodo ./my-crate --token $ZENODO_TOKEN --sandbox --dry-run

# Create the draft
fairscape-publish zenodo ./my-crate --token $ZENODO_TOKEN --sandbox

# After you've reviewed the draft, publish it and write the DOI back into the crate
fairscape-publish zenodo ./my-crate --token $ZENODO_TOKEN --sandbox --resume --publish --write-back
```

## Commands

| Command | What it does |
|---|---|
| `check CRATE` | Checks whether the crate is ready for each target, without using the network. |
| `dataverse CRATE` | Creates a Dataverse dataset and uploads the files, keeping the folder structure. |
| `zenodo CRATE` | Creates a Zenodo deposit and uploads the files. |
| `figshare CRATE` | Creates a Figshare article and uploads the files. |
| `datacite CRATE` | Mints a DOI from the crate metadata. Uploads no files. |
| `status CRATE` | Shows what has already been deposited from this crate. |

Tokens can come from the environment: `DATAVERSE_API_TOKEN`, `ZENODO_TOKEN`,
`FIGSHARE_TOKEN`, `DATACITE_USERNAME` / `DATACITE_PASSWORD`.

## Details

- **Safe by default.** Deposits stay drafts until you pass `--publish`.
  `--dry-run` sends nothing, and you're asked to confirm before the first
  upload.
- **Remote files are skipped.** `contentUrl`s that point to `https://`,
  `ftp://` or `s3://` are listed but never downloaded.
- **Resumable.** Each run writes `.fairscape-publish.json` beside the crate.
  `--resume` picks up the same draft and skips files that are already
  uploaded.
- **File layout.** `--layout zip|preserve|flat` sets how the crate's folders
  appear in the repository. The default is `zip` for Zenodo and Figshare and
  `preserve` for Dataverse.

Per-target requirements, sandboxes and the metadata mapping:
[`docs/DETAILS.md`](https://github.com/fairscape/fairscape_publish/blob/main/docs/DETAILS.md) and [`PUBLISH_MAPPING.md`](https://github.com/fairscape/fairscape_publish/blob/main/PUBLISH_MAPPING.md).

Source: [github.com/fairscape/fairscape_publish](https://github.com/fairscape/fairscape_publish)
