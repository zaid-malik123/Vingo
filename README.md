Vingo — Frontend & Backend (React + Vite)

Vingo is a modern, responsive, and feature-rich ride-sharing application. Built with React and Vite, it seamlessly integrates with a backend for real-time tracking, authentication, and secure payments.

🚀 Features

Responsive UI — Works smoothly on both desktop and mobile devices.

Google One-Tap Login — Fast and secure login using Google OAuth.

Real-Time Map & Tracking — Integrated with Google Maps and Socket.IO.

Razorpay Payments — Secure payment processing for ride bookings.

Cart & Order History — Manage rides, checkout, and view booking history.

Password Reset via OTP — Securely reset passwords via email OTP.

🛠️ Technologies Used

Frontend: React.js, Vite, Axios

Authentication: Google One-Tap

Real-Time Communication: Socket.IO

Payment Gateway: Razorpay

Styling & UI: Tailwind CSS / Custom Components

⚙️ Installation & Setup
Prerequisites

Node.js v14+

NPM or Yarn

Frontend Setup

Clone the repository

git clone https://github.com/zaid-malik123/Vingo.git
cd frontend


Install dependencies

npm install


Configure Environment Variables

Create a .env file in the frontend directory:

VITE_FIREBASE_API_KEY=""
VITE_GEOPIFY_API_KEY=""
VITE_GEOCODING_API_KEY=""
VITE_RAZORPAY_KEY_ID=""


Note: Keep this file secret. Do not commit .env to GitHub.

Start the development server

npm run dev


Your frontend will be available at: http://localhost:5173

Backend Setup

Navigate to the backend folder

cd backend


Install dependencies

npm install


Configure Environment Variables
Create a .env file in the backend directory:

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


Start the backend server

npm run start

🔗 Links

GitHub Repository: https://github.com/zaid-malik123/Vingo

Live Demo: https://vingo-vv4n.onrender.com