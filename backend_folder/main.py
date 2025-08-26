from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("ALLOWED_URL", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "This is Get Request from python backend"}

@app.post("/", response_model=dict)
def create_item(item: dict):
    return {"message": f"This is Post Request from python backend and here is response {item}"}