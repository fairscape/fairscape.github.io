
## Upload a rocrate

=== "python"

    ``` python
    import json
    import requests
    from requests_toolbelt.multipart.encoder import MultipartEncoder
     
    root_url = "https://fairscape.pods.uvarc.io/"
    crate_path = '/Path/to/zip/file.zip'

    mp_encoder = MultipartEncoder(
        fields={        
            'file': ('file.zip', open(crate_path, 'rb'), 'application/zip')
        }
    )

    # upload a rocrate to minio object store
    rocrate_transfer = requests.post(
        url=request_url + 'rocrate/upload',
        data=mp_encoder,                              
        # The MultipartEncoder provides the content-type header with the boundary:
        headers={'Content-Type': mp_encoder.content_type}
    )
        
    rocrate_transfer.json()
    ```

=== "curl"

    ``` shell
    curl -X POST -F "file=@/Path/to/zip/file.zip" https://fairscape.pods.uvarc.io/rocrate/upload

    ```

## List all rocrates

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"
    
    # fetch rocrate
    get_rocrate = requests.get(root_url + "rocrate")
    get_rocrate.json()
    ```

=== "curl"

    ``` shell
    curl -X 'GET' 'https://fairscape.pods.uvarc.io/rocrate' \
         -H 'accept: application/json'
    ```

## Fetch a rocrate metadata record

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"
    
    # fetch rocrate
    get_rocrate = requests.get(root_url + f"rocrate/{rocrate_transfer['@id']}")
    get_rocrate.json()
    ```

=== "curl"

    ``` shell
    curl -X 'GET' 'https://fairscape.pods.uvarc.io/rocrate/ark:99999/test-rocrate' \
         -H 'accept: application/json'
    ```

## Download an archived rocrate

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"
    
    response = requests.get(
        url=request_url + 'rocrate/archived/download/' + rocrate_transfer['@id']
    )

    with open('/Path/to/output.zip', 'wb') as file:
            file.write(response.content)
    ```

=== "curl"

    ``` shell
    curl -o /Path/to/output.zip https://fairscape.pods.uvarc.io/rocrate/archived/download/your_rocrate_id_here

    ```
