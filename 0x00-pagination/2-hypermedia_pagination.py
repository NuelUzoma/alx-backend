#!/usr/bin/env python3
"""Implement a method named get_page that takes two integer arguments page
with default value 1 and page_size with default value 10.
Implement a get_hyper method that takes the same arguments (and defaults)
as get_page and returns a dictionary
containing the following key-value pairs"""


import csv
import math
from typing import List, Dict
index_range = __import__('0-simple_helper_function').index_range


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """The function to be edited"""
        assert isinstance(page, int) and page > 0, "Page > 0"
        assert isinstance(page_size, int) and page_size > 0, "Page size > 0"
        dataset = self.dataset()
        start_index, end_index = index_range(
                page=page,
                page_size=page_size
                )
        if start_index >= len(dataset):
            return []
        return dataset[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, any]:
        """The get_hyper function with default args as get_page"""
        assert isinstance(page, int) and page > 0, "Page > 0"
        assert isinstance(page_size, int) and page_size > 0, "Page size > 0"
        dataset = self.dataset()
        total_pages = math.ceil(len(dataset) / page_size)

        if page > total_pages:
            return {
                'page_size': 0,
                'page': page,
                'data': [],
                'next_page': None,
                'prev_page': total_pages,
                'total_pages': total_pages
            }
        data = self.get_page(page=page, page_size=page_size)
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages
        }
