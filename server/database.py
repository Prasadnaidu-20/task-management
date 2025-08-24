from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
db = client["task_manager"]
tasks_collection = db["tasks"]
users_collection = db["auth"] 

