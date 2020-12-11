# Nipype Full Framework Demo

### Also Available

[Code Here](https://github.com/fairscape/Nipype-Demo)

[Deepnote Published Notebook](https://deepnote.com/publish/d3abcf79-1d49-4217-a389-e10494e60812)

# Services

## Microservices Model


```python
from IPython.display import Image
Image(filename="./Microservice Framework v6.png")
```





![png](output_3_0.png)




## Service Defintions

    Transfer Service: Used to upload data with associated metadata to framework
    Metadata Service (MDS): Handles minting identifiers...
    Compute Service: Runs nipype wf's spark jobs on uploaded data
    Evidence Graph Service: Queries Stardog to build Evidence Graph tracking object proveance

# Outline

    1.) Upload data to the framework
    2.) Retreive metadata of an uploaded object using MDS
    3.) Run a nipype workflow on uploaded data
    4.) View evidence graph of output from the workflow
    5.) Visualize evidence graph of an ouput from a workflow

# Demo
## Step1 :Use Transfer Service to Upload Data with Metadata
Transfer Service: Uploads (raw) data into MinIO and the metadata into MondoDB


```python
import requests
import json
import FAIR
```

## Authorization

First visit:
<br>
https://clarklab.uvarc.io/auth/login
<br>
And copy paste token below

Restart if kernal gets stuck


```python
token = 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2ZhaXJzY2FwZS5vcmciLCJleHAiOjE2MDc4NzE0MzksImdyb3VwcyI6WyJ0ZXN0MjIiLCJiMTc3MzczYy0yMDViLTExZWItYTU3MS1mNjMxN2U2NTFkMTUiXSwiaWF0IjoxNjA3Njk4NjM5LCJuYW1lIjoiSnVzdGluIEFkbWluIiwicm9sZSI6ImFkbWluIiwic3ViIjoiYzVjMGM4ZDgtNjU2Yi00MTg5LTk5NjctNDRjNDU2MjRkMjgzIn0.fqrLMJcV635A5WE0NTWs7g6LLVbYlsAG6tOE_UL2BRg"
```

## Using Transfer Service upload data with metadata

Upload a file to minio via the upload_file function.
<br>
<br>
upload_file takes:
        - file_path: path to local file
        - metadata: describes the file to be uploaded
returns:
    - PID representing object
upload_file then calls the transfer service which uploads the file to minio and metadata to mongoDB and Stardog


```python
dataset_meta = {
    "@context":{
        "@vocab":"http://schema.org/"
    },
    "@type":"Dataset",
    "name":"sub-01_t1w_preproc.nii.gz",
    "description":"subject 1 preproccesed data",
    "author":'Michael Notter'
}
data_id1 = FAIR.upload_file('sub-01_t1w_preproc.nii.gz',dataset_meta,token = token)
```

    7563651d00f908829bfb2f3c0c6173714f70e8b801b4ed141867bab0e89d007b


#### Transfer Service Response:
Examine the response to the service execution, includes newly minted PID


```python
data_id1
```




    'ark:99999/2c4860ca-c3e2-4c05-84a6-f151ed40c56b'



## Call MDS to Get Metadata for Minted ID
MDS: Retrieve Metadata for the Minted ID

retrieve_metadata calls MDS to get the metadata for the newly minted id.
<br>
<br>
retrieve_metadata takes:
    - PID: identifier of interest
returns:
    - json-ld metadata of given PID


```python
FAIR.retrieve_metadata(data_id1,token = token)
```




    {'@context': {'@vocab': 'http://schema.org/'},
     '@id': 'ark:99999/2c4860ca-c3e2-4c05-84a6-f151ed40c56b',
     '@type': 'Dataset',
     'author': 'Michael Notter',
     'description': 'subject 1 preproccesed data',
     'distribution': [{'@id': 'ark:99999/1a7086e5-49d3-469f-a72a-5e39312d4fd1'}],
     'name': 'sub-01_t1w_preproc.nii.gz',
     'sdPublicationDate': '2020-12-11T14:58:34.480145714Z',
     'sdPublisher': {'@id': 'c5c0c8d8-656b-4189-9967-44c45624d283',
      'name': 'Justin Admin'},
     'url': 'http://ors.uvadcos.io/ark:99999/2c4860ca-c3e2-4c05-84a6-f151ed40c56b'}



## Upload Second Dataset Needed
Follow same steps as above to upload second dataset needed for our example workflow


```python
dataset_meta = {
    "@context":{
        "@vocab":"http://schema.org/"
    },
    "@type":"Dataset",
    "name":"sub-01_ses-test_task-fingerfootlips_bold.nii.gz",
    "description":"sub-01 task",
    "author":'Michael Notter',
    'folder':'inputs'
}
data_id2 = FAIR.upload_file('sub-01_ses-test_task-fingerfootlips_bold.nii.gz',dataset_meta,token = token)

```

    34f88f0e79f0ea57b8449f3e359ea9cb89608317c295d93389847eb44c203319


## Upload Nipype WF via Transfer Service
Transfer Service can also be used to upload software

Software uploads also require associated metadata to be uploaded with the data


```python
software_meta = {
    "@context":{
        "@vocab":"http://schema.org/"
    },
    "@type":"SoftwareSourceCode",
    "name":"Sample Neuro Workflow",
    "description":"sub-01 task",
    "author":'Michael Notter',
    "folder":"inputs"
}
software_id = FAIR.upload_file('new_script.py',software_meta,token = token)
```

    d63567a3e18c902f336a252737faa8a7bb0bb30ca74e3a2f3c38414efa616f43



