

## Create a user 

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"

    "user_data" = {
        "@id": "ark:99999/test-user",
        "name": "John Doe",
        "type": "Person",
        "email": "testuser@example.org",
        "password": "test",
        "organizations": [],
        "projects": [],
        "datasets": [],
        "software": [],
        "computations": [],
        "evidencegraphs": []
    }
    
    # create user
    create_user = requests.post(root_url + "user", data=json.dumps(user_data))
    create_user.json()
    ```

=== "curl"

    ``` shell
    curl -X 'POST' \
      'https://fairscape.pods.uvarc.io/user' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "@context": {
        "@vocab": "https://schema.org/",
        "evi": "https://w3id.org/EVI#"
      },
      "@type": "Person",
      "email": "string",
      "password": "string",
      "organizations": [],
      "projects": [],
      "datasets": [],
      "rocrates": [],
      "software": [],
      "computations": [],
      "evidencegraphs": [],
      "additionalProp1": {}
    }'
    ```

## Fetch a user 

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"
    
    # fetch user
    get_user = requests.get(root_url + f"user/{user_data['@id']}")
    get_user.json()
    ```

=== "curl"

    ``` shell
    curl -X 'GET' 'https://fairscape.pods.uvarc.io/user/ark:99999/test-user' \
         -H 'accept: application/json'
    ```

## Update a user 

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"

    updated_user_data = {
        "@id": "ark:99999/test-user",
        "name": "Updated User", # with a new name
        "type": "Person",
        "email": "testuser@example.org",
        "password": "test",
        "organizations": [],
        "projects": [],
        "datasets": [],
        "software": [],
        "computations": [],
        "evidencegraphs": []
	}
    
    # update user
    update_user = requests.put(root_url + "user", data=json.dumps(updated_user_data))
    update_user.json()
    ```

=== "curl"

    ``` shell
    curl -X 'PUT' \
      'https://fairscape.pods.uvarc.io/user' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "@context": {
        "@vocab": "https://schema.org/",
        "evi": "https://w3id.org/EVI#"
      },
      "@type": "Person",
      "email": "string",
      "password": "string",
      "organizations": [],
      "projects": [],
      "datasets": [],
      "rocrates": [],
      "software": [],
      "computations": [],
      "evidencegraphs": [],
      "additionalProp1": {}
    }'
    ```

## Delete a user 

=== "python"

    ``` python
    import json
    import requests
     
    root_url = "https://fairscape.pods.uvarc.io/"

    # delete user
    delete_user = requests.delete(root_url + f"user/{user_data['@id']}")
    delete_user.json()
    ```

=== "curl"

    ``` shell
    curl -X 'DELETE' 'https://fairscape.pods.uvarc.io/user/ark:99999/test-user' \
         -H 'accept: application/json'
    ```