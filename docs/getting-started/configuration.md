# Configuration Documentation

This document provides a brief overview of the environment variables utilized in fairscape, along with their default values for deploying locally. Before running fairscape, ensure that these environment variables are correctly set in your .env file. You can specify the path to your .env file using the --config option.

## Important environmental variables

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

- **FAIRSCAPE_ARK_NAAN**: The Name Assigning Authority Number (NAAN) used for ARK identifiers. Default is "99999" which is for testing.
