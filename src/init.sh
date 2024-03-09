#!/usr/bin/env zsh
conda init
conda activate NewEzStock
sh ./migrate.sh
python ./create_admin.py
