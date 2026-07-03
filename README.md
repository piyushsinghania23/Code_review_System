# Code Review System

A **Code Review System** designed to streamline the process of submitting, reviewing, commenting, and approving code changes within a development team. This project helps improve code quality, collaboration, and accountability by providing a structured review workflow.

---

## 🚀 Features

* 🔐 User Authentication (Developer / Reviewer / Admin)
* 📤 Code Submission with version tracking
* 💬 Inline Comments & Feedback on code
* ✅ Approve / Request Changes workflow
* 🕒 Review History & Status Tracking
* 🔔 Notifications for updates and reviews
* 📊 Dashboard for review progress

---

## 🛠️ Tech Stack

> (Update this section according to your project)

* **Frontend:** HTML, CSS, JavaScript / React
* **Backend:** Node.js / Java / Python (Flask/Django)
* **Database:** MySQL / PostgreSQL / MongoDB
* **Authentication:** JWT / Session-based Auth
* **Version Control:** Git & GitHub

---

## 📂 Project Structure

```bash
code-review-system/
│
├── frontend/        # UI components
├── backend/         # APIs and business logic
├── database/        # Database schemas / migrations
├── docs/            # Project documentation
├── tests/           # Unit and integration tests
└── README.md        # Project overview
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/code-review-system.git
cd code-review-system
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install   # or pip install -r requirements.txt
npm start     # or python app.py
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🧪 Testing

Run automated tests using:

```bash
npm test
```

or

```bash
pytest
```

---

## 📸 Screenshots (Optional)

Add screenshots or GIFs to demonstrate the workflow of the system.

---

## 🧠 Use Cases

* Academic projects (Software Engineering / DBMS)
* Internal team code review process
* Learning collaborative development practices

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Piyush Kumar**
Aspiring Software Engineer


---

## ⭐ Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

## Vercel Deployment (Frontend + Backend on Vercel)

This repository is configured to deploy both frontend and backend in one Vercel project:
- Frontend static app is built from `Frontend/`
- Backend API is served by `api/get-review.js`

### Steps

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Keep the project root as repository root (do not set root to `Frontend`).
4. In Vercel Project Settings -> Environment Variables add:
   - `GOOGLE_GEMINI_KEY=your_real_key`
   - optional: `GEMINI_MODEL=gemini-2.5-flash`
5. Deploy.

### API and Frontend URLs

- Frontend live URL: `https://your-project.vercel.app`
- API endpoint: `https://your-project.vercel.app/api/get-review`

### Local vs Production behavior

- Local dev (`npm run dev`): frontend calls `/ai/get-review` through Vite proxy to `http://localhost:3000`.
- Production (Vercel): frontend calls same-domain `/api/get-review`.
