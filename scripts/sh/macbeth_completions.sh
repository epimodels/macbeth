#! /usr/bin/env bash

## To enable auto completion of commands perform one of two tasks:
## 
## 1. Add the following line to your .bashrc file (this will only enable auto completion for the current user)):
##        source <path-to-this-file>/macbeth_completion.sh
## 
## 2. Copy this file to the /etc/bash_completion.d/ folder. This will enable auto completion for all users.


## To add a new command to the completion list, add it to the COMMANDS list below
_macbeth_completions()
{
    COMMANDS="help dropdb creatdb test dropandrun"
    COMPREPLY=( $(compgen -W "${COMMANDS}" "${COMP_WORDS[1]}") )
}
complete -o nospace -F _macbeth_completions run-backend.sh