```python
software_id
```




    'ark:99999/9c78685e-317a-4d48-b0ad-888410093dec'



### Workflow pulled from

https://miykael.github.io/nipype_tutorial/notebooks/example_preprocessing.html


```python
Image(filename="nipype_wf.png")
```





![png](output_29_0.png)




## Call Compute Service to Run WF on Posted Data

#### Compute Service Call
Must pass compute service data ids of interest and which workflow to run

Run a the uploaded script on the uploaded data by calling compute
<br>
<br>
FAIR.compute takes:
    - data pids (list or single string)
    - software pid
    - type of job ie spark,nipype,custom  
compute then launches kubernetes pods to run the given script on the provided data using specialized pods
<br>
<br>
compute returns:
    - job_PID


```python
job_id = FAIR.compute([data_id1,data_id2],software_id,'nipype',token = token)
job_id
```




    'ark:99999/8ed482ae-0ab5-401f-9dbf-8d5e835a060e'




```python
FAIR.retrieve_metadata(job_id,token = token)
```




    {'@context': {'@vocab': 'http://schema.org/'},
     '@id': 'ark:99999/8ed482ae-0ab5-401f-9dbf-8d5e835a060e',
     '@type': 'evi:Computation',
     'endTime': 'Friday, December 11, 2020 03:14:15',
     'evi:supports': ['ark:99999/9865babf-c91a-45ea-899d-b5c8b6cd1759',
      'ark:99999/b3bfa7ec-edd2-405c-99e6-6128278f2931',
      'ark:99999/7f50e20c-c1dd-4baa-aebc-35bf133b79be',
      'ark:99999/f344b34f-0682-4f9b-93bd-d1b6895f2cc7',
      'ark:99999/f54887f5-55c1-4756-b608-d327560eae7c',
      'ark:99999/6c225cb3-c490-488a-b23c-a06517a792d1',
      'ark:99999/546ac317-cf67-447b-84b4-184cee8594a0',
      'ark:99999/a3d13933-79ca-4c94-9ea8-0a2cc99b6643',
      'ark:99999/c0afa929-5b59-4a41-a575-03e3c07459eb',
      'ark:99999/62c97afa-b44b-41b9-8c4b-1483e5374743',
      'ark:99999/f6d752bb-ff91-4346-bafc-d2696b223426',
      'ark:99999/c17c12eb-2ec6-4286-8a9e-7f5ea3d4146a',
      'ark:99999/c38af5b7-d3ad-4549-805a-1e8e8bb32720',
      'ark:99999/0e8a5839-d273-461d-96e9-0ea685c55fec',
      'ark:99999/cb640eee-154f-4ea0-b887-f3a1fe83ec59',
      'ark:99999/08b3eb84-65ec-44e2-b454-a49485e0692d',
      'ark:99999/4a802dba-da5d-4b8c-bce3-161a5c489cd1',
      'ark:99999/8cf27fe8-7493-448f-adc0-f7c1849892de',
      'ark:99999/617f693b-4011-40a5-8a13-123e4797a1cb',
      'ark:99999/5fe2cc30-6fed-4031-8ff3-d59116de743e',
      'ark:99999/63502aee-d98c-4fee-abc2-6ce11414073c',
      'ark:99999/b671198e-377f-413d-af4c-bcc2bf35c524',
      'ark:99999/3b06bd43-2dca-423e-9b72-d825d2f6ebbb',
      'ark:99999/b8823c44-e6df-45c1-aac7-e0b563b926b3',
      'ark:99999/dbdeadd9-a1db-4bdd-b0e4-e3d188c1f11b',
      'ark:99999/0916a4de-af3e-4d7c-bff5-b49b2ff7e168'],
     'evi:usedDataset': [{'@id': 'ark:99999/2c4860ca-c3e2-4c05-84a6-f151ed40c56b'},
      {'@id': 'ark:99999/7379b341-8f19-4460-911e-a99f6c2e04a1'}],
     'evi:usedSoftware': {'@id': 'ark:99999/9c78685e-317a-4d48-b0ad-888410093dec'},
     'fileIDJson': 'ark:99999/98ec546d-3738-4719-8f47-051151259163',
     'logs': 'Made it past the hard part\n201211-15:07:24,182 nipype.workflow INFO:\n\t Generated workflow graph: /data/working_dir/preproc/graph.png (graph2use=colored, simple_form=True).\n201211-15:07:24,656 nipype.workflow INFO:\n\t Generated workflow graph: /data/working_dir/preproc/graph.png (graph2use=flat, simple_form=True).\n201211-15:07:24,922 nipype.workflow INFO:\n\t Workflow preproc settings: [\'check\', \'execution\', \'logging\', \'monitoring\']\n201211-15:07:24,940 nipype.workflow INFO:\n\t Running in parallel.\n201211-15:07:24,943 nipype.workflow INFO:\n\t [MultiProc] Running 0 tasks, and 1 jobs ready. Free memory (GB): 28.13/28.13, Free processors: 8/8.\n201211-15:07:25,1 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.selectfiles" in "/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/selectfiles".\n201211-15:07:25,11 nipype.workflow INFO:\n\t [Node] Running "selectfiles" ("nipype.interfaces.io.SelectFiles")\n201211-15:07:25,21 nipype.workflow INFO:\n\t [Node] Finished "preproc.selectfiles".\n201211-15:07:26,943 nipype.workflow INFO:\n\t [Job 0] Completed (preproc.selectfiles).\n201211-15:07:26,947 nipype.workflow INFO:\n\t [MultiProc] Running 0 tasks, and 2 jobs ready. Free memory (GB): 28.13/28.13, Free processors: 8/8.\n201211-15:07:27,7 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.coregwf.bet_anat" in "/data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/bet_anat".\n201211-15:07:27,12 nipype.workflow INFO:\n\t [Node] Running "bet_anat" ("nipype.interfaces.fsl.preprocess.BET"), a CommandLine Interface with command:\nbet /data/sub-01_t1w_preproc.nii.gz /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/bet_anat/sub-01_t1w_preproc_brain.nii.gz -f 0.50 -R\n201211-15:07:27,18 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.extract" in "/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/extract".\n201211-15:07:27,23 nipype.workflow INFO:\n\t [Node] Running "extract" ("nipype.interfaces.fsl.utils.ExtractROI"), a CommandLine Interface with command:\nfslroi /data/sub-01_ses-test_task-fingerfootlips_bold.nii.gz /data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/extract/sub-01_ses-test_task-fingerfootlips_bold_roi.nii 4 -1\n201211-15:07:27,856 nipype.workflow INFO:\n\t [Node] Finished "preproc.extract".\n201211-15:07:28,945 nipype.workflow INFO:\n\t [Job 4] Completed (preproc.extract).\n201211-15:07:28,948 nipype.workflow INFO:\n\t [MultiProc] Running 1 tasks, and 1 jobs ready. Free memory (GB): 27.93/28.13, Free processors: 7/8.\n                     Currently running:\n                       * preproc.coregwf.bet_anat\n201211-15:07:28,997 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.mcflirt" in "/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/mcflirt".\n201211-15:07:29,9 nipype.workflow INFO:\n\t [Node] Running "mcflirt" ("nipype.interfaces.fsl.preprocess.MCFLIRT"), a CommandLine Interface with command:\nmcflirt -in /data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/extract/sub-01_ses-test_task-fingerfootlips_bold_roi.nii -meanvol -out /data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/mcflirt/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii -plots\n201211-15:07:30,949 nipype.workflow INFO:\n\t [MultiProc] Running 2 tasks, and 0 jobs ready. Free memory (GB): 27.73/28.13, Free processors: 6/8.\n                     Currently running:\n                       * preproc.mcflirt\n                       * preproc.coregwf.bet_anat\n201211-15:07:35,865 nipype.workflow INFO:\n\t [Node] Finished "preproc.coregwf.bet_anat".\n201211-15:07:36,951 nipype.workflow INFO:\n\t [Job 1] Completed (preproc.coregwf.bet_anat).\n201211-15:07:36,954 nipype.workflow INFO:\n\t [MultiProc] Running 1 tasks, and 1 jobs ready. Free memory (GB): 27.93/28.13, Free processors: 7/8.\n                     Currently running:\n                       * preproc.mcflirt\n201211-15:07:37,1 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.coregwf.segmentation" in "/data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/segmentation".\n201211-15:07:37,7 nipype.workflow INFO:\n\t [Node] Running "segmentation" ("nipype.interfaces.fsl.preprocess.FAST"), a CommandLine Interface with command:\nfast -S 1 /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/segmentation/sub-01_t1w_preproc_brain.nii.gz\n201211-15:07:38,954 nipype.workflow INFO:\n\t [MultiProc] Running 2 tasks, and 0 jobs ready. Free memory (GB): 27.73/28.13, Free processors: 6/8.\n                     Currently running:\n                       * preproc.coregwf.segmentation\n                       * preproc.mcflirt\n201211-15:08:25,312 nipype.workflow INFO:\n\t [Node] Finished "preproc.mcflirt".\n201211-15:08:26,996 nipype.workflow INFO:\n\t [Job 5] Completed (preproc.mcflirt).\n201211-15:08:27,0 nipype.workflow INFO:\n\t [MultiProc] Running 1 tasks, and 2 jobs ready. Free memory (GB): 27.93/28.13, Free processors: 7/8.\n                     Currently running:\n                       * preproc.coregwf.segmentation\n201211-15:08:27,47 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.coregwf.coreg_pre" in "/data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/coreg_pre".\n201211-15:08:27,47 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.slicetimer" in "/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/slicetimer".\n201211-15:08:27,60 nipype.workflow INFO:\n\t [Node] Running "slicetimer" ("nipype.interfaces.fsl.preprocess.SliceTimer"), a CommandLine Interface with command:\nslicetimer --in=/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/mcflirt/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii --odd --out=/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/slicetimer/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st.nii --repeat=2.500000\n201211-15:08:27,61 nipype.workflow INFO:\n\t [Node] Running "coreg_pre" ("nipype.interfaces.fsl.preprocess.FLIRT"), a CommandLine Interface with command:\nflirt -in /data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/mcflirt/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg.nii -ref /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/bet_anat/sub-01_t1w_preproc_brain.nii.gz -out sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.nii.gz -omat sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.mat -dof 6\n201211-15:08:28,998 nipype.workflow INFO:\n\t [MultiProc] Running 3 tasks, and 0 jobs ready. Free memory (GB): 27.53/28.13, Free processors: 5/8.\n                     Currently running:\n                       * preproc.slicetimer\n                       * preproc.coregwf.coreg_pre\n                       * preproc.coregwf.segmentation\n201211-15:08:30,487 nipype.workflow INFO:\n\t [Node] Finished "preproc.slicetimer".\n201211-15:08:30,999 nipype.workflow INFO:\n\t [Job 9] Completed (preproc.slicetimer).\n201211-15:08:31,3 nipype.workflow INFO:\n\t [MultiProc] Running 2 tasks, and 0 jobs ready. Free memory (GB): 27.73/28.13, Free processors: 6/8.\n                     Currently running:\n                       * preproc.coregwf.coreg_pre\n                       * preproc.coregwf.segmentation\n201211-15:08:34,779 nipype.workflow INFO:\n\t [Node] Finished "preproc.coregwf.coreg_pre".\n201211-15:08:35,2 nipype.workflow INFO:\n\t [Job 6] Completed (preproc.coregwf.coreg_pre).\n201211-15:08:35,8 nipype.workflow INFO:\n\t [MultiProc] Running 1 tasks, and 0 jobs ready. Free memory (GB): 27.93/28.13, Free processors: 7/8.\n                     Currently running:\n                       * preproc.coregwf.segmentation\n201211-15:10:03,660 nipype.workflow INFO:\n\t [Node] Finished "preproc.coregwf.segmentation".\n201211-15:10:05,87 nipype.workflow INFO:\n\t [Job 2] Completed (preproc.coregwf.segmentation).\n201211-15:10:05,91 nipype.workflow INFO:\n\t [MultiProc] Running 0 tasks, and 1 jobs ready. Free memory (GB): 28.13/28.13, Free processors: 8/8.\n201211-15:10:05,137 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.coregwf.threshold" in "/data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/threshold".\n201211-15:10:05,142 nipype.workflow INFO:\n\t [Node] Running "threshold" ("nipype.interfaces.fsl.maths.Threshold"), a CommandLine Interface with command:\nfslmaths /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/segmentation/sub-01_t1w_preproc_brain_pve_2.nii.gz -thr 0.5000000000 -bin /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/threshold/sub-01_t1w_preproc_brain_pve_2_thresh.nii.gz\n201211-15:10:05,951 nipype.workflow INFO:\n\t [Node] Finished "preproc.coregwf.threshold".\n201211-15:10:07,89 nipype.workflow INFO:\n\t [Job 3] Completed (preproc.coregwf.threshold).\n201211-15:10:07,93 nipype.workflow INFO:\n\t [MultiProc] Running 0 tasks, and 1 jobs ready. Free memory (GB): 28.13/28.13, Free processors: 8/8.\n201211-15:10:07,139 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.coregwf.coreg_bbr" in "/data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/coreg_bbr".\n201211-15:10:07,151 nipype.workflow INFO:\n\t [Node] Running "coreg_bbr" ("nipype.interfaces.fsl.preprocess.FLIRT"), a CommandLine Interface with command:\nflirt -in /data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/mcflirt/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg.nii -ref /data/sub-01_t1w_preproc.nii.gz -out sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.nii.gz -omat sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.mat -cost bbr -dof 6 -init /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/coreg_pre/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.mat -schedule /usr/share/fsl/5.0/etc/flirtsch/bbr.sch -wmseg /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/threshold/sub-01_t1w_preproc_brain_pve_2_thresh.nii.gz\n201211-15:10:09,93 nipype.workflow INFO:\n\t [MultiProc] Running 1 tasks, and 0 jobs ready. Free memory (GB): 27.93/28.13, Free processors: 7/8.\n                     Currently running:\n                       * preproc.coregwf.coreg_bbr\n201211-15:11:49,769 nipype.workflow INFO:\n\t [Node] Finished "preproc.coregwf.coreg_bbr".\n201211-15:11:51,189 nipype.workflow INFO:\n\t [Job 7] Completed (preproc.coregwf.coreg_bbr).\n201211-15:11:51,192 nipype.workflow INFO:\n\t [MultiProc] Running 0 tasks, and 2 jobs ready. Free memory (GB): 28.13/28.13, Free processors: 8/8.\n201211-15:11:51,235 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.coregwf.applywarp_mean" in "/data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/applywarp_mean".\n201211-15:11:51,237 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.coregwf.applywarp" in "/data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/applywarp".\n201211-15:11:51,240 nipype.workflow INFO:\n\t [Node] Running "applywarp_mean" ("nipype.interfaces.fsl.preprocess.FLIRT"), a CommandLine Interface with command:\nflirt -in /data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/mcflirt/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg.nii -ref /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/bet_anat/sub-01_t1w_preproc_brain.nii.gz -out sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.nii.gz -omat sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.mat -applyisoxfm 4.000000 -init /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/coreg_bbr/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.mat -interp spline\n201211-15:11:51,248 nipype.workflow INFO:\n\t [Node] Running "applywarp" ("nipype.interfaces.fsl.preprocess.FLIRT"), a CommandLine Interface with command:\nflirt -in /data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/slicetimer/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st.nii -ref /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/bet_anat/sub-01_t1w_preproc_brain.nii.gz -out sub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st_flirt.nii -omat sub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st_flirt.mat -applyisoxfm 4.000000 -init /data/working_dir/preproc/coregwf/_subject_id_01_task_name_fingerfootlips/coreg_bbr/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.mat -interp spline\n201211-15:11:52,997 nipype.workflow INFO:\n\t [Node] Finished "preproc.coregwf.applywarp_mean".\n201211-15:11:53,191 nipype.workflow INFO:\n\t [Job 8] Completed (preproc.coregwf.applywarp_mean).\n201211-15:11:53,196 nipype.workflow INFO:\n\t [MultiProc] Running 1 tasks, and 0 jobs ready. Free memory (GB): 27.93/28.13, Free processors: 7/8.\n                     Currently running:\n                       * preproc.coregwf.applywarp\n201211-15:12:00,195 nipype.workflow INFO:\n\t [Node] Finished "preproc.coregwf.applywarp".\n201211-15:12:01,198 nipype.workflow INFO:\n\t [Job 10] Completed (preproc.coregwf.applywarp).\n201211-15:12:01,202 nipype.workflow INFO:\n\t [MultiProc] Running 0 tasks, and 3 jobs ready. Free memory (GB): 28.13/28.13, Free processors: 8/8.\n201211-15:12:01,247 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.smooth" in "/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/_fwhm_8/smooth".\n201211-15:12:01,249 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.art" in "/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/art".201211-15:12:01,249 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.smooth" in "/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/_fwhm_4/smooth".\n\n201211-15:12:01,250 nipype.workflow INFO:\n\t [Node] Running "smooth" ("nipype.interfaces.spm.preprocess.Smooth")\n201211-15:12:01,257 nipype.workflow INFO:\n\t [Node] Running "smooth" ("nipype.interfaces.spm.preprocess.Smooth")\n201211-15:12:01,258 nipype.workflow INFO:\n\t [Node] Running "art" ("nipype.algorithms.rapidart.ArtifactDetect")\n201211-15:12:02,352 nipype.workflow INFO:\n\t [Node] Finished "preproc.art".\nstty: \'standard input\': Inappropriate ioctl for device\nstty: \'standard input\': Inappropriate ioctl for device\n201211-15:12:03,200 nipype.workflow INFO:\n\t [Job 13] Completed (preproc.art).\n201211-15:12:03,204 nipype.workflow INFO:\n\t [MultiProc] Running 2 tasks, and 0 jobs ready. Free memory (GB): 27.73/28.13, Free processors: 6/8.\n                     Currently running:\n                       * preproc.smooth\n                       * preproc.smooth\nstty: \'standard input\': Inappropriate ioctl for device\n201211-15:12:19,850 nipype.workflow INFO:\n\t [Node] Finished "preproc.smooth".\nstty: \'standard input\': Inappropriate ioctl for device\n201211-15:12:20,335 nipype.workflow INFO:\n\t [Node] Finished "preproc.smooth".\n201211-15:12:21,217 nipype.workflow INFO:\n\t [Job 11] Completed (preproc.smooth).\n201211-15:12:21,220 nipype.workflow INFO:\n\t [Job 12] Completed (preproc.smooth).\n201211-15:12:21,225 nipype.workflow INFO:\n\t [MultiProc] Running 0 tasks, and 2 jobs ready. Free memory (GB): 28.13/28.13, Free processors: 8/8.\n201211-15:12:21,275 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.datasink" in "/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/_fwhm_8/datasink".\n201211-15:12:21,276 nipype.workflow INFO:\n\t [Node] Setting-up "preproc.datasink" in "/data/working_dir/preproc/_subject_id_01_task_name_fingerfootlips/_fwhm_4/datasink".\n201211-15:12:21,291 nipype.workflow INFO:\n\t [Node] Running "datasink" ("nipype.interfaces.io.DataSink")\n201211-15:12:21,293 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii.par -> /output/preproc/sub-01/task-fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold.par\n201211-15:12:21,293 nipype.workflow INFO:\n\t [Node] Running "datasink" ("nipype.interfaces.io.DataSink")\n201211-15:12:21,294 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/art.sub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st_flirt_outliers.txt -> /output/preproc/sub-01/task-fingerfootlips/art.sub-01_ses-test_task-fingerfootlips_bold_outliers.txt\n201211-15:12:21,294 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/plot.sub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st_flirt.svg -> /output/preproc/sub-01/task-fingerfootlips/plot.sub-01_ses-test_task-fingerfootlips_bold.svg\n201211-15:12:21,295 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/sub-01_t1w_preproc_brain.nii.gz -> /output/preproc/sub-01/task-fingerfootlips/sub-01_t1w_preproc_brain.nii.gz\n201211-15:12:21,296 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii.par -> /output/preproc/sub-01/task-fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold.par\n201211-15:12:21,296 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/art.sub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st_flirt_outliers.txt -> /output/preproc/sub-01/task-fingerfootlips/art.sub-01_ses-test_task-fingerfootlips_bold_outliers.txt\n201211-15:12:21,297 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/plot.sub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st_flirt.svg -> /output/preproc/sub-01/task-fingerfootlips/plot.sub-01_ses-test_task-fingerfootlips_bold.svg\n201211-15:12:21,298 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/sub-01_t1w_preproc_brain.nii.gz -> /output/preproc/sub-01/task-fingerfootlips/sub-01_t1w_preproc_brain.nii.gz\n201211-15:12:21,309 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.mat -> /output/preproc/sub-01/task-fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_mean.mat\n201211-15:12:21,310 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.nii.gz -> /output/preproc/sub-01/task-fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_mean.nii.gz\n201211-15:12:21,311 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/_fwhm_8/ssub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st_flirt.nii -> /output/preproc/sub-01/task-fingerfootlips/fwhm-8_ssub-01_ses-test_task-fingerfootlips_bold.nii\n201211-15:12:21,320 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.mat -> /output/preproc/sub-01/task-fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_mean.mat\n201211-15:12:21,320 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_roi_mcf.nii_mean_reg_flirt.nii.gz -> /output/preproc/sub-01/task-fingerfootlips/sub-01_ses-test_task-fingerfootlips_bold_mean.nii.gz\n201211-15:12:21,323 nipype.interface INFO:\n\t sub: /output/preproc/_subject_id_01_task_name_fingerfootlips/_fwhm_4/ssub-01_ses-test_task-fingerfootlips_bold_roi_mcf_st_flirt.nii -> /output/preproc/sub-01/task-fingerfootlips/fwhm-4_ssub-01_ses-test_task-fingerfootlips_bold.nii\n201211-15:12:21,416 nipype.workflow INFO:\n\t [Node] Finished "preproc.datasink".\n201211-15:12:21,428 nipype.workflow INFO:\n\t [Node] Finished "preproc.datasink".\n201211-15:12:23,218 nipype.workflow INFO:\n\t [Job 14] Completed (preproc.datasink).\n201211-15:12:23,221 nipype.workflow INFO:\n\t [Job 15] Completed (preproc.datasink).\n201211-15:12:23,226 nipype.workflow INFO:\n\t [MultiProc] Running 0 tasks, and 0 jobs ready. Free memory (GB): 28.13/28.13, Free processors: 8/8.\n\nNo associated ID for input: /usr/share/fsl/5.0/etc/flirtsch/bbr.sch\n\n\n',
     'name': 'Computation',
     'sdPublicationDate': '2020-12-11T15:07:14.944506311Z',
     'sdPublisher': {'@id': 'c5c0c8d8-656b-4189-9967-44c45624d283',
      'name': 'Justin Admin'},
     'startTime': 'Friday, December 11, 2020 03:07:14',
     'status': 'Succeeded',
     'url': 'http://ors.uvadcos.io/ark:99999/8ed482ae-0ab5-401f-9dbf-8d5e835a060e'}



