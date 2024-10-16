## Upload a rocrate

=== "python"

    ``` python
    import json
    import requests
    from requests_toolbelt.multipart.encoder import MultipartEncoder

    root_url = "https://fairscape.net/api/"
    crate_path = '/Path/to/zip/file.zip'
    token = "your_bearer_token_here"

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
        headers={'Authorization': f'Bearer {token}'}
    )

    rocrate_transfer.json()
    ```

=== "curl"

    ``` shell
    curl -X POST -F "file=@/Path/to/zip/file.zip" https://fairscape.net/api/rocrate/upload \ -H "Authorization: Bearer your_bearer_token_here"

    ```

## List all rocrates

=== "python"

    ``` python
    import json
    import requests

    root_url = "https://fairscape.net/api/"

    # fetch rocrate
    get_rocrate = requests.get(root_url + "rocrate", headers={'Authorization': f'Bearer {token}'})
    get_rocrate.json()
    ```

=== "curl"

    ``` shell
    curl -X 'GET' 'https://fairscape.net/api/rocrate' \
         -H 'accept: application/json'
    ```

## Fetch a rocrate metadata record

=== "python"

    ``` python
    import json
    import requests

    root_url = "https://fairscape.net/api/"

    # fetch rocrate
    get_rocrate = requests.get(root_url + f"rocrate/{rocrate_transfer['@id']}", headers={'Authorization': f'Bearer {token}'})
    get_rocrate.json()
    ```

=== "curl"

    ``` shell
    curl -X 'GET' 'https://fairscape.net/api/rocrate/ark:99999/test-rocrate' \
         -H 'accept: application/json'
    ```

## Download an archived rocrate

=== "python"

    ``` python
    import json
    import requests

    root_url = "https://fairscape.net/api/"

    response = requests.get(
        url=request_url + 'rocrate/archived/download/' + rocrate_transfer['@id'],
        headers={'Authorization': f'Bearer {token}'}
    )

    with open('/Path/to/output.zip', 'wb') as file:
            file.write(response.content)
    ```

=== "curl"

    ``` shell
    curl -o /Path/to/output.zip https://fairscape.net/api/rocrate/archived/download/your_rocrate_id_here

    ```
