# Install

This section will cover how to setup and install a **FAIRSCAPE** cluster and cover some of the basic API calls.  

## Prerequisites

Tool | Installation
--------- | -------
Kubernetes Cluster or Minikube | [Cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster) [Minikube](https://minikube.sigs.k8s.io/docs/start/)
kubectl | [Instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
FAIRSCAPE deployment | [Download](https://github.com/fairscape/deployment)

## Clone FAIRSCAPE deployment repo

```shell
git clone https://github.com/fairscape/deployment
cd deployment
```

Clone the deployment repository for all the required kubernetes manifest files. 


## Create all pods and services
> To create all the Kubernetes resources use the command below:

```shell
kubectl create -f fairscape.yaml
```

Create all necessary pods with simple kubectl create command

## Create required database and buckets

> With all the resources up time to create the default databases:

```shell
kubectl exec stardog -- bash -c "/opt/stardog/bin/stardog-admin db create -o search.enabled=true -n ors"
kubectl exec minio  -- ash -c "mkdir -p data/breakfast"
```

Create stardog database and buckets in minio required by MDS and Transfer services.

## Test Services Functioning as Expected

```shell
kubectl exec testing-pod  -- bash -c "python3 deployment-tests.py"
```

Command below execs into pod within cluster and runs deployment tests to make sure all services are properly up and running.

## Try the FAIRSCAPE Demos

Once all the tests pass play around with the FAIRSCAPE demos (available [HERE](https://github.com/fairscape/demo)) to learn more about the basic commands.
