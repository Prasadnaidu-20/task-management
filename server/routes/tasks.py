from fastapi import APIRouter
from fastapi import HTTPException
from models import Task
from database import tasks_collection
from datetime import date
from bson import ObjectId

router = APIRouter()

def serialize_task(task):
    return {
        "_id": str(task["_id"]),
        "title": task["title"],
        "category": task.get("category"),
        "priority": task.get("priority"),
        "dueDate": task.get("dueDate"),
        "date": task.get("date"),
        "completed": task.get("completed", False)
    }

@router.get("/tasks/{task_id}")
def get_Task(task_id: str):
    task = tasks_collection.find_one({"_id": ObjectId(task_id)})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return serialize_task(task) 

@router.get("/tasks")
def get_allTasks():
    tasks = tasks_collection.find()  # ✅ fetch all documents
    return [serialize_task(task) for task in tasks]

@router.post("/tasks/addTask")
def add_task(task: Task):
    task.date = str(date.today())
    task_data = task.dict()
    result = tasks_collection.insert_one(task_data)
    task_data["_id"] = str(result.inserted_id)
    return {"message": "Task added successfully","task": task_data}

@router.patch("/tasks/{task_id}")
def update_task(task_id: str, completed: bool):
    tasks_collection.update_one({"_id": ObjectId(task_id)}, {"$set": {"completed": completed}})
    return {"message": "Task updated"}

@router.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    tasks_collection.delete_one({"_id": ObjectId(task_id)})
    return {"message": "Task deleted"}
