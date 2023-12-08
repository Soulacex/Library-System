from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse
import json
from flask import *
from .db_utils import *

class Books(Resource):
    def get(self):
        result = exec_get_all("SELECT * FROM books ORDER BY ID ASC")
        return result
    