import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Express 5 handles JSON natively without body-parser
app.use(cors());
app.use(express.json());

interface ToDo {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

// In-memory data
let todos: ToDo[] = [
  { id: "1", name: "Switch to REST", description: "Successfully migrated from GraphQL", completed: true }
];

// GET: Fetch all todos
app.get('/todos', (req, res) => {
  // We wrap in 'items' to match your frontend PagedToDos type
  res.json({ items: todos });
});

// POST: Add a new todo (Server generates ID)
app.post('/todos', (req, res) => {
  const { name, description } = req.body;
  const newTodo: ToDo = {
    id: Math.random().toString(36).substring(7),
    name,
    description,
    completed: false
  };
  todos.push(newTodo);
  console.log(todos)
  res.status(201).json(newTodo);
});

// POST: Add with specific ID (For your useAddTodoWithId hook)
app.post('/todos/with-id', (req, res) => {
  const { id, name, description } = req.body;
  const newTodo: ToDo = { id, name, description, completed: false };
  console.log(newTodo)
  todos.push(newTodo);
  console.log(todos)
  res.status(201).json(newTodo);
});

// PATCH: Complete a todo
app.patch('/todos/:id/complete', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === id);
  
  if (!todo) return res.status(404).json({ message: "Not found" });

  todo.completed = true;
  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`🚀 REST Server running at http://localhost:${PORT}`);
});