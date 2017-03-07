# Welcome to Labelr

[Click here to launch a new instance on Gomix](https://gomix.com/#!/remix/salty-porcupine)

The goal of labelr is to simplify the process of creating training datasets for image classification.
It was created during Brainhack Montreal by the Deep Neuron team.

By default, an image can be classified as either `pyr: Pyramidal`, `reg: Regular` or `unk: Unknown`. These choices can be changed by editing `config.json`:
```
{
    "labels": [
        [ "pyr", "Pyramidal" ],
        [ "reg", "Regular" ],
        [ "unk", "Unknown" ]
    ]
}
```
After uploading the training image set in JPEG, PNG or GIF, you will be taken to the classification page. The URL for this page can be distributed amongst all experts who will be labelling the data. When all the data is labelled, the results will be compiled into a JSON document with the following format:
```
{ "<filename>": "label" }
```
