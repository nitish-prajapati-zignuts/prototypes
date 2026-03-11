# NextJS & React Native Full Stack Mobile App

## 🛠 Tech Stack
* **Backend:** Next.js (API Routes)
* **Frontend:** React Native (Expo/CLI)
* **Database:** [e.g., MongoDB / PostgreSQL]
* **Auth:** JWT (JSON Web Tokens)

---

## Request Headers

| Header | Value | Description |
| :--- | :--- | :--- |
| `Content-Type` | `application/json` | Required for all POST/PUT requests |
| `Authorization` | `Bearer <token>` | JWT access token for protected routes |

---

## Authentication Endpoints

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Log in user and return JWT token | `200` |
| `POST` | `/api/auth/register` | Register a new user to the system | `201` |
| `POST` | `/api/auth/me` | Verify and return current logged-in user | `200` |

---

##  Project Management (CRUD)

| Method | Endpoint | Use Case | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects/getAllProjects?page=1` | Fetch all projects for the user | `200` |
| `POST` | `/api/projects/create` | Create a new project workspace | `201` |
| `GET` | `/api/projects/[id]` | Get details of a specific project | `200` |
| `PUT` | `/api/projects/[id]` | Update project title or metadata | `200` |
| `DELETE` | `/api/projects/[id]` | Remove a project and its tasks | `204` |

---

##  Task Management (CRUD)

| Method | Endpoint | Use Case | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks/createTask` | Add a task to a specific project | `201` |
| `GET` | `/api/tasks/getAllTaskbyProjects` | Get All Task of Specific Project | `200` |
| `GET` | `/api/tasks/project/[id]` | Get all tasks for a specific project | `200` |
| `PATCH` | `/api/tasks/[id]/status` | Update task status (e.g., Todo -> Done) | `200` |
| `PUT` | `/api/tasks/[id]` | Edit task name or deadline | `200` |
| `DELETE` | `/api/tasks/[id]` | Remove a specific task | `204` |

---

## Authorization Examples
### Login
```json
{
    "email":"nitishprajapati180@gmail.com",
    "password":"Nitish@1234"
}
```
### Registration 
```json
{
    "email": "nitishprajapati180@gmail.com",
    "name": "Nitish Prajapati",
    "password": "Nitish@1234"
}
```
### Token
```json
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWZlMTUzZjY2OGQ1Zjk0ZGQzZmM3YSIsImlhdCI6MTc3MzEzNDg3OSwiZXhwIjoxNzczMTM4NDc5fQ.BTbDTOGnxaT67RX-mbKr30zs4aNCL6j1HtHPuHZfJyg"
}
```
## Project Examples
### Create Project
```json
{
    "title":"Creating #7",
    "description":"Creating Project #7"
}
```
### Editing the Projects
```json
{
    "title":"Creating #5",
    "description":"Creating Project #5 - After Editing"
}
```
## Task Example
### Creating Task
```json
{
    "title":"Adding New Task #7",
    "description":"Adding New Task Description #7",
    "status":"TODO",
    "priority":"LOW",
    "assignedTo":"69afe153f668d5f94dd3fc7a",
    "projectId":"69aff4e17d9e40d28484b66b",
    "dueDate":"2026-03-28"
}
```

### Get All Projects by ID
```json
{
    "projectId":"69aff4e17d9e40d28484b66b"
}
```
### Editing/Updating Tasks
```json
{
    "taskId":"69affd677d9e40d28484b696",
    "title":"Adding New Task #1 - Updating Task",
    "description":"Adding New Task Description #1",
    "status":"TODO",
    "priority":"LOW",
    "assignedTo":"69afe153f668d5f94dd3fc7a",
    "projectId":"69aff4e17d9e40d28484b66b",
    "dueDate":"2026-03-28"
}
```
### Update By Status
```json
{
    "status":"IN_PROGRESS"
}
```






