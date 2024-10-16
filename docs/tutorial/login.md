## Login

=== "python"

    ``` python
    import json
    import requests

    root_url = "https://fairscape.net/api/"

    login_data = {
        "username": "testuser@example.org",
        "password": "test"
    }

    # Login request
    login_response = requests.post(root_url + "login", data=json.dumps(login_data))

    # Check if the request was successful
    if login_response.status_code == 200:
        # Parse the JSON response
        token_data = login_response.json()

        # Extract the token
        token = token_data.get('token')

        print(f"Login successful. Token: {token}")
    else:
        print(f"Login failed. Status code: {login_response.status_code}")
        print(f"Error message: {login_response.text}")
    ```

=== "curl"

    ```shell
    curl -X 'POST' \
    'https://fairscape.net/api/login' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
        "username": "testuser@example.org",
        "password": "test"
    }'
    ```
