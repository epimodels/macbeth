#! /bin/sh

# first arg is the name of the model

if [ $# -eq 0 ]
then
    echo "No model name given. Exiting."
    exit 1
fi

MODEL_NAME=$1

cd macbeth_backend/computations/;
mkdir -p ${MODEL_NAME};
cd ${MODEL_NAME};
touch __init__.py
touch config.json;
touch ${MODEL_NAME}.py;

# I want to write to the MODEL_NAME.py file

cat << EOF >> ${MODEL_NAME}.py
#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# file: ${MODEL_NAME}.py
# ------------------------------------------------------------
#

from macbeth_backend.computations.interface_compute_model import InterfaceComputeModel


class ${MODEL_NAME}(InterfaceComputeModel):

    def __init__(self):
        pass

    def compute_model(self, **kwargs):
        pass
EOF

cat << EOF >> config.json
{
    "Title": "",
    "Version": 1.0,
    "Author": "",
    "Description": "",
    "Type": "",
    "Authorlink": "",
    "Parameters": [
        {
            "Name": "",
            "Type": "",
            "Description": "",
            "Min": 0,
            "Max": 10000,
            "DefaultValue": 1
        }
    ]
}
EOF
