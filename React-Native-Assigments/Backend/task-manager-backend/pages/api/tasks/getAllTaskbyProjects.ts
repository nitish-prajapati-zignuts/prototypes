import { Task } from "@/app/models/TasksSchema";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

async function getAllTaskbyProjects(
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) {
    try {
        const { status, priority } = req.query;
        const { projectId } = req.body;

        if (!projectId) {
            return new ApiResponse(res, "ProjectId is required").send(400);
        }

        const filter: any = {
            projectId,
            userId,
        };

        if (status && status !== "") {
            filter.status = status;
        }

        if (priority && priority !== "") {
            filter.priority = priority;
        }

        const tasks = await Task.find(filter);

        return new ApiResponse(res, "Tasks fetched successfully", tasks).send(200);

    } catch (error) {
        console.error(error);
        return new ApiResponse(res, "Internal server error").send(500);
    }
}

export default withDB(withAuth(getAllTaskbyProjects));