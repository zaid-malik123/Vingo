<h1 align="center">🚖 Vingo — Food Delivery App</h1>

<p align="center">
  <b>Vingo is a modern, responsive, and feature-rich food delivery platform that allows users to browse restaurants, place orders, track deliveries in real-time, and pay securely. Built with React, Vite, and Node.js, Vingo provides a seamless experience for both customers and restaurants.</b><br/>
  Seamlessly integrates real-time tracking, secure payments, and Google authentication.
</p>

---

## ✨ Features

- 📱 **Responsive UI** — Optimized for both desktop and mobile devices  
- 🔐 **Google One-Tap Login** — Fast and secure authentication via Google OAuth  
- 🗺️ **Real-Time Map & Tracking** — Integrated with Google Maps and Socket.IO  
- 💳 **Razorpay Payments** — Secure and smooth payment flow for ride bookings  
- 🧾 **Cart & Order History** — Manage rides, checkout, and track your booking history  
- 🔄 **Password Reset via OTP** — Reset your password securely using email-based OTP  

---

## 🧩 Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | React.js, Vite, Axios |
| **Styling** | Tailwind CSS, Custom Components |
| **Authentication** | Google One-Tap |
| **Real-Time Communication** | Socket.IO |
| **Payment Gateway** | Razorpay |
| **Backend** | Node.js, Express, MongoDB |

---

## ⚙️ Installation & Setup

### 🪄 Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- NPM or Yarn package manager

---

### 🖥️ Frontend Setup

```bash
# Clone the repository
git clone https://github.com/zaid-malik123/Vingo.git
cd frontend

# Install dependencies
npm install

🔧 Environment Variables

Create a .env file inside the frontend directory and add the following:

VITE_FIREBASE_API_KEY=""
VITE_GEOPIFY_API_KEY=""
VITE_GEOCODING_API_KEY=""
VITE_RAZORPAY_KEY_ID=""


⚠️ Note: Keep this file secret. Never commit .env files to GitHub.

▶️ Start the Development Server
npm run dev


Your frontend will be available at:
👉 http://localhost:5173

🧠 Backend Setup
# Navigate to backend folder
cd backend

# Install dependencies
npm install

🔧 Environment Variables

Create a .env file inside the backend directory and add the following:

PORT=3000
DB_URI=""
JWT_SECRET=""
APP_PASSWORD=""
EMAIL=""
IMAGE_KIT_PUBLIC_KEY=""
IMAGE_KIT_PRIVATE_KEY=""
URL_END_POINT=""
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""

▶️ Start the Backend Server
npm run start


Your backend will be available at:
👉 http://localhost:3000

🔗 Links

🧑‍💻 GitHub Repository: https://github.com/zaid-malik123/Vingo

🌐 Live Demo: https://vingo-vv4n.onrender.com

❤️ Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

📜 License

This project is licensed under the MIT License — see the LICENSE
 file for details.


---

Would you like me to make it **dark-mode preview ready** (with badges, tech icons, and screenshots section)?  
It’ll look like a top-tier GitHub project page.