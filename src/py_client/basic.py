# -*- coding: utf-8 -*-
"""
File: basic
Description: 
Author: mikeshinoda
Date: 2024/1/19
"""

# TODO: Add your code here

import requests

endpoint = "http://localhost:8000/api/"

get_response = requests.post(endpoint, json={"title": "HelloHello"})

print(get_response.json())