## Watch Running Job
list_running_jobs takes:
<br>
<br>
list_running_jobs returns:
    - list of running job PIDs


```python
FAIR.list_running_jobs(token = token)
```




    ['nipype-7b9e1e6e-ab6d-4c6d-9c8a-74b37f33c4f3']



## Review Job Outputs

#### Get all Minted Output IDs


```python
all_outputs = FAIR.retrieve_metadata(job_id,token = token)['evi:supports']
```


```python
all_outputs
```




    ['ark:99999/9865babf-c91a-45ea-899d-b5c8b6cd1759',
     'ark:99999/b3bfa7ec-edd2-405c-99e6-6128278f2931',
     'ark:99999/7f50e20c-c1dd-4baa-aebc-35bf133b79be',
     'ark:99999/f344b34f-0682-4f9b-93bd-d1b6895f2cc7',
     'ark:99999/f54887f5-55c1-4756-b608-d327560eae7c',
     'ark:99999/6c225cb3-c490-488a-b23c-a06517a792d1',
     'ark:99999/546ac317-cf67-447b-84b4-184cee8594a0',
     'ark:99999/a3d13933-79ca-4c94-9ea8-0a2cc99b6643',
     'ark:99999/c0afa929-5b59-4a41-a575-03e3c07459eb',
     'ark:99999/62c97afa-b44b-41b9-8c4b-1483e5374743',
     'ark:99999/f6d752bb-ff91-4346-bafc-d2696b223426',
     'ark:99999/c17c12eb-2ec6-4286-8a9e-7f5ea3d4146a',
     'ark:99999/c38af5b7-d3ad-4549-805a-1e8e8bb32720',
     'ark:99999/0e8a5839-d273-461d-96e9-0ea685c55fec',
     'ark:99999/cb640eee-154f-4ea0-b887-f3a1fe83ec59',
     'ark:99999/08b3eb84-65ec-44e2-b454-a49485e0692d',
     'ark:99999/4a802dba-da5d-4b8c-bce3-161a5c489cd1',
     'ark:99999/8cf27fe8-7493-448f-adc0-f7c1849892de',
     'ark:99999/617f693b-4011-40a5-8a13-123e4797a1cb',
     'ark:99999/5fe2cc30-6fed-4031-8ff3-d59116de743e',
     'ark:99999/63502aee-d98c-4fee-abc2-6ce11414073c',
     'ark:99999/b671198e-377f-413d-af4c-bcc2bf35c524',
     'ark:99999/3b06bd43-2dca-423e-9b72-d825d2f6ebbb',
     'ark:99999/b8823c44-e6df-45c1-aac7-e0b563b926b3',
     'ark:99999/dbdeadd9-a1db-4bdd-b0e4-e3d188c1f11b',
     'ark:99999/0916a4de-af3e-4d7c-bff5-b49b2ff7e168']



