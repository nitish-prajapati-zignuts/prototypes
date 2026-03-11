import { withDB } from "@/app/Utils/withDB";
import { withAuth } from "@/app/Utils/withAuth";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/app/models/ProjectSchema";

/**
 * Handler to manage Project creation.
 * Wrapped with withDB for connection management and withAuth for session validation.
 */
async function createHandler(req: NextApiRequest, res: NextApiResponse, userId: string) {
    /* Getting Title and Description from User */
    const { title, description } = req.body;
    console.log(title, description);

    /* Checking if Title and Description are provided by User */
    if (!title || !description) {
        return new ApiResponse(res, "All fields are required").send(400);
    }

    /* Creating Project and Storing in Database*/
    const project = await Project.create({ title, description, userId });

    /* Sending Response to User */
    return new ApiResponse(res, "Project created successfully", project).send(201);
}

export default withDB(withAuth(createHandler));