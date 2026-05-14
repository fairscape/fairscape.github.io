---
title: Getting Started with FAIRSCAPE
description: Set up a local FAIRSCAPE environment and create your first Research Object Crate (RO-Crate).
---

This guide will walk you through setting up a local FAIRSCAPE environment and creating your first Research Object Crate (RO-Crate). By the end, you'll have:

- A running local FAIRSCAPE instance
- Created and validated an RO-Crate with connected datasets and software
- Uploaded and viewed your RO-Crate through the web interface

## 1. Setting Up Your Local FAIRSCAPE Environment

First, let's get FAIRSCAPE running locally using Docker Compose. This will set up all necessary services including the metadata server, storage, and web interface.

```bash
# Pull the latest server code and compose yaml from git
git clone http://github.com/fairscape/fairscape_server
cd fairscape_server
# Start the FAIRSCAPE services
docker compose up --build
```

When the services are running, you'll have access to:

- FAIRSCAPE Server at `http://localhost:8080/api/healthz`
- FAIRSCAPE Web Interface at `http://localhost:5173`

See the [Installation guide](/getting-started/installation/) for a full breakdown of services, ports, default credentials, and optional environment variables.

## 2. Installing the FAIRSCAPE CLI

The FAIRSCAPE Command Line Interface (CLI) allows you to create and manage RO-Crates. Install it using pip:

```bash
pip install fairscape-cli
```

## 3. Creating Your First RO-Crate

Let's create an RO-Crate for a simple processing pipeline with an input dataset, some software, and an output dataset.

### Step 1: Create the RO-Crate

```bash
fairscape-cli rocrate create \
  --name "My First RO-Crate" \
  --description "A test RO-Crate containing example data" \
  --organization-name "MyOrg" \
  --project-name "Test Project" \
  --keywords "test" \
  "./my-first-rocrate"
```

### Step 2: Add the Input Dataset

```bash
# Add input dataset and store the returned GUID
INPUT_GUID=$(fairscape-cli rocrate add dataset \
  --name "Input Data" \
  --author "Your Name" \
  --version "1.0" \
  --date-published "2024-12-18" \
  --description "Input data for testing" \
  --keywords "test" \
  --data-format "CSV" \
  --source-filepath "./path/to/your/input.csv" \
  --destination-filepath "./my-first-rocrate/input.csv" \
  "./my-first-rocrate")
```

### Step 3: Add Processing Software

```bash
# Add processing software and store the GUID
SOFTWARE_GUID=$(fairscape-cli rocrate add software \
  --name "Processing Software" \
  --author "Your Name" \
  --version "1.0" \
  --description "Software for processing the data" \
  --keywords "test" \
  --file-format "py" \
  --source-filepath "./path/to/your/process.py" \
  --destination-filepath "./my-first-rocrate/process.py" \
  --date-modified "2024-12-18" \
  "./my-first-rocrate")
```

### Step 4: Add the Output Dataset

```bash
# Add output dataset with reference to input
OUTPUT_GUID=$(fairscape-cli rocrate add dataset \
  --name "Output Data" \
  --author "Your Name" \
  --version "1.0" \
  --date-published "2024-12-18" \
  --description "Output data from processing" \
  --keywords "test" \
  --data-format "CSV" \
  --source-filepath "./path/to/your/output.csv" \
  --destination-filepath "./my-first-rocrate/output.csv" \
  --derived-from "$INPUT_GUID" \
  "./my-first-rocrate")
```

### Step 5: Register the Computation

```bash
# Register computation to connect everything together
fairscape-cli rocrate register computation \
  --name "Data Processing" \
  --run-by "Your Name" \
  --command "python process.py input.csv output.csv" \
  --date-created "2024-12-18" \
  --description "Process input data to create output data" \
  --keywords "test" \
  --used-software "$SOFTWARE_GUID" \
  --used-dataset "$INPUT_GUID" \
  --generated "$OUTPUT_GUID" \
  "./my-first-rocrate"
```

### Step 6: Complete the Build

```bash
# Builds html preview, croissant, and fills in inverse properties
fairscape-cli build subcrate "./my-first-rocrate"
```

## 4. Uploading Your RO-Crate

Now that we have created an RO-Crate, let's prepare it for upload and submit it to our local FAIRSCAPE instance:

### Step 1: Zip the RO-Crate

First, compress your RO-Crate folder into a zip file. You can do this using your command line:

```bash
# On Linux/Mac:
zip -r my-first-rocrate.zip my-first-rocrate/
# On Windows (PowerShell):
Compress-Archive -Path my-first-rocrate -DestinationPath my-first-rocrate.zip
```

### Step 2: Upload to FAIRSCAPE

1. Open your web browser and navigate to `http://localhost:5173`
2. Log in using the default credentials:
   - Username: `test@fairscape.org`
   - Password: `password`
3. Click on the "Upload" button in the navigation bar
4. Select your zipped RO-Crate file (`my-first-rocrate.zip`)
5. Click "Upload" to submit your RO-Crate

## 5. Viewing Your RO-Crate

After uploading, you can view your RO-Crate's metadata and contents:

1. Navigate to the "Dashboard" section in the web interface
2. Find and click on "My First RO-Crate" in the list
3. Explore the metadata, including:
   - Basic RO-Crate information
   - Dataset metadata and relationships
   - Software details
   - Computation provenance
