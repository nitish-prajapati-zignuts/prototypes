# Project Management API Documentation

**Version:** 1.0.0
**Authentication:** Bearer Token (JWT)

---

# Base URL

```
https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api
```

---

# Authentication

Most endpoints require a **Bearer Token**.

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 1. Authentication APIs

---

## 1.1 Register User

### Endpoint

```
POST /api/auth/register
```

### Description

Creates a new user account.

### Request Body

```json
{
  "email": "nitishprajapati180@gmail.com",
  "name": "Nitish Prajapati",
  "password": "Nitish@1234"
}
```

### Response

```json
{
  "message": "User registered successfully"
}
```

---

## 1.2 Login User

### Endpoint

```
POST /api/auth/login
```

### Request Body

```json
{
  "email": "nitishprajapati180@gmail.com",
  "password": "Nitish@1234"
}
```

### Example Response

```json
{
  "error": "User not found"
}
```

---

## 1.3 Get Current User

### Endpoint

```
POST /api/auth/me
```

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "token": "JWT_TOKEN"
}
```

### Response

Returns the authenticated user's details.

---

# 2. Project APIs

All project endpoints require authentication.

---

## 2.1 Create Project

### Endpoint

```
POST /api/projects/create
```

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "title": "Creating #7",
  "description": "Creating Project #7"
}
```

### Response

```json
{
  "success": true,
  "message": "Project created successfully"
}
```

---

## 2.2 Get All Projects

### Endpoint

```
POST /api/projects/getAllProjects
```

### Query Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| page      | string | Page number |

Example

```
/api/projects/getAllProjects?page=3
```

### Example Response

```json
{
  "success": true,
  "message": "Projects fetched successfully",
  "data": {
    "projects": [
      {
        "_id": "69aff43c7d9e40d28484b663",
        "title": "Creating #1",
        "description": "Creating Project #1",
        "userId": "69afe153f668d5f94dd3fc7a",
        "isDeleted": false
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  }
}
```

---

## 2.3 Get Project By ID

### Endpoint

```
GET /api/projects/{projectId}
```

### Example

```
GET /api/projects/69aff87f7d9e40d28484b68c
```

### Response

```json
{
  "success": true,
  "message": "Project fetched successfully",
  "data": {
    "_id": "69aff4ea7d9e40d28484b66d",
    "title": "Creating #5",
    "description": "Creating Project #5 - After Editing",
    "userId": "69afe153f668d5f94dd3fc7a",
    "isDeleted": false
  }
}
```

---

## 2.4 Update Project

### Endpoint

```
PUT /api/projects/{projectId}
```

### Example

```
PUT /api/projects/69aff4ea7d9e40d28484b66d
```

### Request Body

```json
{
  "title": "Creating #5",
  "description": "Creating Project #5 - After Editing"
}
```

---

## 2.5 Delete Project

### Endpoint

```
DELETE /api/projects/{projectId}
```

### Example

```
DELETE /api/projects/69aff43c7d9e40d28484b663
```

---

# 3. Task APIs

All task endpoints require authentication.

---

## 3.1 Create Task

### Endpoint

```
POST /api/tasks/createTask
```

### Request Body

```json
{
  "title": "Adding New Task #7",
  "description": "Adding New Task Description #7",
  "status": "TODO",
  "priority": "LOW",
  "assignedTo": "69afe153f668d5f94dd3fc7a",
  "projectId": "69aff4e17d9e40d28484b66b",
  "dueDate": "2026-03-28"
}
```

---

## 3.2 Get Tasks By Project

### Endpoint

```
GET /api/tasks/getAllTaskbyProjects
```

### Query Parameters

| Parameter | Type   |
| --------- | ------ |
| status    | string |
| priority  | string |

### Request Body

```json
{
  "projectId": "69aff4e17d9e40d28484b66b"
}
```

---

## 3.3 Get Task By ID

### Endpoint

```
GET /tasks/{taskId}
```

### Example

```
GET /tasks/69affd677d9e40d28484b696
```

---

## 3.4 Update Task

### Endpoint

```
PUT /tasks/{taskId}
```

### Request Body

```json
{
  "taskId": "69affd677d9e40d28484b696",
  "title": "Adding New Task #1 - Updating Task",
  "description": "Adding New Task Description #1",
  "status": "TODO",
  "priority": "LOW",
  "assignedTo": "69afe153f668d5f94dd3fc7a",
  "projectId": "69aff4e17d9e40d28484b66b",
  "dueDate": "2026-03-28"
}
```

---

## 3.5 Update Task Status

### Endpoint

```
PATCH /tasks/{taskId}/status
```

### Request Body

```json
{
  "status": "IN_PROGRESS"
}
```

---

# 4. Admin Login API

### Endpoint

```
POST /api/login
```

### Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "admin@1998"
}
```

### Response

```json
{
  "data": {
    "email": "nitishprajapati180@gmail.com",
    "password": "Nitish@1998",
    "role": "user",
    "createdAt": {
      "_seconds": 1771346686,
      "_nanoseconds": 813000000
    }
  }
}
```

---

# Task Status Values

```
TODO
IN_PROGRESS
DONE
```

---

# Task Priority Values

```
LOW
MEDIUM
HIGH
```

---

# Authentication Header Example

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
