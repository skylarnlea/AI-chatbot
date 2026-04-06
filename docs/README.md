# Number1Portal AI Assistant

An internal employee-facing AI chatbot built as a proof-of-concept for integration into **Number1Portal** — the company's internal employee portal. The assistant is designed to reduce the volume of HR and IT support tickets by allowing employees to ask natural language questions and get instant, accurate answers sourced directly from company documentation.

---

## What It Does

Employees open the chat interface and ask questions about anything covered in company policy — benefits, PTO, remote work, expense reimbursement, code of conduct, IT support, and more. The assistant searches a knowledge base of company documents and returns a conversational answer, along with citations showing which policy document the response came from.

Chat history is persisted locally so employees can pick up previous conversations at any time.

---

## How It Works

```
Employee asks a question
        │
        ▼
Next.js API Route (/api/chat)
        │
        ▼
Knowledge base search (keyword scoring → simulates vector similarity)
        │
        ▼
Contextual response generated with policy citations
        │
        ▼
Response + source badges returned to the UI
```

**Current state (MVP / mock):** The knowledge base is a local in-memory store (`mockKnowledge.ts`) that simulates a RAG retrieval step using keyword scoring. This is intentionally a stand-in for a production Vertex AI RAG pipeline — see [Planned Integrations](#planned-integrations) below.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Full-stack React framework — handles both the frontend UI and the `/api/chat` backend route in a single deployable unit. No separate server needed. |
| Language | **TypeScript** | Type safety across the full stack. Shared `types/chat.ts` interfaces are used by both the API and the UI. |
| Styling | **Tailwind CSS** | Utility-first CSS keeps styling co-located with components and makes rapid iteration easy without a design system overhead. |
| State / Persistence | **React Hooks + localStorage** | Lightweight session management without a database. `useChat` manages in-flight messages; `chatStorage.ts` persists history to `localStorage`. |
| AI Platform | **Google Cloud Vertex AI** (`@google-cloud/aiplatform`) | GCP-native, enterprise-grade AI with native RAG support via Vertex AI Search. Aligns with the existing GCP infrastructure. |
| Containerization | **Docker** (multi-stage build) | Keeps the production image lean. Builder stage compiles Next.js; runner stage serves it with only production dependencies. |
| CI/CD & Hosting | **Google Cloud Build + Cloud Run** | Fully managed, serverless container hosting. `cloudbuild.yaml` automates build → push → deploy on every commit with zero infrastructure management. |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Root page — mounts ChatInterface
│   ├── layout.tsx                # Global HTML layout and metadata
│   ├── globals.css               # Base Tailwind styles
│   └── api/
│       └── chat/
│           └── route.ts          # POST /api/chat — core AI response logic
│
├── components/
│   ├── ChatInterface.tsx          # Top-level stateful chat orchestrator
│   ├── chat/
│   │   ├── ChatHeader.tsx         # App title bar and new chat / history controls
│   │   ├── ChatInput.tsx          # Message input with send button
│   │   ├── MessageBubble.tsx      # Individual user / bot message rendering
│   │   ├── LoadingMessage.tsx     # Animated typing indicator
│   │   └── PolicySourceBadge.tsx  # Badge showing which policy doc was cited
│   ├── history/
│   │   ├── ChatHistory.tsx        # Sidebar listing past conversations
│   │   ├── HistoryItem.tsx        # Single history entry row
│   │   └── EmptyHistory.tsx       # Empty state for history panel
│   └── welcome/
│       ├── WelcomeScreen.tsx      # Landing state shown before first message
│       ├── QuickActions.tsx       # Pre-built prompt buttons
│       ├── SampleQuestions.tsx    # Example questions to guide new users
│       └── TopicBadges.tsx        # Filterable topic chips
│
├── hooks/
│   ├── useChat.ts                 # Sends messages to /api/chat, manages message state
│   ├── useChatHistory.ts          # Reads/writes chat sessions from localStorage
│   └── useNotification.ts         # UI notification helper for policy source alerts
│
├── lib/
│   ├── mockKnowledge.ts           # In-memory policy documents + keyword search (RAG placeholder)
│   └── chatStorage.ts             # localStorage CRUD for ChatSession objects
│
├── styles/
│   └── colors.ts                  # Centralized color tokens
│
├── types/
│   └── chat.ts                    # Shared TypeScript interfaces (Message, ChatSession, PolicySource, etc.)
│
└── utils/
    ├── chatHelpers.ts             # Message factory functions, ID generation, validation
    └── dateFormatters.ts          # Timestamp display utilities
```

---

## Running Locally

**Prerequisites:** Node.js 20+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other useful scripts:

```bash
npm run build        # Production build
npm run start        # Serve production build locally
npm run type-check   # TypeScript check (no emit)
npm run lint         # ESLint
npm run clean        # Nuke node_modules and reinstall
```

---

## Deployment

The app is containerized and deployed to **Google Cloud Run** via **Cloud Build**.

```bash
# Trigger a manual build and deploy
gcloud builds submit --config cloudbuild.yaml
```

`cloudbuild.yaml` does three things in sequence:
1. Builds the Docker image and tags it in Container Registry (`gcr.io/$PROJECT_ID/cheil-ai-chatbot`)
2. Pushes the image to GCR
3. Deploys to Cloud Run in `us-central1`

The Next.js server listens on port **8080** to match Cloud Run's default expected port.

---

## Planned Integrations

This MVP was built to validate the UI/UX and API contract. The following are scoped for the production version:

### Vertex AI RAG Pipeline
Replace `mockKnowledge.ts` with a real retrieval-augmented generation pipeline:

1. **GCS Bucket** — Company HR documents (employee handbook, benefits guide, IT policies, etc.) are uploaded to a private Cloud Storage bucket.
2. **Vertex AI Search / Matching Engine** — Documents are chunked, embedded, and indexed. When a query comes in, semantically similar chunks are retrieved.
3. **Gemini (via Vertex AI)** — Retrieved chunks are injected as context into a Gemini prompt, which synthesizes a grounded, cited response.
4. **API Route update** — `route.ts` calls the Vertex AI SDK (`@google-cloud/aiplatform` is already included as a dependency) instead of the local mock search function.

### Number1Portal Embedding
- Embed the chatbot as a widget or dedicated route inside Number1Portal.
- Leverage the portal's existing auth session to identify the employee — no separate login required.
- Role-based responses: surface only the policy documents relevant to the employee's department or employment type.

### Server-Side Conversation History
- Move session storage from `localStorage` to a server-side store (Firestore or Cloud SQL) so history persists across devices and survives browser clears.

### Admin / Knowledge Management UI
- Internal interface for HR and IT to upload new documents to the GCS bucket and trigger re-indexing without engineering involvement.

---

## Notes for Future Developers

- **`mockKnowledge.ts` is not production code.** It exists solely to keep the UI functional during development. Replace the `searchPolicies` call in `route.ts` with your Vertex AI retrieval logic when going to production.
- **No secrets committed.** When wiring up Vertex AI, use GCP Workload Identity on Cloud Run and Application Default Credentials locally. Never hardcode service account keys.
- **`PolicySource` is already wired end-to-end.** The type flows from the API route through `useChat` all the way to `PolicySourceBadge`. Returning real sources from Vertex AI will surface automatically in the UI with no frontend changes needed.
