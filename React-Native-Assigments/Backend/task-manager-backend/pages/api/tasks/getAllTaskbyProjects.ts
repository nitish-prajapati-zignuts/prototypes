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
        const { task } = req.query;
        const { projectId } = req.body;

        if (!projectId) {
            return new ApiResponse(res, "ProjectId is required").send(400);
        }

        let filter: any = { projectId };

        /**
         * CREATED TASKS
         * Includes tasks created by user
         * even if assigned to himself
         */
        if (task === "created") {
            filter.userId = userId;
        }

        /**
         * ASSIGNED TASKS
         * Only tasks assigned to user
         * but created by someone else
         */
        else if (task === "assigned") {
            filter = {
                projectId,
                assignedTo: userId,
                userId: { $ne: userId },
            };
        }

        /**
         * ALL TASKS (fallback)
         */
        else {
            filter = {
                projectId,
                $or: [
                    { userId: userId },
                    { assignedTo: userId }
                ],
            };
        }

        const tasks = await Task.find(filter)
            .populate("userId projectId assignedTo", "-password")
            .lean();

        return new ApiResponse(res, "Tasks fetched successfully", tasks).send(200);

    } catch (error) {
        console.error(error);
        return new ApiResponse(res, "Internal server error").send(500);
    }
}

export default withDB(withAuth(getAllTaskbyProjects));