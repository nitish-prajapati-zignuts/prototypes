export type FormData = {
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo: string;
    dueDate: string;
};


type User = {
    _id: string
    name: string
    email: string
}

export type AssignedData = User[]

type Project = {
    _id: string
    title: string,
    description: string
}

export type ProjectDetails = Project[]