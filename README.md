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

## Vercel Deployment (Frontend Only)

Deploy the React frontend on Vercel and host backend separately (Render/Railway).

1. Import this GitHub repository in Vercel.
2. In Project Settings set:
   - Root Directory: `Frontend`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. In Vercel Environment Variables add:
   - `VITE_API_URL=https://your-backend-domain`
4. Redeploy.

Notes:
- Local development uses `POST /ai/get-review` through Vite proxy.
- Production frontend calls `${VITE_API_URL}/ai/get-review`.
- Backend host must have a valid `GOOGLE_GEMINI_KEY`.
