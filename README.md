
# 📑 README for RAG_Frontend 
---
# 🧠 RAG-BOT - Fullstack Internship Assignment Submission

> Upload multiple PDFs, ask intelligent questions, and get precise answers using AI.  
> Powered by FastAPI, LangChain, React.js, Supabase, and Datastax Astra DB.

---

## 📚 Assignment Objective

Develop a **Fullstack RAG (Retrieval Augmented Generation)** Application where users can:
- Upload one or more PDF files 📄
- Ask natural language questions 🤔
- Receive AI-generated contextual answers 🧠

---

## 🛠️ Tools and Technologies Used

| Layer            | Technology  |
|------------------|--------------|
| **Frontend**     | React.js (Vite + TypeScript) |
| **Backend**      | FastAPI (Python) |
| **NLP Processing** | LangChain (LangGraph) |
| **AI Model**     | Meta-Llama 4 Maverick 17B |
| **Database**     | Supabase PostgreSQL |
| **Vector Store** | Datastax Astra VectorDB |
| **File Storage** | Local Filesystem (temporary) |

---

## 🔥 Live Demo

**Demo Video:** (Attach Loom or YouTube link here if available)

---

## 📂 Repositories

- **Frontend Repo** (this repo): [RAG_Frontend](https://github.com/Amon20044/RAG_Frontend)
- **Backend Repo**: [RAG_Backend](https://github.com/Amon20044/RAG_Backend)

---

## 🖥️ Frontend Setup (React.js)

### Prerequisites
- Node.js v18+
- npm / yarn

### Install and Run Locally

```bash
# Clone frontend repo
git clone https://github.com/Amon20044/RAG_Frontend.git
cd RAG_Frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
```

**Frontend running at**: `http://127.0.0.1:3000/`

---

## ⚙️ Backend Setup (FastAPI)

### Install and Run

```bash
# Clone backend repo
git clone https://github.com/Amon20044/RAG_Backend.git
cd RAG_Backend/server

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

**Backend running at**: `http://127.0.0.1:8080`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| POST | `/chat/{id}` | Upload multiple PDFs and a question to get AI answer |

---

## 🛎️ API Usage Example

**Request:**  
`POST http://127.0.0.1:8080/chat/{id}`

**Form Data**:
- `files[]`: Upload multiple PDF files
- `question`: Enter your natural language question

**Response**:
```json
{
  "question": "What are the key findings of this report?",
  "answer": "The key findings highlight major contributions across the project phases. Thanks for asking!"
}
```

---

## 📊 Architecture Diagram

```plaintext
[Frontend: React.js]
      ↓
[Backend: FastAPI (Python)]
      ↓
[Temporary File Upload]
      ↓
[LangChain Text Chunking]
      ↓
[Vector Embeddings (AstraDB)]
      ↓
[Question Answering via Llama4]
      ↓
[Answer Displayed on UI]
```

---

## 🎨 UI Design Reference

The frontend UI is based on the provided Figma design:  
🔗 [Figma Link](https://www.figma.com/file/QHpASp7wGRRcjh0oxCuspL/FullStack-Engineer-Internship-Assignment?type=design&node-id=0-1&mode=design&t=geu9rfpXEecN8eFZ-0)

- File upload page
- Chat interface for asking questions
- Loading spinners and error handling

---

## 📑 Assignment Requirements - Achieved ✅

| Requirement | Status |
|:---|:---|
| Upload PDF documents | ✅ |
| Store and process PDFs | ✅ |
| Ask questions based on uploaded PDFs | ✅ |
| Display generated answers | ✅ |
| Follow-up questions support | ✅ |
| Database integration (Supabase) | ✅ |
| Clean UI/UX Design (React.js) | ✅ |
| Fast response time (optimized chunking) | ✅ |
| Error handling and validations | ✅ |

---

## 🛡 Future Improvements

- Implement full JWT authentication
- Allow saving chat history per user
- Deploy frontend and backend to production (e.g., AWS / Railway)

---

## 🧑‍💻 Author

Built with ❤️ by [Amon Sharma](https://github.com/Amon20044)

---

## 🚀 Star the Repo if You Like It!

> "Learning every day. Building the future today."

---
