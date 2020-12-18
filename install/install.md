# Installation

This page describes the step-by-step instructions for installing the FAIRSCAPE framework on a kubernetes cluster either on a cloud environment such as <a href="https://cloud.google.com/kubernetes-engine">Google Kubernetes Engine</a> or a local kubernetes instance such as <a href="https://minikube.sigs.k8s.io/docs/start/">Minikube</a> or <a href="https://www.docker.com/products/docker-desktop">docker-desktop</a>.


## Prerequisites

Tool | Installation
--------- | -------
kubectl | [Instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
Kubernetes Cluster | Cloud: <a href="https://cloud.google.com/kubernetes-engine">Google Kubernetes Engine</a> <br> Local instance: <a href="https://minikube.sigs.k8s.io/docs/start/">Minikube</a> / <a href="https://www.docker.com/products/docker-desktop">docker-desktop</a>
Git | [Install](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

> **_NOTE:_**  For local cluster 4 or more cpus are recommended. If using minikube use --cpus=4 or more. To adjust in docker desktop goto docker preferences then edit the number of cpus.

## Step 1: Check Prerequisites

Once all the tools are installed and configured properly start the cluster and make sure **kubectl** is connected to the cluster.
Run the following command to check the status of the cluster:

```shell
kubectl get nodes
```

For docker-desktop, the following output should be displayed:
```shell
NAME             STATUS   ROLES    AGE   VERSION
docker-desktop   Ready    master   4d    v1.18.8
```
>Note: A "Ready" STATUS is what is expected from the node which has the master ROLE. The NAME, AGE, and VERSION of the node may vary.

## Step 2: Clone FAIRSCAPE deployment repo

Clone the FAIRSCAPE deployment directory containing the Kubernetes manifests (fairscape.yaml file for creating Kubernetes resources such as pods).


```shell
git clone https://github.com/fairscape/deployment
cd deployment
```

## Step 3: Create all pods and services

Run the command below to launch all the required pods and services in your cluster.

```shell
kubectl create -f fairscape.yaml
```

Run the following command every few seconds to check the status of all the pods. We want STATUS of all the pods as Running as shown in the output below. Until then, some of the pods will show ContainerCreating STATUS. Once all are Running, move on the next step.

> Note: Pods may remain in ContainerCreating for several minutes.

```shell
kubectl get pods
NAME                        READY   STATUS    RESTARTS   AGE
auth-84546d445c-2tvxm       1/1     Running   1          4d
compute                     2/2     Running   2          4d
eg-7f7548c889-hwtcc         1/1     Running   1          4d
mds-6f55c986f8-vtzgb        1/1     Running   1          4d
minio                       1/1     Running   1          4d
mongo                       1/1     Running   1          4d
object-service              1/1     Running   1          4d
search                      1/1     Running   1          4d
stardog                     1/1     Running   1          4d
testing-pod                 1/1     Running   1          4d
transfer-85c7577987-2mbzb   1/1     Running   1          4d
visual                      1/1     Running   1          4d
```


## Step 4: Create required database and buckets

The commands below will create a database 'ors' in Stardog  and the default bucket 'breakfast' in MinIO.

```shell
kubectl exec stardog -- bash -c "/opt/stardog/bin/stardog-admin db create -o search.enabled=true -n ors"
kubectl exec minio  -- ash -c "mkdir -p data/breakfast"
```

## Step 5: Test Services

The python script python3 deployment-tests.py runs a total of 43 tests. These tests ensure that the service orchestration works flawlessly with dummy data.

> Note: Older computers may be overwhelmed by the tests and services may give connection errors. Please run tests again if this occurs.

```shell
kubectl exec testing-pod  -- bash -c "python3 deployment-tests.py"
```
If all the tests pass
**FAIRSCAPE Installed Correctly!**

## Try the FAIRSCAPE Demos

To learn more about the basic API calls and capabilities of FAIRSCAPE run the local spark demo. Instructions for running the demo are available [HERE](https://fairscape.github.io/demo/spark-demo.html).