#### Check Individual Output Metadata with Call to MDS

Long Evidence Graph


```python
output_of_interest = all_outputs[-3]
FAIR.retrieve_metadata(output_of_interest,token = token)
```




    {'@context': {'@vocab': 'http://schema.org/'},
     '@id': 'ark:99999/b8823c44-e6df-45c1-aac7-e0b563b926b3',
     '@type': 'Dataset',
     'distribution': [{'@id': 'ark:99999/a58ff1c9-ba06-49d2-9317-b84ef138eee7'}],
     'evi:generatedBy': {'@id': 'ark:99999/45519bf8-4456-45cb-b090-4a12d2a2cf1a'},
     'name': 'preproc.datasink.a1.b0.out_file',
     'sdPublicationDate': '2020-12-11T15:13:29.630099171Z',
     'sdPublisher': {'@id': 'c5c0c8d8-656b-4189-9967-44c45624d283',
      'name': 'Justin Admin'},
     'url': 'http://ors.uvadcos.io/ark:99999/b8823c44-e6df-45c1-aac7-e0b563b926b3'}



Short Evidence Graph


```python
output_of_interest = all_outputs[7]
FAIR.retrieve_metadata(output_of_interest,token = token)
```




    {'@context': {'@vocab': 'http://schema.org/'},
     '@id': 'ark:99999/a3d13933-79ca-4c94-9ea8-0a2cc99b6643',
     '@type': 'Dataset',
     'distribution': [{'@id': 'ark:99999/407fac13-7c08-422d-971c-d479b1340cbc'}],
     'evi:generatedBy': {'@id': 'ark:99999/475674c0-7ac5-43d7-8b0d-8e4823b242e7'},
     'name': 'preproc.mcflirt.b0.out_file',
     'sdPublicationDate': '2020-12-11T15:12:38.316448731Z',
     'sdPublisher': {'@id': 'c5c0c8d8-656b-4189-9967-44c45624d283',
      'name': 'Justin Admin'},
     'url': 'http://ors.uvadcos.io/ark:99999/a3d13933-79ca-4c94-9ea8-0a2cc99b6643'}



