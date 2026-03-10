import { Task } from "@/app/models/TasksSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { NextApiRequest, NextApiResponse } from "next";

async function createTask(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
        if (req.method === "POST") {
            const { title, description, status, priority, dueDate, projectId, assignedTo } = req.body

            if (!title || !description || !dueDate) {
                return new ApiResponse(res, "All Fields are Required", null).send(401)
            }

            const createNewTask = await Task.create({
                title: title,
                description,
                status: status,
                priority: priority,
                userId: userId,
                assignedTo: assignedTo,
                projectId: projectId,
                dueDate: dueDate
            })

            if (!createNewTask) {
                return new ApiResponse(res, "Something went wrong!").send(500)
            }

            return new ApiResponse(res, "Task Created Successfully", createNewTask).send(200)
        }


    } catch (error) {
        return new ApiResponse(res, "Something went wrong!", error).send(500)

    }
}

export default withDB(withAuth(createTask))