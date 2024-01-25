## Install using pip

```bash 
pip install fairscape_mds
fairscape-mds start
```

## Install locally

```bash 
pip install fairscape_mds
fairscape-mds start
```
- set up mongo 
    - run with docker
    - local run refer to mongo docs
- set up minio 
    - run with docker
    - local refer to mongo docs

## Install using docker compose

```bash
wget https://raw.githubusercontent.com/fairscape/mds_python/main/compose-dev.yaml 
docker-compose up compose-dev.yaml
```

## Install using kubernetes

```bash
wget https://raw.githubusercontent.com/fairscape/mds_python/main/k8s-manifest-local.yml
kubectl create -f k8s-manifest-local.yml
``` 

## Install from repository
   
```bash
git clone https://github.com/fairscape/mds_python.git
python -m build .
```