# -*- coding: utf-8 -*-
"""
File: update
Description: 
Author: mikeshinoda
Date: 2024/1/19
"""

# TODO: Add your code here
import requests

endpoint = "http://localhost:8000/api/products/1/update/"

data = {
    "title": "Hello New Data",
    "price": 129.99
}

get_response = requests.put(endpoint, json=data)
print(get_response.json())
