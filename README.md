# MEDUSA-X — Agentic Clinical Intelligence & Medical Reconciliation Platform

> **"One Patient. Multiple Records. One Evidence-Backed Clinical Story."**
>
> **THE CLINICAL RECORD THAT CANNOT BE TRUSTED.**

MEDUSA-X is an agentic clinical intelligence web platform that ingests fragmented clinical records (Synthea FHIR R4 bundles, PDFs, DOCX, TXT, CSV, JSON, and scanned images), reconstructs a unified longitudinal patient history, detects cross-source contradictions and missing information, verifies findings against verbatim source excerpts, prioritizes patient-safety risks, and routes unresolved discrepancies to authorized clinicians with full auditability and PDF reconciliation reporting.

---

## Core Architecture

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, React Hook Form + Zod, Recharts, Lucide React
- **Backend:** FastAPI, Pydantic v2, SQLAlchemy 2, Alembic, ReportLab, PyMuPDF, python-docx, RapidOCR / Tesseract OCR
- **Database:** PostgreSQL (+ `pgvector` via Docker Compose) or local SQLite (`sqlite:///./medusax.db`) for zero-setup development
- **Agentic AI & Orchestration:** LangGraph 9-Agent Pipeline (`DocumentIntelligenceAgent` → `PatientReconstructionAgent` → `TimelineIntelligenceAgent` → `DiagnosisReconciliationAgent` → `MedicationReconciliationAgent` → `AllergyReconciliationAgent` → `MissingInformationAgent` → `EvidenceVerificationAgent` → `SafetyAndEscalationAgent`)
- **AI Provider Abstraction:** Supports `openai` / `openai_compatible` JSON-validated calls gated by synthetic-data safeguards, plus a clearly labelled `deterministic_fallback` clinical NLP engine when no external API key is configured.

---

## Quick Start (Local Development)

### 1. Environment Configuration
Copy `.env.example` to `.env` at the project root and adjust if needed:
- Default local DB: `DATABASE_URL=sqlite:///./medusax.db`
- Default AI provider: `AI_PROVIDER=deterministic_fallback`
- Optional LLM: set `AI_PROVIDER=openai` and `AI_API_KEY=<your-key>`

### 2. Backend Setup & Startup
```powershell
cd C:\Users\santh\.gemini\antigravity\scratch\medusa-x\backend
..\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
OpenAPI docs: `http://127.0.0.1:8000/docs`

### 3. Frontend Setup & Startup
```powershell
$env:PATH = "C:\Users\santh\.gemini\antigravity\scratch\medusa-x\.tools\node;" + $env:PATH
cd C:\Users\santh\.gemini\antigravity\scratch\medusa-x\frontend
npm run dev
```
Web UI: `http://localhost:5173`

### 4. Demo Accounts
- **Clinician:** `clinician@medusax.demo` / `MedusaDemo2026!`
- **Clinical Reviewer:** `reviewer@medusax.demo` / `MedusaDemo2026!`
- **Administrator:** `admin@medusax.demo` / `MedusaAdmin2026!`
- **Read-Only Observer:** `observer@medusax.demo` / `MedusaDemo2026!`

### 5. Load Synthea FHIR R4 & Conflict Evaluation Dataset
- Via UI: Sign in and click **Load Demo Data (Synthea + Conflicts)** on the Overview dashboard (or in Settings).
- Via CLI:
```powershell
cd C:\Users\santh\.gemini\antigravity\scratch\medusa-x\backend
..\.venv\Scripts\python.exe scripts/run_evaluation.py
```

### 6. Run Automated Test Suite
```powershell
cd C:\Users\santh\.gemini\antigravity\scratch\medusa-x\backend
..\.venv\Scripts\pytest.exe -v tests/test_medusax.py
```

---

## Docker Deployment (PostgreSQL + pgvector + Backend + Frontend)
```bash
docker compose up --build -d
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/HACKATHON_DEMO_GUIDE.md](docs/HACKATHON_DEMO_GUIDE.md), and [docs/EVALUATION_REPORT.md](docs/EVALUATION_REPORT.md) for detailed guides and observed benchmark results.
