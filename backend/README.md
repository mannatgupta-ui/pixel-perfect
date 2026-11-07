# ASTRO AI Copilot — FastAPI & RAG Backend
### NASA Space Apps Challenge 2026: Abandoned but Not Forgotten

This Python FastAPI service powers **ASTRO**, the intelligent space exploration companion for humanity's forgotten space explorers.

---

## Architecture Overview

```
User Question
    ↓
Context Extraction (Planet, Mission, Artifact, Component, Story Stage)
    ↓
NASA Mission Archives RAG Retrieval (JPL, NSSDCA, NASA Science)
    ↓
Contextual Prompt Synthesis & Vector Scoring
    ↓
LLM Generation (Gemini 1.5 Flash via google-generativeai or Grounded Archive Engine)
    ↓
Answer with Citations & Sources
```

---

## Quickstart

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment (Optional)
To enable live Gemini generative AI responses, set your API key:
```bash
# Windows PowerShell:
$env:GEMINI_API_KEY="your-gemini-api-key"

# Linux/macOS:
export GEMINI_API_KEY="your-gemini-api-key"
```
*Note: If no API key is set, the server runs in authentic Grounded NASA Archive mode, delivering exact historical facts with citations.*

### 3. Run Server
```bash
python main.py
```
Or with uvicorn directly:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

## API Endpoints

- `GET /api/health`: Health status and active AI model.
- `POST /api/chat`: Context-aware conversational endpoint.
  ```json
  {
    "query": "What does the Rock Abrasion Tool do?",
    "context": {
      "selected_artifact": "Spirit Rover",
      "selected_component": "Rock Abrasion Tool",
      "selected_planet": "Mars"
    }
  }
  ```
- `POST /api/search`: Direct semantic search across NASA documents.

