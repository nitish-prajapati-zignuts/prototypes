import { Task } from "@/app/models/TasksSchema";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handler to manage Task and Getting All Task by Project.
 * Wrapped with withDB for connection management and withAuth for session validation.
 */
async function getAllTaskbyProjects(
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) {
    try {
        //Taking the required status,priority from query and projectId from Body
        const { status, priority } = req.query;
        const { projectId } = req.body;

        //We Need the ProjectID for Filtering the Data
        if (!projectId) {
            return new ApiResponse(res, "ProjectId is required").send(400);
        }

        //Adding Filters
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

        //Querying the Filter and Populating the Required References
        const tasks = await Task.find(filter).populate("userId projectId assignedTo","-password");

        return new ApiResponse(res, "Tasks fetched successfully", tasks).send(200);

    } catch (error) {
        console.error(error);
        return new ApiResponse(res, "Internal server error").send(500);
    }
}

export default withDB(withAuth(getAllTaskbyProjects));