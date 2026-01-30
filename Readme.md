# 🚗 Smart Parking Allocation & Vehicle Management System

A comprehensive parking management system built with **React** and **Node.js** for a university Data Structures & Algorithms project.

## 🎯 Project Overview

This system demonstrates practical implementation of fundamental data structures:
- **Queue (FIFO)** - Parking request processing
- **Stack (LIFO)** - Rollback management
- **Arrays** - Zone and slot management
- **Linked List** - Parking history tracking

## 📋 Features

### User (Driver) Module
- ✅ Registration with strict validation
- ✅ Login authentication
- ✅ Request parking with vehicle ID and preferred zone
- ✅ Real-time allocation status monitoring
- ✅ Parking history tracking
- ✅ Cancel parking requests

### Admin Module
- ✅ Zone management dashboard
- ✅ Visual slot grid (10 slots per zone)
- ✅ Live request queue (FIFO visualization)
- ✅ Process parking allocations
- ✅ Rollback manager (LIFO stack)
- ✅ System analytics and insights

## 🛠️ Technology Stack

### Frontend
- React 18 (JavaScript only, `.jsx` files)
- Vite (build tool)
- Tailwind CSS v4
- React Toastify (notifications)
- Lucide React (icons)

### Backend
- Node.js + Express
- In-memory data structures (no database)
- RESTful API architecture

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Application

**Option 1: Start both frontend and backend together**
```bash
npm start
```

**Option 2: Start separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### Step 3: Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

## 🔐 Login Credentials

### Admin Access (Fixed)
- **Email:** admin@parking.com
- **Password:** Admin@123

### User Access
Register a new account with the following validation rules:
- **Name:** Min 3 characters, letters and spaces only
- **Email:** Valid email format
- **Password:** Min 8 characters with:
  - 1 uppercase letter
  - 1 lowercase letter
  - 1 number
  - 1 special character (@$!%*?&)

## 🏗️ System Architecture

### Data Structures Implementation

#### 1. Queue (FIFO) - Parking Requests
```javascript
class Queue {
  enqueue(data)    // Add request to rear
  dequeue()        // Remove request from front
  peek()           // View front request
  toArray()        // Get all requests
}
```

#### 2. Stack (LIFO) - Rollback History
```javascript
class Stack {
  push(item)       // Add allocation to top
  pop()            // Remove from top (rollback)
  peek()           // View top item
  toArray()        // Get all items
}
```

#### 3. Arrays - Zones & Slots
```javascript
zones = [
  { id: 'A', slots: [slot1, slot2, ...] },
  { id: 'B', slots: [slot1, slot2, ...] },
  { id: 'C', slots: [slot1, slot2, ...] }
]
```

#### 4. Linked List - Parking History
```javascript
class LinkedList {
  append(data)              // Add to history
  toArray()                 // Get all history
  getUserHistory(userId)    // Get user-specific history
}
```

## 🎨 Features Highlight

### Parking Allocation Logic
1. User submits request with vehicle ID and preferred zone
2. Request enters FIFO queue
3. Admin processes next request in queue
4. System tries preferred zone first
5. If full, allocates to another zone (cross-zone penalty marked)
6. Allocation pushed to rollback stack
7. Entry added to history linked list

### Rollback System
- LIFO (Last-In-First-Out) processing
- Rollback last K allocations
- Frees parking slots
- Removes from queue
- Allows vehicle ID reuse after rollback

### Validation Rules
- No duplicate vehicle IDs in same session
- After logout, vehicle IDs can be reused
- Email uniqueness enforced
- Password complexity requirements
- Form validation with error messages

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user/admin

### User Operations
- `POST /api/parking/request` - Submit parking request
- `GET /api/parking/status/:userId` - Get user status
- `POST /api/parking/cancel` - Cancel parking
- `GET /api/parking/history/:userId` - Get user history

### Admin Operations
- `GET /api/admin/zones` - Get all zones with stats
- `GET /api/admin/queue` - Get request queue
- `POST /api/admin/allocate` - Process next request
- `POST /api/admin/rollback` - Rollback allocations
- `GET /api/admin/rollback-stack` - Get rollback stack
- `GET /api/admin/analytics` - Get system analytics

## 🎓 DSA Concepts Demonstrated

### 1. Queue (FIFO)
- **Use Case:** Fair parking request processing
- **Operations:** Enqueue, Dequeue, Peek
- **Time Complexity:** O(1) for all operations

### 2. Stack (LIFO)
- **Use Case:** Undo recent allocations
- **Operations:** Push, Pop, Peek
- **Time Complexity:** O(1) for all operations

### 3. Arrays
- **Use Case:** Zone and slot management
- **Operations:** Direct access, iteration
- **Time Complexity:** O(1) for access, O(n) for search

### 4. Linked List
- **Use Case:** Dynamic history storage
- **Operations:** Append, traverse, filter
- **Time Complexity:** O(1) for append, O(n) for traversal

## 🎨 UI/UX Features

- ✅ Modern, colorful design (NOT sidebar-based)
- ✅ Gradient backgrounds and cards
- ✅ Smooth animations and transitions
- ✅ Real-time data updates
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Visual slot grid
- ✅ Color-coded zones
- ✅ Status badges
- ✅ Interactive forms

## 🚀 Running for Viva/Demo

1. Start the application: `npm start`
2. Login as admin to show admin features
3. Register a user account to demonstrate user flow
4. Submit parking requests as user
5. Process requests as admin (show Queue FIFO)
6. Demonstrate rollback feature (show Stack LIFO)
7. Show analytics dashboard
8. Explain data structures used

## 📝 Important Notes

- **No Database:** All data stored in memory (resets on server restart)
- **No Preloaded Data:** System starts empty
- **Fixed Zones:** Exactly 3 zones (A, B, C) with 10 slots each
- **Academic Purpose:** Designed for DSA project demonstration
- **Real Validation:** All forms have proper validation
- **Role-Based Access:** Admin and User have separate interfaces

## 🔍 Testing Scenarios

1. **User Registration:** Test validation rules
2. **Parking Request:** Submit requests, check queue order
3. **Allocation:** Process requests, verify FIFO order
4. **Cross-Zone:** Fill a zone, observe cross-zone allocation
5. **Cancellation:** Cancel request, check history
6. **Rollback:** Allocate multiple, rollback in LIFO order
7. **Analytics:** View system statistics

## 👨‍💻 Project Structure

```
smart-parking-system/
├── components/
│   ├── admin/
│   │   ├── Analytics.jsx
│   │   ├── LiveQueue.jsx
│   │   ├── RollbackManager.jsx
│   │   └── ZoneManagement.jsx
│   ├── user/
│   │   ├── AllocationStatus.jsx
│   │   ├── ParkingHistory.jsx
│   │   └── RequestParking.jsx
│   ├── AdminDashboard.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── UserDashboard.jsx
├── styles/
│   └── globals.css
├── App.jsx
├── main.jsx
├── server.js (Backend)
├── package.json
└── README.md
```

## 🏆 Key Achievements

✅ Complete DSA implementation (Queue, Stack, Array, Linked List)
✅ Real authentication and validation
✅ Role-based access control
✅ Visual data structure demonstration
✅ Modern, colorful UI
✅ Real-time updates
✅ Professional code structure
✅ Viva-ready documentation

---

**Built for University DSA Project** | Demonstrates practical application of Data Structures & Algorithms
