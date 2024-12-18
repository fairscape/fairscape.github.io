# Getting Started with FAIRSCAPE

This guide will walk you through setting up a local FAIRSCAPE environment and creating your first Research Object Crate (RO-Crate). By the end, you'll have:

- A running local FAIRSCAPE instance
- Created and validated an RO-Crate with a dataset
- Uploaded and viewed your RO-Crate through the web interface

## 1. Setting Up Your Local FAIRSCAPE Environment

First, let's get FAIRSCAPE running locally using Docker Compose. This will set up all necessary services including the metadata server, storage, and web interface.

```bash
# Download the docker-compose configuration
wget https://raw.githubusercontent.com/fairscape/mds_python/main/compose-dev.yaml

# Start the FAIRSCAPE services
docker-compose up -f compose-dev.yaml
```

When the services are running, you'll have access to:

- FAIRSCAPE Metadata Service (MDS) at `http://localhost:8000`
- FAIRSCAPE Web Interface at `http://localhost:5173`

## 2. Installing the FAIRSCAPE CLI

The FAIRSCAPE Command Line Interface (CLI) allows you to create and manage RO-Crates. Install it using pip:

```bash
pip install fairscape-cli
```

## 3. Creating Your First RO-Crate

Let's create a simple RO-Crate containing a dataset.

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

### Step 2: Add a dataset to the RO-Crate

```bash
fairscape-cli rocrate add dataset \
  --name "Example Dataset" \
  --author "Your Name" \
  --version "1.0" \
  --date-published "2024-12-18" \
  --description "An example dataset for testing" \
  --keywords "test" \
  --data-format "CSV" \
  --source-filepath "./path/to/your/data.csv" \
  --destination-filepath "./my-first-rocrate/data.csv" \
  "./my-first-rocrate"
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
   - Dataset metadata

## Next Steps

Now that you've created and uploaded your first RO-Crate, you can:

- Add more datasets and software to your RO-Crate
- Register computations to track data transformations
- Explore the schema creation and validation

For more detailed information, check out:

- [FAIRSCAPE CLI Documentation](https://fairscape.github.io/fairscape-cli/)
- [MDS FAIRSCAPE Documentation](https://fairscape.net/api/docs)
