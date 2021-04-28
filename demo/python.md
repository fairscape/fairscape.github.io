# Simple Python Demo

# Introduction

In this demo we will upload some sample data to FAIRSCAPE, upload a script that takes the sum of the uploaded data, and run the script on the data. This demo will cover registering a container with FAIRSCAPE that can then be used to perform the computation. 

**Service Defintions**

    Metadata Service (MDS): Handles minting identifiers...
    Transfer Service: Used to upload data with associated metadata to framework
    Compute Service: Runs compuations on uploaded data.
    Evidence Graph Service: Queries Stardog to build Evidence Graph tracking object proveance

**Outline**

    1.) Upload data and script to the framework
    2.) Retreive metadata of an uploaded object using MDS
    3.) Create identifier for container to run script
    4.) Run script on data using choosen container
    4.) Create a graphic from the job output
    5.) Visualize evidence graph of the image

**Microservices Model**


![png](fairscape.png)




# Step 1: Port Forward

To run the demo locally you need to access the notebook within the testing pod. To do this simply forward the testing-pod port using below (add & if you'd prefer to run the command in background):

```shell
kubectl port-forward testing-pod 8888:8888
```
And if you want to view the visual locally in another terminal forward the visualization service as well with:

```shell
kubectl port-forward visual 5000:5000
```

# Step 2: Visit localhost:8888
The demo is now being hosted locally at [HERE](http://localhost:8888)
**Open the Custom-Container-Demo.ipynb and get started!**
