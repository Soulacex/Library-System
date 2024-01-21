from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse
from flask import *
from .db_utils import *

class Books(Resource):
    def get(self):
        result = exec_get_all("SELECT * FROM books ORDER BY ID ASC")
        return result
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title')
        parser.add_argument('author')
        args = parser.parse_args()
        
        sql = "INSERT INTO books (title, author) VALUES (%s, %s)"
        result = exec_commit(sql, (args['title'], args['author']))
        
        return result

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ID')
        parser.add_argument('title')
        parser.add_argument('author')
        args = parser.parse_args()
        
        sql = "UPDATE books SET title=%s, author=%s WHERE ID=%s"
        result = exec_commit(sql, (args['title'], args['author'], args['ID']))
        
        return result
    
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ID')
        args = parser.parse_args()
        
        sql = "DELETE FROM books WHERE ID=%s"
        result = exec_commit(sql, (args['ID'],))
        
        return result