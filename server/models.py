from pydantic import BaseModel
from typing import Optional
from datetime import date

class Task(BaseModel):
    title: str
    date: Optional[str] = str(date.today())
    completed: bool = False

class User(BaseModel):
    email: str
    password: str