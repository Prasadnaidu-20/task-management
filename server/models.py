from pydantic import BaseModel
from typing import Optional
from datetime import date

class Task(BaseModel):
    # title: str
    # duedate: Optional[str] = str(date.today())
    # completed: bool = False
    title: str
    category: Optional[str] = None
    priority: Optional[str] = None
    dueDate: Optional[str] = None
    date: Optional[str] = str(date.today())
    completed: bool = False

class User(BaseModel):
    name: str
    email: str
    password: str