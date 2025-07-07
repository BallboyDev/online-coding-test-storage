#!/bin/sh

TIME=$(date +%s)

gcc "$1" -o "$TIME"  && ./"$TIME" && rm "$TIME"