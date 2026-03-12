import { withDB } from "@/app/Utils/withDB";
import { withAuth } from "@/app/Utils/withAuth";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/app/models/ProjectSchema";
import { Task } from "@/app/models/TasksSchema";

/**
 * Handler to manage Getting Projects.
 * Wrapped with withDB for connection management and withAuth for session validation.
 */
async function getProjectsHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) {

    // Filtering the Data
    const data = await Project.find().where({isDeleted:false})


    /* Sending Response to User*/
    return new ApiResponse(res, "Projects fetched successfully", 
        data
    ).send(200);
}

export default withDB(withAuth(getProjectsHandler));