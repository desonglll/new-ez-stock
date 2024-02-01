# -*- coding: utf-8 -*-
"""
File: delete
Description: 
Author: mikeshinoda
Date: 2024/1/19
"""

# TODO: Add your code here
import requests

product_id = input("what is the product id you want to delete")
try:
    product_id = int(product_id)
except:
    print(f'{product_id} is not a valid id')

if product_id:
    endpoint = f"http://localhost:8000/api/products/{product_id}/delete/"
    get_response = requests.delete(endpoint)
    print(get_response.status_code, get_response.status_code == 204)
