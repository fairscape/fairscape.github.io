# Installation

This section will cover how to setup and install a **FAIRSCAPE** cluster and go over some of the basic API calls.  

## Prerequisites

Tool | Installation
--------- | -------
Kubernetes Cluster or Minikube | [Cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster), [Minikube](https://minikube.sigs.k8s.io/docs/start/)
kubectl | [Instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
FAIRSCAPE deployment | [Download](https://github.com/fairscape/deployment)

## Step 1: Check Prerequisites

With everything installed it is time to check that kubectl is connected to your cluster (local or cloud). Run the following to confirm it is configured properly:

```shell
kubectl get nodes
```

## Step 2: Clone FAIRSCAPE deployment repo

With kubectl properly configured it is time to download the necessary kubernetes manifest files.

```shell
git clone https://github.com/fairscape/deployment
cd deployment
```

## Step 3: Create all pods and services

In the deployment folder run the single command below to launch all the required pods and services in your cluster.

```shell
kubectl create -f fairscape.yaml
```

## Step 4: Create required database and buckets

Once all the pods have started we must create the necessary databases to begin making service calls.

```shell
kubectl exec stardog -- bash -c "/opt/stardog/bin/stardog-admin db create -o search.enabled=true -n ors"
kubectl exec minio  -- ash -c "mkdir -p data/breakfast"
```

## Step 5: Test Services 

With all the pods up and running and the databases created we can run test script to confirm all the services are acting as expected.

```shell
kubectl exec testing-pod  -- bash -c "python3 deployment-tests.py"
```

## Try the FAIRSCAPE Demos

Once all the tests pass play around with the FAIRSCAPE demos (available [HERE](https://github.com/fairscape/demo)) to learn more about the basic commands.
