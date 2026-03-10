import { Task } from "@/app/models/TasksSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { NextApiRequest, NextApiResponse } from "next";

async function getProjectById(
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) {
    try {
        if (req.method === "GET") {
            const { id } = req.query;

            if (!id) {
                return new ApiResponse(res, "Task id is required").send(400);
            }

            const task = await Task.findOne({ _id: id });

            if (!task) {
                return new ApiResponse(res, "Task not found").send(404);
            }

            return new ApiResponse(res, "Task fetched successfully", task).send(200);
        }

        else if (req.method === "PUT") {
            console.log("Hi There")
            const {
                title,
                description,
                status,
                priority,
                dueDate,
                projectId,
                assignedTo,
                taskId,
            } = req.body;

            if (!taskId) {
                return new ApiResponse(res, "TaskId is required").send(400);
            }

            const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId },
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

            if (!updatedTask) {
                return new ApiResponse(res, "Task not found").send(404);
            }

            return new ApiResponse(res, "Task updated successfully", updatedTask).send(200);
        }

        //return new ApiResponse(res, "Method not allowed").send(405);

    } catch (error) {
        console.error(error);
        return new ApiResponse(res, "Internal server error").send(500);
    }
}

export default withDB(withAuth(getProjectById));