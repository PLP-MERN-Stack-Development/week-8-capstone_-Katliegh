# 🎓 UniMate

UniMate is a full-stack MERN web application designed to support university students and tutors. It offers:

- 📚 **Tutoring Listings** – Post or find tutoring help.
- 🛍️ **Textbook Marketplace** – Buy or sell used textbooks.
- 🧾 **Study Resource Sharing** – Upload/download helpful documents.
- 👥 **User Authentication** – Register as a student or tutor.
- 💬 **Real-time Chat** (via Socket.io).
- ☁️ **Deployed on**: Render (backend) & Netlify (frontend)

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- React Router
- Axios
- Netlify (deployment)

**Backend:**
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- Multer (file uploads)
- Socket.io (chat)
- Render (deployment)

---

## 📁 Features

### ✅ Students
- View tutoring offers
- Browse and search textbooks
- Download study resources
- Chat with tutors
- Register/login securely

### ✅ Tutors
- Post tutoring services
- Upload study materials
- Manage personal listings
- Receive messages from students

---

## 🚀 Live Demo

- Frontend: [https://your-netlify-app.netlify.app](https://unimatek.netlify.app/)
- Backend API: [https://your-backend.onrender.com/api](https://week-8-capstone-katliegh.onrender.com/api)
---
## Pitchdeck Link
(https://www.canva.com/design/DAGk11-7cYg/B2mK4m72H7Qs6fgSBtjQXw/view?utm_content=DAGk11-7cYg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h93804ada74)
---
## 🧪 API Endpoints
**Auth**
POST /api/auth/register
POST /api/auth/login

**Tutoring**
GET /api/tutoring
POST /api/tutoring (protected)
GET /api/tutoring/mine (protected)

**Resources**
GET /api/resources
POST /api/resources (with file upload)

**Textbooks**
GET /api/textbooks
POST /api/textbooks (protected)

## ⚙️ Deployment
**Backend on Render**
Push unimate-backend to GitHub.
Go to Render, create a new Web Service.
Set environment variables (.env).
Add build command: npm install
Add start command: npm run dev or node server.js

**Frontend on Netlify**
Push unimate-frontend to GitHub.
Go to Netlify, link the repo.
Set REACT_APP_API_URL as an environment variable.
Build command: npm run build
Publish directory: build


## 📫 Contact
Gmail: Katlegokatzu@gmail.com

## Developer
**Katlego Lesetedi**
