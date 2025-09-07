from fastapi import APIRouter, HTTPException, Depends
from models import User
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from datetime import datetime, timedelta
from database import users_collection  # create users collection in db.py
import os

router = APIRouter()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT secret
SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
ALGORITHM = "HS256"

# new_user = {
#     "username": User.username,
#     "password": pwd_context.hash(user.password)  # ✅ hashed before saving
# }

# users_collection.insert_one(new_user)
# print("User inserted successfully!")


# Signup
@router.post("/signup")
def signup(user: User):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_pw = pwd_context.hash(user.password)
    users_collection.insert_one({"name":user.name,  "email": user.email, "password": hashed_pw})
    return {"message": "User created successfully"}

# Login
@router.post("/login")
def login(user: User):
    
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = jwt.encode(
        {"sub": user.email, "exp": datetime.utcnow() + timedelta(hours=12)},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    return {"access_token": token, "token_type": "bearer","name": str(db_user["name"]),"email": db_user["email"]}


@router.get("/users/{user_id}")
def get_user(user_id: str):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"error": "User not found"}
    return {"_id": str(user["_id"]), "name": user["name"], "email": user["email"]}

