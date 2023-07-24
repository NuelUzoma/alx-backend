#!/usr/bin/env python3
"""Implement a method named get_page that takes two integer arguments page
with default value 1 and page_size with default value 10.
You have to use this CSV file
Use assert to verify that both arguments are integers greater than 0.
Use index_range to find the correct indexes to paginate the dataset"""


import csv
import math
from typing import List
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
        assert isinstance(page, int) and page > 0, "Page should be a positive integer"
        assert isinstance(page_size, int) and page_size > 0, "Page size should be a positive integer"
        dataset = self.dataset()
        start_index, end_index = index_range(
                page=page,
                page_size=page_size
                )
        if start_index >= len(dataset):
            return []
        return dataset[start_index:end_index]
