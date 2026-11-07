"""
FastAPI Server for ASTRO AI Space Exploration Copilot.
NASA Space Apps Challenge 2026 — 'Abandoned but Not Forgotten'.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import os

from rag_engine import rag_engine

app = FastAPI(
    title="ASTRO Copilot API — Abandoned but Not Forgotten",
    description="Context-Aware RAG API grounded in NASA Mission Archives",
    version="1.0.0"
)

# Enable CORS for local Vite dev & preview server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]
    model: str

class SearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 3

@app.get("/api/health")
def health_check():
    gemini_key_present = bool(os.getenv("GEMINI_API_KEY"))
    return {
        "status": "healthy",
        "service": "ASTRO AI Copilot",
        "rag_engine": "online",
        "gemini_api_configured": gemini_key_present,
        "mode": "Live Gemini RAG" if gemini_key_present else "Verified NASA Archive Engine"
    }

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    result = rag_engine.answer_query(req.query, req.context)
    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"],
        model=result["model"]
    )

@app.post("/api/search")
def search_endpoint(req: SearchRequest):
    docs = rag_engine.search(req.query, top_k=req.top_k or 3)
    return {
        "query": req.query,
        "results": [
            {
                "id": d.doc_id,
                "title": d.title,
                "category": d.category,
                "content": d.content,
                "source": d.source,
                "metadata": d.metadata,
            }
            for d in docs
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

