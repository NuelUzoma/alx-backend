#!/usr/bin/env python3
"""Create a class FIFOCache that inherits from BaseCaching
and is a caching system"""
from collections import OrderedDict

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """The class for FIFO cache"""
    def __init__(self):
        """Initialazation"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Inputs an item in the cache"""
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key, _ = self.cache_data.popitem(False)
            print("DISCARD:", first_key)

    def get(self, key):
        """Retrieves an item by key"""
        return self.cache_data.get(key, None)
