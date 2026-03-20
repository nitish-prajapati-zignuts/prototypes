const BASE_URL = "https://unfeared-rana-prerheumatic.ngrok-free.dev"

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

type UpdateTodoPayload = {
    id: number;
    data: Partial<Todo>;
};


export const fetchTodos = async () => {
    const response = await fetch(`${BASE_URL}/todos`);
    if (!response.ok) {
        console.log(Error)
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}

export const updateTodo = async (id: string, data: { completed: boolean, name: string, description: string }) => {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch todo');
    }
    return response.json();
}

export const createTodoService = async (todo: { name: string, description: string, completed: boolean }) => {
    const response = await fetch(`${BASE_URL}/addTodos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    return response.json();
}