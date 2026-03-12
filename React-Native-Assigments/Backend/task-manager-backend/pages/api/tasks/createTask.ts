import { Task } from "@/app/models/TasksSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handler to manage Task creation.
 * Wrapped with withDB for connection management and withAuth for session validation.
 */
async function createTask(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
        // Enforce POST method for resource creation
        if (req.method === "POST") {
            const { title, description, status, priority, dueDate, projectId, assignedTo } = req.body;

            console.log(req.body)

            // Basic validation: Title, Description, and DueDate are our 'minimum viable' data
            if (!title || !description || !dueDate) {
                // Using 400 (Bad Request) here as 401 is reserved for Auth failures
                return new ApiResponse(res, "Missing required fields: title, description, or dueDate").send(400);
            }

            /** * Persist the new task. 
             * Note: userId is injected from the withAuth middleware to ensure 
             * the task is owned by the authenticated requester.
             */
            const createNewTask = await Task.create({
                title,
                description,
                status,      // Defaults will be handled by Schema if these are undefined
                priority,
                userId,      // Ownership link
                assignedTo,
                projectId,
                dueDate: new Date(dueDate) // Cast to Date object to ensure valid storage
            });

            // If the document wasn't created for some reason (rare with Task.create)
            if (!createNewTask) {
                return new ApiResponse(res, "Database failed to initialize new task record").send(500);
            }

            return new ApiResponse(res, "Task Created Successfully", createNewTask).send(201); // 201 is the standard for 'Created'
        }

        // Fallback for unsupported HTTP methods
        return new ApiResponse(res, `Method ${req.method} not allowed`).send(405);

    } catch (error) {
        // Detailed logging for server-side debugging; sanitized response for the client
        console.error("Task Creation Error:", error);
        return new ApiResponse(res, "An unexpected error occurred during task creation", error).send(500);
    }
}

export default withDB(withAuth(createTask));