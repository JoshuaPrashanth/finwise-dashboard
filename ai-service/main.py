from fastapi import FastAPI
from datetime import datetime

app = FastAPI(title="AI Financial Insights Service", version="1.0.0")

@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-service", "timestamp": datetime.now().isoformat()}

@app.get("/")
def root():
    return {"message": "AI Service for Financial Management System"}