export type User = {
  _id: string;
  name: string;
  email: string;
  __v: number;
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  isDeleted: boolean;
  __v: number;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  projectId: Project;
  userId: User;
  assignedTo: User;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TasksResponse = {
  success: boolean;
  message: string;
  data: Task[];
};