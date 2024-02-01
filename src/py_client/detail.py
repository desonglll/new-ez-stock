# -*- coding: utf-8 -*-
"""
File: create
Description:
Author: mikeshinoda
Date: 2024/1/19
"""

# TODO: Add your code here
import requests

endpoint = "http://localhost:8000/api/products/1/"

get_response = requests.get(endpoint)
print(get_response.json())
