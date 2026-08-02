from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.registrations import router


app = FastAPI(
    title="BLAST 2026 API",
    version="2.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


@app.get("/")
def home():
    return {
        "message":"BLAST 2026 API running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status":"ok"
    }