from fastapi import APIRouter
from models import Task
from database import tasks_collection
from datetime import date
from bson import ObjectId

router = APIRouter()

def serialize_task(task):
    return {
        "_id": str(task["_id"]),
        "title": task["title"],
        "date": task["date"],
        "completed": task["completed"]
    }

@router.get("/tasks/today")
def get_today_tasks():
    today = str(date.today())
    tasks = tasks_collection.find({"date": today})
    return [serialize_task(task) for task in tasks]

@router.get("/tasks/history")
def get_history():
    today = str(date.today())
    tasks = tasks_collection.find({"date": {"$ne": today}})
    return [serialize_task(task) for task in tasks]

@router.post("/tasks")
def add_task(task: Task):
    task.date = str(date.today())
    tasks_collection.insert_one(task.dict())
    return {"message": "Task added successfully"}

@router.patch("/tasks/{task_id}")
def update_task(task_id: str, completed: bool):
    tasks_collection.update_one({"_id": ObjectId(task_id)}, {"$set": {"completed": completed}})
    return {"message": "Task updated"}

@router.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    tasks_collection.delete_one({"_id": ObjectId(task_id)})
    return {"message": "Task deleted"}
