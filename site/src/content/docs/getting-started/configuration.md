---
title: Configuration
description: Reference for all environment variables used by FAIRSCAPE and their default values.
---

This document provides a reference for all environment variables used by FAIRSCAPE, along with their default values. Before running fairscape, ensure these variables are set in your `.env` file (or `deploy/docker_compose.env` for Docker Compose). You can specify the path to a custom `.env` file using the `--config` option.

:::note[About Docker Compose startup warnings]
When running `docker compose up`, you may see warnings like:

```
WARN: The "GEMINI_API_KEY" variable is not set. Defaulting to a blank string.
WARN: The "GITHUB_TOKEN" variable is not set. Defaulting to a blank string.
```

These are informational — they indicate optional features that are not currently configured. The server starts and operates normally without them. See the [Optional Features](#optional-features) section below for details on enabling these integrations.
:::

## Required Environment Variables

- **FAIRSCAPE_HOST**: The host address for FAIRSCAPE. Default is "0.0.0.0".

- **FAIRSCAPE_PORT**: The port on which FAIRSCAPE listens. Default is "8080".

- **FAIRSCAPE_MONGO_HOST**: The hostname or IP address of the MongoDB server. Default is "localhost".

- **FAIRSCAPE_MONGO_PORT**: The port on which the MongoDB server is running. Default is "27017".

- **FAIRSCAPE_MONGO_ACCESS_KEY**: The access key used for MongoDB authentication. Default is "mongotestaccess".

- **FAIRSCAPE_MONGO_SECRET_KEY**: The secret key used for MongoDB authentication. Default is "mongotestsecret".

- **FAIRSCAPE_MONGO_DATABASE**: The name of the MongoDB database used by FAIRSCAPE. Default is "**FAIRSCAPE".

- **FAIRSCAPE_MONGO_IDENTIFIER_COLLECTION**: The name of the MongoDB collection used for storing identifiers. Default is "mds".

- **FAIRSCAPE_MONGO_USER_COLLECTION**: The name of the MongoDB collection used for storing user information. Default is "users".

- **FAIRSCAPE_MONGO_ROCRATE_COLLECTION**: The name of the MongoDB collection used for storing RO-Crate metadata. Default is "rocrate".

- **FAIRSCAPE_MINIO_URI**: The URI of the MinIO server. Default is "localhost".

- **FAIRSCAPE_MINIO_PORT**: The port on which the MinIO server is running. Default is "9000".

- **FAIRSCAPE_MINIO_ACCESS_KEY**: The access key used for MinIO authentication. Default is "miniotestadmin".

- **FAIRSCAPE_MINIO_SECRET_KEY**: The secret key used for MinIO authentication. Default is "miniotestsecret".

- **FAIRSCAPE_MINIO_DEFAULT_BUCKET**: The default bucket name used in MinIO. Default is "default".

- **FAIRSCAPE_MINIO_ROCRATE_BUCKET**: The bucket name used for storing RO-Crate zip files in MinIO. Default is "rocrate".

- **FAIRSCAPE_MINIO_SECURE**: Specifies whether to use secure (HTTPS) connection for MinIO. Default is "False".

- **FAIRSCAPE_ARK_NAAN**: The Name Assigning Authority Number (NAAN) used for ARK identifiers. Default is "99999" which is for testing. Use `59853` for production.

## Optional Features

These variables are not required for FAIRSCAPE to start. When they are absent, the corresponding features are disabled gracefully. Docker Compose will warn about unset optional variables at startup — this is normal and expected.

### LLM Assistance (`GEMINI_API_KEY`)

- **`GEMINI_API_KEY`**: A Google Gemini API key. Enables AI-assisted metadata generation in two places:
    1. **FAIRSCAPE Server** — powers server-side LLM assist endpoints (e.g., AI-Ready scoring, automated metadata enrichment for uploaded RO-Crates).
    2. **FAIRSCAPE CLI** — enables the `fairscape-cli track` command and Jupyter magic to automatically generate descriptions for datasets, software, and computations using Gemini.

    Without this key the server runs normally but LLM-assisted features return errors or are skipped. The CLI prints an info message and continues without LLM descriptions.

    Obtain a key at [Google AI Studio](https://aistudio.google.com/apikey) and set it in your environment or `docker_compose.env`:
    ```bash
    export GEMINI_API_KEY="your-key-here"
    ```

### GitHub / D4D Integration (`GITHUB_TOKEN`, `GITHUB_REPO_NAME`)

- **`GITHUB_TOKEN`**: A GitHub personal access token (PAT). Enables the D4D (Data Datasheet for Datasets) interactive creation workflow. This integration connects FAIRSCAPE to GitHub Issues for collaborative, agent-assisted data sheet authoring via the `/api/github/*` endpoints.

    Without this token, all `/api/github/*` endpoints return `HTTP 503 Service Unavailable` with the message: *"GitHub integration is not configured. Please set GITHUB_TOKEN environment variable."*

    Create a PAT at [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens) with `repo` scope, then set it:
    ```bash
    export GITHUB_TOKEN="ghp_your-token-here"
    ```

- **`GITHUB_REPO_NAME`**: The GitHub repository used by the D4D agent for issue management. Default is `bridge2ai/data-sheets-schema`. Override this if you are running the D4D workflow against a different repository.

### Observability (`FAIRSCAPE_LOGFIRE_TOKEN`, `FAIRSCAPE_LOGFIRE_ENV`)

- **`FAIRSCAPE_LOGFIRE_TOKEN`**: A [Logfire](https://logfire.pydantic.dev/) token for structured observability and tracing. Optional — omit to disable Logfire integration.
- **`FAIRSCAPE_LOGFIRE_ENV`**: The Logfire environment label (e.g., `"production"`, `"staging"`). Only used when `FAIRSCAPE_LOGFIRE_TOKEN` is set.
