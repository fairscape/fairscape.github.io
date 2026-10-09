---
title: fairscape-server
description: "A shared FAIRSCAPE repository with accounts, object storage and ARKs."
---

A shared FAIRSCAPE repository for a lab or consortium, run as a data commons.
People sign in and upload RO-Crates. The server mints an ARK for every
dataset, software and computation in a crate, keeps the files in object
storage and serves search, evidence graphs and AI-Ready scores across
everything it holds. [fairscape.net](https://fairscape.net) runs it.

It is the hosted **publish** step of [FAIRSCAPE](/). For one person and a
folder of crates, [fairscape-lite](/tools/lite/) is enough. To deposit in a
public repository, use [fairscape-publish](/tools/publish/).

## Install

The server is a FastAPI app with a Celery worker, MongoDB, MinIO and Redis
behind it. Docker Compose starts all of them:

```bash
git clone https://github.com/fairscape/fairscape_server && cd fairscape_server
docker compose up --build -d
```

The API is at http://localhost:8080/api. The `setup` service creates the
buckets, plus the users and groups listed in `deploy/setup/data/`, among them
`max_headroom@example.org` / `testpassword`. Replace those test users, and the
passwords in `deploy/`, before you open the port.

## Example

Sign in and keep the token:

```bash
TOKEN=$(curl -s -X POST localhost:8080/api/login \
  -d username=max_headroom@example.org -d password=testpassword | jq -r .access_token)
```

Upload a zipped crate. The worker unpacks it and mints ARKs in the background:

```bash
curl -X POST localhost:8080/api/rocrate/upload-async \
     -H "Authorization: Bearer $TOKEN" -F crate=@my-crate.zip
```

The response has a `guid`. Poll
`/api/rocrate/upload/status/{guid}` until it finishes, then resolve the crate's
ARK at `/api/ark:{naan}/{postfix}`.

## Endpoints

| Endpoint | Does |
|---|---|
| `POST /login` | Returns a bearer token |
| `POST /rocrate/upload-async` | Uploads a crate zip with its files |
| `POST /rocrate/metadata` | Registers a crate's metadata without files |
| `GET /rocrate` | Lists crates |
| `GET /ark:{naan}/{postfix}` | Resolves an ARK |
| `GET /rocrate/download/ark:{naan}/{postfix}` | Downloads a crate as a zip |
| `GET /evidencegraph/ark:{naan}/{postfix}` | Returns the provenance graph |
| `GET /rocrate/ai-ready-score/ark:{naan}/{postfix}` | Scores a crate against the AI-Ready rubric |
| `GET /search/basic?query=` | Full-text search |
| `POST /publish/create/ark:{naan}/{postfix}` | Creates a matching dataset on Dataverse, Zenodo or Figshare |

All paths are under `/api`. The full list is at `/api/docs` while the server
is running.

## Settings

Each service reads its settings from `deploy/docker_compose.env`.

| Env var | Does |
|---|---|
| `FAIRSCAPE_ARK_NAAN` | The NAAN in every ARK the server mints |
| `FAIRSCAPE_URL` | The public base URL, used in links the server writes |
| `FAIRSCAPE_JWT_SECRET` | Signs login tokens |
| `FAIRSCAPE_MONGO_*` | Where metadata, users and tokens are stored |
| `FAIRSCAPE_MINIO_*` | The object store for crate files |
| `FAIRSCAPE_REDIS_*` | The queue between the API and the worker |

Source: [github.com/fairscape/fairscape_server](https://github.com/fairscape/fairscape_server)
