## Overview

Employee Management System (EMS) with secure authentication, role-based access control, employee management, organizational hierarchy, and a responsive dashboard.


### Tech Stack

**Frontend**

* React
* TypeScript
* Vite
* React Router
* React Query (TanStack Query)
* React Hook Form
* Zod
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

# Features

### Authentication

* JWT-based authentication
* Secure login
* Protected routes
* Role-Based Access Control (RBAC)

### Employee Management

* Create employee
* View employee list
* Update employee
* Delete employee
* Search and filtering
* Employee details

### Dashboard

* Employee statistics
* Department statistics
* Active vs Inactive employee charts

### Organization Hierarchy

* Organization tree
* Assign reporting manager
* View direct reports
* Circular reporting prevention

### RBAC

* Super Admin
* HR Manager
* Employee

---

# Project Structure

```text
client/
server/
```

---

# Installation

## 1. Clone the repository

```bash
git clone <repository-url>
cd EMS
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

Example:

```env
PORT=5500
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run seed # The backend includes a seed script to create the initial Super Admin account
npm run dev
```

Backend runs on:

```text
http://localhost:5500
```

---

## 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Documentation

## Authentication

| Method | Endpoint          | Description |
| ------ | ----------------- | ----------- |
| POST   | `/api/auth/login` | User login  |

---

## Employees

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| GET    | `/api/employees`     | Get employees   |
| GET    | `/api/employees/:id` | Get employee    |
| POST   | `/api/employees`     | Create employee |
| PUT    | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

---

## Dashboard

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | `/api/dashboard` | Dashboard statistics |

---

## Organization

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| GET    | `/api/organization/tree`       | Organization hierarchy   |
| GET    | `/api/employees/:id/reportees` | Direct reports           |
| PATCH  | `/api/employees/:id/manager`   | Assign reporting manager |

---

# User Roles

| Role        | Permissions                                        |
| ----------- | -------------------------------------------------- |
| Super Admin | Full system access                                 |
| HR Manager  | Manage employees (except restricted admin actions) |
| Employee    | Limited self-service access                        |

---

# Demo Screenshots

## Login


## Dashboard

```
demoSS/dashboard.png
```

---

## Employee Management

```
demoSS/employees.png
```

---

## Add Employee

```
demoSS/add-employee.png
```

---

## Organization Hierarchy

```
demoSS/organization-tree.png
```

---
