#!/bin/bash

# Create a new virtual environment
virtualenv venv

# Activate the virtual environment
source venv/bin/activate
# Install additional apt packages if necessary
# For example, Python interpreter and prerequisites for Pillow
# (Replace with actual package names if needed)
#sudo apt-get update
 #sudo apt-get install -y python3 python3-dev python3-venv

# Install Pillow prerequisites (libjpeg-dev and zlib1g-dev)
# sudo apt-get install -y libjpeg-dev zlib1g-dev

# Install packages with pip from packages.txt
pip install -r packages.txt

# Run Django management commands
./manage.py makemigrations
./manage.py migrate