## Call Evidence Graph Service to See Evidence Graph of Output

Evidence Graph Service builds an json-ld evidence graph representing the provenance (datasets, software, and computations that support the PID)
<br>
<br>
evidence_graph takes:
    - PID
evidence_graph returns:
    - json-ld evidence graph for given PID


```python
eg = FAIR.evidence_graph(output_of_interest,token = token)
eg
```




    {'@context': {'@vocab': 'http://schema.org/', 'evi': 'http://w3id.org/EVI#'},
     '@id': 'ark:99999/a3d13933-79ca-4c94-9ea8-0a2cc99b6643',
     '@type': 'Dataset',
     'evi:generatedBy': {'@id': 'ark:99999/475674c0-7ac5-43d7-8b0d-8e4823b242e7',
      '@type': 'evi:Computation',
      'evi:usedDataset': {'@id': 'ark:99999/6c225cb3-c490-488a-b23c-a06517a792d1',
       '@type': 'Dataset',
       'evi:generatedBy': {'@id': 'ark:99999/c2af148e-7349-4c93-afec-bd422dc632d8',
        '@type': 'evi:Computation',
        'evi:usedDataset': {'@id': 'ark:99999/7379b341-8f19-4460-911e-a99f6c2e04a1',
         '@type': 'Dataset',
         'author': 'Michael Notter',
         'name': 'sub-01_ses-test_task-fingerfootlips_bold.nii.gz'},
        'evi:usedSoftware': {'@id': 'ark:99999/0623dd0a-9584-4caa-8bcd-5e1064d8ab6e',
         '@type': 'SoftwareSourceCode',
         'name': 'preproc.extract.b0'},
        'name': 'Computation preproc.extract.b0'},
       'name': 'preproc.extract.b0.roi_file'},
      'evi:usedSoftware': {'@id': 'ark:99999/6018bc31-cc92-4df4-ab42-5bc76712cdbc',
       '@type': 'SoftwareSourceCode',
       'name': 'preproc.mcflirt.b0'},
      'name': 'Computation preproc.mcflirt.b0'},
     'name': 'preproc.mcflirt.b0.out_file'}



