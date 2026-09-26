# TaskFlow Lite – User Profile Module

## Project Overview

TaskFlow Lite is a small task-management application developed as part of the Week 1 Full Stack Development Internship.

This submission implements the **User Profile Module**.

The module allows a user to:

* View profile information
* Edit Display Name
* Edit Phone Number
* Edit Short Bio
* Keep Email read-only
* Save profile changes
* Cancel unsaved changes
* Validate profile input
* Display success and error messages

---

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### API

* REST API
* JSON

---

## Project Structure

```text
TaskFlow-Lite/
│
├── backend/
│   ├── controllers/
│   │   └── profileController.js
│   ├── routes/
│   │   └── profileRoutes.js
│   ├── services/
│   │   └── profileService.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── server.js
│   ├── seedProfile.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   └── src/
│       └── App.jsx
│
├── TEST_CASES.md
└── README.md
```

---

## Features Implemented

### Profile Display

The profile is fetched from the backend API and displayed in the frontend.

Displayed fields:

* Display Name
* Email
* Phone Number
* Short Bio

### Profile Editing

The user can edit:

* Display Name
* Phone Number
* Short Bio

Email is read-only.

### Save

Valid profile data is sent to the backend using the PUT API.

A success message is displayed after a successful update.

### Cancel

Cancel discards unsaved changes and restores the last saved profile values.

### Validation

The module includes validation for:

* Display Name is required
* Display Name maximum length
* Phone number format
* Short Bio maximum 250 characters
* Empty Short Bio is allowed

### Error Handling

The application handles:

* Profile not found
* Invalid input
* API update errors
* Profile loading errors

---

## API Endpoints

### Get Profile

**GET**

```text
http://localhost:5000/api/profile/:id
```

Example:

```text
GET http://localhost:5000/api/profile/1
```

Successful response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Kanimozhi M",
    "email": "kanimozhi@example.com",
    "phone": "9876543210",
    "bio": "Python Developer"
  }
}
```

If the profile does not exist:

```text
404 Not Found
```

---

### Update Profile

**PUT**

```text
http://localhost:5000/api/profile/:id
```

Example:

```text
PUT http://localhost:5000/api/profile/1
```

Request body:

```json
{
  "name": "Kanimozhi M",
  "phone": "9876543210",
  "bio": "Python Developer"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

---

## How to Run the Project

### 1. Start PostgreSQL

Make sure PostgreSQL is running on the configured database.

### 2. Start Backend

Open a terminal:

```powershell
cd TaskFlow-Lite\backend
```

Install dependencies if required:

```powershell
& "C:\Program Files\nodejs\npm.cmd" install
```

Start the backend:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 3. Start Frontend

Open another terminal:

```powershell
cd TaskFlow-Lite\frontend
```

Install dependencies if required:

```powershell
& "C:\Program Files\nodejs\npm.cmd" install
```

Start the frontend:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

Open:

```text
http://localhost:5173
```

---

## Database

The project uses PostgreSQL with Prisma ORM.

Prisma schema contains the profile fields:

* id
* name
* email
* phone
* bio
* updated_at

Database credentials are stored in environment variables and should not be committed to Git.

---

## Testing

Self-test cases are documented in:

```text
TEST_CASES.md
```

The tests cover:

1. View profile
2. Valid profile update
3. Cancel profile update
4. Invalid name
5. Invalid phone number
6. Nonexistent profile
7. Optional bio

---

## Git Branch

Development was performed on a feature branch instead of directly on `main` or `master`.

Feature branch:

```text
feature/user-profile
```

---

## Scope

This Week 1 implementation focuses only on the assigned **User Profile Module**.

The following features are intentionally outside the scope:

* Authentication
* Profile photo upload
* Password change
* Address management
* Notifications
* Advanced role management
* Audit history
