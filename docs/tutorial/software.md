
## Create a software metadata record

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"

    software_metadata = {
        "@id": "ark:99999/test-software",
        "@type": "evi:software",
        "name": "test software",
        "description": "example metadata for a test software",
        "keywords": [ "test", "fair"],
        "owner": "ark:99999/a-person",
        "author": "John Doe"
    }
        
    # create software
    create_software = requests.post(root_url + "software", data=json.dumps(software_metadata))
    create_software.json()
    ```

=== "curl"

    ``` shell
    curl -X 'POST' \
      'https://fairscape.pods.uvarc.io/software' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "@context": {
        "@vocab": "https://schema.org/",
        "evi": "https://w3id.org/EVI#"
      },
        "@id": "ark:99999/test-software",
        "@type": "evi:software",
        "name": "test software",
        "description": "example metadata for a test software",
        "keywords": [ "test", "fair"],
        "owner": "ark:99999/a-person",
        "author": "John Doe"
    }'
    ```

## Fetch a software metadata record

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"
    
    # fetch software
    get_software = requests.get(root_url + f"software/{software_metadata['@id']}")
    get_software.json()
    ```

=== "curl"

    ``` shell
    curl -X 'GET' 'https://fairscape.pods.uvarc.io/software/ark:99999/test-software' \
         -H 'accept: application/json'
    ```

## Update a software metadata record

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"

    updated_software_data = {
        "@id": "ark:99999/test-software",
        "@type": "evi:software",
        "name": "Updated software",
        "description": "New description",
        "keywords": [ "test", "fair"],
        "owner": "ark:99999/a-person",
        "author": "John Doe"
    }

    # update software
    update_software = requests.put(root_url + "software", data=json.dumps(updated_software_data))
    update_software.json()
    ```

=== "curl"

    ``` shell
    curl -X 'PUT' \
      'https://fairscape.pods.uvarc.io/software' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "@context": {
        "@vocab": "https://schema.org/",
        "evi": "https://w3id.org/EVI#"
      },
        "@id": "ark:99999/test-software",
        "@type": "evi:software",
        "name": "Updated software",
        "description": "New description",
        "keywords": [ "test", "fair"],
        "owner": "ark:99999/a-person",
        "author": "John Doe"
    }'
    ```
