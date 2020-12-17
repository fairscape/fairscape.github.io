# Installation

This section will cover how to setup and install a **FAIRSCAPE** cluster and go over some of the basic API calls.  

## Prerequisites

Tool | Installation
--------- | -------
kubectl | [Instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
Kubernetes Cluster or Minikube/Docker-Desktop | [Cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster), [Minikube](https://minikube.sigs.k8s.io/docs/start/)
GIT | [Install](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

> **_NOTE:_**  For local cluster 4 or more cpus are recommended.

## Step 1: Check Prerequisites

With everything installed it is time to check that kubectl is connected to your cluster (local or cloud). Run the following to confirm it is configured properly:

```shell
kubectl get nodes
```

Output from above should look something like below:
```shell
NAME             STATUS   ROLES    AGE   VERSION
docker-desktop   Ready    master   4d    v1.18.8
```
> Note: Name will change depending on how you have installed kubernetes. A "Ready" node is what is required.

## Step 2: Clone FAIRSCAPE deployment repo

With kubectl properly configured it is time to download the necessary kubernetes manifest files (instructions for kuberentes cluster to build correct resources). We will change directories to the newly cloned directory.   

```shell
git clone https://github.com/fairscape/deployment
cd deployment
```

## Step 3: Create all pods and services

In the deployment folder run the single command below to launch all the required pods and services in your cluster.

```shell
kubectl create -f fairscape.yaml
```

After running above, check with kubectl get pods to check status of created pods. Do not move onto step 4 until all pods have status running like below:

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

Once all the pods have started we must create the necessary databases to begin making service calls.

```shell
kubectl exec stardog -- bash -c "/opt/stardog/bin/stardog-admin db create -o search.enabled=true -n ors"
kubectl exec minio  -- ash -c "mkdir -p data/breakfast"
```

## Step 5: Test Services

With all the pods up and running and the databases created we can run test script to confirm all the services are acting as expected.

> Note: Older computers may be overwhelmed by the tests and give connection errors.

```shell
kubectl exec testing-pod  -- bash -c "python3 deployment-tests.py"
```

## Try the FAIRSCAPE Demos

You are all setup! To learn more about the basic API calls and capabilities of FAIRSCAPE run the locl spark demo. Instructions available [HERE](https://fairscape.github.io/demo/spark-demo.html).
