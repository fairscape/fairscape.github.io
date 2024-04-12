# Installation Options

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
pip install -r requirements.txt
cd src/
uvicorn fairscape_mds.mds.app:app --host 0.0.0.0 --config PATH_TO_YOUR.env
```

set up mongo

- run with docker
- local run refer to mongo docs<br><br>

set up minio

- run with docker
- local refer to mongo docs
