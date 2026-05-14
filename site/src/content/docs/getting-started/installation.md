---
title: Installation Options
description: How to install FAIRSCAPE — Docker Compose services, default credentials, and optional integrations.
---

## Install using Docker Compose

The quickest way to run a local FAIRSCAPE instance is with Docker Compose. This starts all required services — the API server, web interface, database, object storage, and job queue — in a single command.

```bash
# Pull the latest server code and compose yaml from git
git clone http://github.com/fairscape/mds_python
cd mds_python
# Start the FAIRSCAPE services
docker compose up --build
```

### Services Started by Docker Compose

The compose file (`compose.yaml`) starts the following services:

| Service | Description | Local Port |
|---------|-------------|------------|
| `fairscape-api` | FAIRSCAPE REST API server | `8080` |
| `fairscape-frontend` | Web UI (React) | `5173` |
| `mongo` | MongoDB metadata store | `27017` (internal) |
| `mongo-express` | MongoDB admin web UI | `8081` |
| `minio` | S3-compatible object storage | `9000` (API), `9001` (console) |
| `redis` | Job queue for async uploads | `6379` (internal) |
| `fairscape-worker` | Background job processor | — (no external port) |

Once running, the key interfaces are:

- **FAIRSCAPE API**: `http://localhost:8080/api` — REST API; health check at `/api/healthz`
- **FAIRSCAPE API Docs**: `http://localhost:8080/api/docs` — Interactive Swagger UI
- **Web Interface**: `http://localhost:5173` — Browser-based GUI
- **MinIO Console**: `http://localhost:9001` — Object storage admin UI
- **Mongo Express**: `http://localhost:8081` — Database admin UI (login: `meadmin` / `meadmin`)

### Default Test Credentials

The compose setup uses these default test credentials (defined in `deploy/docker_compose.env` and `compose.yaml`):

| Service | Username | Password |
|---------|----------|----------|
| Web UI / API | `test@fairscape.org` | `password` |
| MongoDB | `mongotestaccess` | `mongotestsecret` |
| MinIO | `miniotestadmin` | `miniotestsecret` |

:::caution[Test credentials only]
Do not use these defaults in any internet-accessible deployment. Update all credentials in `deploy/docker_compose.env` before deploying to a shared or production environment.
:::

### Optional API Keys (Docker Compose Warnings)

When starting, Docker Compose may print warnings such as:

```
WARN: The "GEMINI_API_KEY" variable is not set. Defaulting to a blank string.
WARN: The "GITHUB_TOKEN" variable is not set. Defaulting to a blank string.
```

These warnings are **informational** — the server starts and functions normally without them. They indicate optional integrations that are not configured:

- **`GEMINI_API_KEY`** — Required for LLM-assisted metadata features (server-side AI enrichment and the `fairscape-cli track` command).
- **`GITHUB_TOKEN`** — Required for the D4D (Data Datasheet for Datasets) GitHub integration (`/api/github/*` endpoints). Without it those endpoints return HTTP 503.

To enable these features, add the keys to `deploy/docker_compose.env` and restart. See the [Configuration page](/getting-started/configuration/#optional-features) for full details.
