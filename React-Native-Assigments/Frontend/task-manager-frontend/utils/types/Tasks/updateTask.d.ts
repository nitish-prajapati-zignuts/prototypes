export type FormData = {
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo: string;
    projectId: string;
    dueDate: string;
};

type User = {
    _id: string
    name: string
    email: string
}

export type AssignedData = User[]
