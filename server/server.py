from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

from api.db_utils import *

app = Flask(__name__) # Create Flask instance
CORS(app) # Enable CORS on Flask server to work with Nodejs pages
api = Api(app) # Api Router


if __name__ == '__main__':
    print("Loading Database.");
    
    exec_sql_file(''); # TODO: Replace With Database .sql File.
    print("Starting Flask.");
    
    app.run(debug=True), 
