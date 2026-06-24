# SmartClinic Queue Management System

A real-time patient queue management system designed for clinics and healthcare centers. The application allows receptionists to manage patient queues efficiently while displaying live queue updates in the waiting room.

---

## Features

### Receptionist Dashboard
- Add new patients to the queue
- Call next patient
- Mark current patient as completed
- Clear entire queue
- Configure clinic settings
- Live queue statistics
- Real-time updates using Socket.IO

### Waiting Room Display
- Live queue updates
- Currently serving patient display
- Queue status overview
- Automatic synchronization
- Audio notifications for queue changes

### Backend
- REST API built with Express.js
- MongoDB database integration
- Real-time communication via Socket.IO
- Queue management logic
- Settings management

---

## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- Socket.IO Client
- Tailwind CSS
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- CORS
- Dotenv

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

```
SmartClinic-Queue/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Receptionist.jsx
│   │   │   ├── WaitingRoom.jsx
│   │   │   └── Home.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── socket.js
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Patient.js
│   │   └── Setting.js
│   │
│   ├── routes/
│   │   ├── patientRoutes.js
│   │   └── settingRoutes.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/smartclinic-queue.git
cd smartclinic-queue
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```bash
npm run dev
```

Server starts at:

```
http://localhost:5000
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## API Endpoints

### Patients

#### Get All Patients

```http
GET /api/patients
```

#### Add Patient

```http
POST /api/patients
```

Body:

```json
{
  "name": "John Doe"
}
```

#### Call Next Patient

```http
PATCH /api/patients/call-next
```

#### Complete Current Patient

```http
PATCH /api/patients/complete-current
```

#### Clear Queue

```http
DELETE /api/patients/clear
```

---

### Settings

#### Get Settings

```http
GET /api/settings
```

#### Update Settings

```http
PATCH /api/settings
```

---

## Real-Time Events

### Socket.IO Events

#### Server Emits

```javascript
queueUpdated
settingsUpdated
```

#### Client Listens

```javascript
socket.on("queueUpdated");
socket.on("settingsUpdated");
```

---

## Deployment

### MongoDB Atlas

1. Create Atlas Cluster
2. Create Database User
3. Whitelist IP Address
4. Copy connection string

---

### Deploy Backend on Render

1. Create Web Service
2. Connect GitHub repository
3. Set Root Directory to:

```bash
backend
```

Environment Variables:

```env
MONGO_URI=your_mongodb_uri
```

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

---

### Deploy Frontend on Vercel

Environment Variable:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

Build Command:

```bash
npm run build
```

Output Directory:

```bash
dist
```

Redeploy project after adding environment variables.

---

## Screenshots

### Home Page

- Landing page for clinic users

### Receptionist Dashboard

- Manage queue
- View queue statistics
- Call patients
- Complete appointments

### Waiting Room Display

- Live queue updates
- Current serving patient
- Queue overview

---

## Future Improvements

- Patient token generation
- SMS notifications
- Multi-doctor support
- Appointment scheduling
- Authentication and role management
- Analytics dashboard
- Queue history reports

---

## Author

Barsha Mondal

---

## License

This project is licensed under the MIT License.
