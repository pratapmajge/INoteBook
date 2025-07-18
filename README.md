# 📝 INotebook — Cloud Notes App

A secure and modern **MERN stack** notes application that allows you to create, edit, and manage your notes online. Built with authentication, REST APIs, and a responsive UI.

---

## 🚀 Key Features

- 🔐 **Authentication:** Secure login/signup using JWT & bcrypt  
- 📝 **Full CRUD:** Create, read, update, and delete notes  
- 🔍 **Search & Filter:** Quickly find notes by title or content  
- 🌐 **Responsive UI:** Optimized for all devices  
- 🗄️ **RESTful Backend:** Express.js with MongoDB integration  
- ⚡ **Scalable Architecture:** Built for real-world usage  

---

## 🛠 Tech Stack

- **Frontend:** React, React Router, Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT and bcrypt  

---

## 🧩 Getting Started (Local Setup)

```bash
# 1. Clone the repository
git clone https://github.com/pratapmajge/INotebook.git
cd INotebook

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Configure environment variables
# Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000

# 4. Run backend
cd backend && npm run dev

# 5. Run frontend
cd ../frontend && npm start
