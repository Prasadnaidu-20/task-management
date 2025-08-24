from fastapi import FastAPI
from routes import tasks
from routes import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(tasks.router)
app.include_router(auth.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def home():
    return {"message": "Advanced Task Manager API"}
