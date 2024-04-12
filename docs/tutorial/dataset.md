
## Create a dataset metadata record

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"

    dataset_metadata = {
        "@id": "ark:99999/test-dataset",
        "@type": "evi:Dataset",
        "name": "test dataset",
        "description": "an example metadata set for a test dataset",
        "keywords": [ "test", "fair"],
        "owner": "ark:99999/a-person",
        "author": "John Doe"
    }
        
    # create dataset
    create_dataset = requests.post(root_url + "dataset", data=json.dumps(dataset_data))
    create_dataset.json()
    ```

=== "curl"

    ``` shell
    curl -X 'POST' \
      'https://fairscape.pods.uvarc.io/dataset' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "@context": {
        "@vocab": "https://schema.org/",
        "evi": "https://w3id.org/EVI#"
      },
        "@id": "ark:99999/test-dataset",
        "@type": "evi:Dataset",
        "name": "test dataset",
        "description": "an example metadata set for a test dataset",
        "keywords": [ "test", "fair"],
        "owner": "ark:99999/a-person",
        "author": "John Doe"
    }'
    ```

## Fetch a dataset metadata record

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"
    
    # fetch dataset
    get_dataset = requests.get(root_url + f"dataset/{dataset_metadata['@id']}")
    get_dataset.json()
    ```

=== "curl"

    ``` shell
    curl -X 'GET' 'https://fairscape.pods.uvarc.io/dataset/ark:99999/test-dataset' \
         -H 'accept: application/json'
    ```

## Update a dataset metadata record

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"

    updated_dataset_data = {
        "@id": "ark:99999/test-dataset",
        "@type": "evi:Dataset",
        "name": "Updated dataset",
        "description": "New description",
        "keywords": [ "test", "fair"],
        "owner": "ark:99999/a-person",
        "author": "John Doe"
    }

    # update dataset
    update_dataset = requests.put(root_url + "dataset", data=json.dumps(updated_dataset_metadata))
    update_dataset.json()
    ```

=== "curl"

    ``` shell
    curl -X 'PUT' \
      'https://fairscape.pods.uvarc.io/dataset' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "@context": {
        "@vocab": "https://schema.org/",
        "evi": "https://w3id.org/EVI#"
      },
        "@id": "ark:99999/test-dataset",
        "@type": "evi:Dataset",
        "name": "Updated dataset",
        "description": "New description",
        "keywords": [ "test", "fair"],
        "owner": "ark:99999/a-person",
        "author": "John Doe"
    }'
    ```
