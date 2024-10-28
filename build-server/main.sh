#!/bin/bash


# this will be passed as the env variable to the script
# also export keyword make this variable available to the child process as well that will be spawned by this script, simple variable scope is only limited to this script only.
# we are using double quotes bcoz link may have special characters or spaces maybe. So better to use the double quotes here
export GIT_REPO_URL="$GIT_REPO_URL"

git clone "$GIT_REPO_URL" /home/app/output

exec node script.js