## Visualization of Evidence Graph


```python
'https://clarklab.uvarc.io/viz/' + output_of_interest
```




    'https://clarklab.uvarc.io/viz/ark:99999/a3d13933-79ca-4c94-9ea8-0a2cc99b6643'



## Text Search

Search Service searches metadata for string matches
<br>
<br>
FAIR.search takes:
    - query_string
FAIR.search returns:
    - list of PIDs that contian the query string in any literal


```python
matches = FAIR.search('FSL OR BET',token = token)
matches
```




    ['ark:99999/0ee8b94c-f423-436c-b3b0-74d809eb8ff2',
     'ark:99999/8d42c8aa-4532-4970-b1b1-fd939c12f5a7',
     'ark:99999/9f5bde4c-0b2c-46be-811b-3f55478468d5',
     'ark:99999/d7d28d31-162c-4c57-aaa5-101f13c2c956',
     'ark:99999/7ef27031-0a53-4583-8715-23cc41091bd6',
     'ark:99999/41e49838-2f86-42ad-a4ad-e7adbf4f3c04',
     'ark:99999/2f7c1594-8e81-49f4-b7fe-1fb3ea54de46',
     'ark:99999/2e574e91-bcdf-434f-bb82-cc734169c7b6',
     'ark:99999/19cce1bf-c8cb-480d-abca-3912dfa91d8d',
     'ark:99999/71f4f3fc-5b9f-45e2-a6dc-ec32ea0b5fdd',
     'ark:99999/0b1e8970-01c3-4e7c-8858-a7357b53fa4a',
     'ark:99999/9bc3e4eb-2cb5-4ccd-800e-42e2211872f7',
     'ark:99999/8ed482ae-0ab5-401f-9dbf-8d5e835a060e',
     'ark:99999/c132612b-c624-4b62-be1d-0050b1d28f30',
     'ark:99999/f7d34aab-099f-421a-85d7-37dd24b03149',
     'ark:99999/db874b3f-d4f4-4ac2-8d89-e7b48aaf1aba',
     'ark:99999/4fc88d94-2721-4ec8-91b8-73181c61bafb',
     'ark:99999/db5aaba6-42a8-4e46-ab4c-6fb832d846f2',
     'ark:99999/3996b750-a2a5-4c56-b85e-0d820d739c38',
     'ark:99999/7431dc72-23fe-41ba-a87a-bf2b346ff8d1',
     'ark:99999/9535ecaa-2f68-4e4c-9452-c3b293aedb3a',
     'ark:99999/1dd9b10f-aa59-4e02-a5a6-01e1361955d8',
     'ark:99999/c91c7723-a794-4ce5-ba5e-29af26e16916',
     'ark:99999/86b6dce5-c085-4dc5-88b5-39f3276f49f0',
     'ark:99999/845f7f3a-12db-4dba-b705-a7f4e92e4d22',
     'ark:99999/d2c9c8de-3fba-48d3-83e0-3f5c4fc9683e',
     'ark:99999/88c37ce6-0c5c-4e0a-ae58-991ba3fb5d72',
     'ark:99999/0623725b-1886-435f-b9f9-d8b073e054d1',
     'ark:99999/40da2890-26de-4d82-a37a-60e2f902c81f',
     'ark:99999/de2c725c-d778-418a-a9c5-7386c0fc86a6',
     'ark:11111/8f722a24-e7cb-4880-9f51-af9355cf8486',
     'ark:99999/24b2fa0f-fd35-4385-b418-fb48b443c8ed',
     'ark:99999/d79034fc-6356-46a1-a7e3-3763e621682f',
     'ark:99999/a3dc45ba-ab77-475f-83e5-5c50f7700046',
     'ark:99999/f25b3fcb-a623-42c6-b799-e43b2a1f7131',
     'ark:99999/1b075e9f-b3d2-4591-9e14-07d0118be6cc',
     'ark:99999/210ca441-80b3-44b3-9036-bd1e42eb13bd',
     'ark:99999/426c81c0-7346-4841-866e-49b9be384f8c',
     'ark:99999/01002f85-33cb-452f-8977-28433359c593',
     'ark:99999/2aaee3c6-07d6-4137-8f2d-a783f4eeb5f0',
     'ark:99999/39ed58cc-d170-4eeb-a4a3-04d2a3463c47',
     'ark:99999/a65f3e49-2d4f-402d-8b1b-1dd7acc7eef9',
     'ark:99999/77c47454-5d4e-49b4-bcd4-0768310b409c',
     'ark:99999/8284729e-dc9d-4260-8d6b-c8cd4e95b9ba',
     'ark:99999/9e34eb34-11f8-4011-96f0-9b11bcb6d2ab',
     'ark:11111/14cae551-17bd-4f03-952f-7a6cbca12149',
     'ark:99999/d96f1633-102a-41d7-86d6-9d9d07d97905',
     'ark:99999/91c315d0-1d43-4466-a87a-43491af65984',
     'ark:99999/2ee431b3-5fea-4005-bf6d-dc12609ff059',
     'ark:99999/622c409a-0499-463b-86c3-8d39cd3b957b',
     'ark:99999/be9f6197-1c85-4572-945a-a9d56ed5470d',
     'ark:99999/a823b922-f376-40db-ac73-90c6a7230344',
     'ark:99999/b9a5e21f-7fac-4866-a7df-3ea8c46ee99d',
     'ark:99999/f156070e-2ca0-4bce-a2bd-9cbbabd2b1ce',
     'ark:99999/5c7c4fbd-3c57-462c-a1c7-0cdbb309241e',
     'ark:99999/30cfb3fb-c91f-4fb9-b6eb-1015a6b8fa1e',
     'ark:99999/cf64acce-6e13-4b43-9ea5-5df6394be386',
     'ark:99999/ac5b9247-1a31-4772-8d43-f3a24c301c4c',
     'ark:99999/da23e0ac-7917-4d98-9184-b8453fbac5ea',
     'ark:99999/4d6ba9c3-f4f8-43a5-8143-c080f987015f',
     'ark:99999/977b4362-d4a1-40e7-9b48-03bf8b2df4cc',
     'ark:99999/8f9fd9c0-6068-41ac-91d0-9a24c087d540',
     'ark:99999/edec34b9-f70e-4c85-a71d-16a450e52da9',
     'ark:99999/6d8865de-ded0-4647-976e-13443e299f26',
     'ark:99999/b01a4844-5ea3-4379-8656-9f6e4136154b']
