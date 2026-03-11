import { Task } from "@/app/models/TasksSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handler to manage Task creation.
 * Wrapped with withDB for connection management and withAuth for session validation.
 */
async function getProjectById(
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) {
    try {
        //FETCHING A SINGLE TASK ---
        if (req.method === "GET") {
            const { id } = req.query;

            if (!id) {
                return new ApiResponse(res, "Task id is required").send(400);
            }

            // Go to the database and look for a task with this specific ID
            const task = await Task.findOne({ _id: id });

            // If the database returns nothing, tell the user it's missing
            if (!task) {
                return new ApiResponse(res, "Task not found").send(404);
            }

            //Send the task back so the frontend can display it
            return new ApiResponse(res, "Task fetched successfully", task).send(200);
        }

        // UPDATING A TASK
        else if (req.method === "PUT") {
            // Destructure (extract) all the new info from the request body
            const {
                title,
                description,
                status,
                priority,
                dueDate,
                projectId,
                assignedTo,
                taskId, // We need this to know WHICH task to update
            } = req.body;

            // We absolutely need the taskId to perform an update
            if (!taskId) {
                return new ApiResponse(res, "TaskId is required").send(400);
            }

           
            // It finds the task and applies the changes in one step.
            const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId }, // Find the task by this ID
                {
                    title,
                    description,
                    status,
                    priority,
                    dueDate,
                    projectId,
                    assignedTo,
                },
                { new: true } 
            );

            // If updatedTask is null, maybe the taskId was typed wrong
            if (!updatedTask) {
                return new ApiResponse(res, "Task not found").send(404);
            }

            // Send back the updated task
            return new ApiResponse(res, "Task updated successfully", updatedTask).send(200);
        }

    } catch (error) {
        return new ApiResponse(res, "Internal server error").send(500);
    }
}

// withDB connects to Mongo, withAuth checks the login token. 
export default withDB(withAuth(getProjectById));