import { Project } from "@/app/models/ProjectSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handler to manage Projects.
 * Wrapped with withDB for connection management and withAuth for session validation.
 */
async function getProjectById(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
        // FETCHING THE PROJECT ---
        if (req.method === "GET") {
            const { id } = req.query; // Grab the ID from the URL (/api/projects/[id])

            if (!id) {
                return new ApiResponse(res, "Project ID is required").send(400);
            }

            // Look for a project that matches the ID AND belongs to the logged-in user
            const project = await Project.findOne({
                _id: id,
                userId: userId,
                isDeleted: false // We don't want to show "deleted" stuff
            })
                // Reach into the User collection and grab just the name and email
                .populate("userId", "name email") 
                // .lean() makes the data a simple JS object (much faster/lighter)
                .lean(); 

            if (!project) {
                return new ApiResponse(res, "Project not found").send(404);
            }

            return new ApiResponse(res, "Project fetched successfully", project).send(200);
        }

        // DELETING THE PROJECT 
        if (req.method === "DELETE") {
            const { id } = req.query;

            if (!id) {
                return new ApiResponse(res, "Project ID is required").send(400);
            }

            // First, make sure the project exists and the user actually owns it
            const project = await Project.findById(id).where({ isDeleted: false, userId: userId });
            
            if (project) {
                // We don't actually delete it from the DB, we just flip a "hidden" switch
                // This is called a "Soft Delete"
                await Project.findByIdAndUpdate(id, { isDeleted: true });
            }

            if (!project) {
                return new ApiResponse(res, "Project not found").send(404);
            }

            return new ApiResponse(res, "Project deleted successfully", project).send(200);
        }

        // UPDATING THE PROJECT ---
        if (req.method === "PUT") {
            const { title, description } = req.body; // New data comes from the request body
            const { id } = req.query;

            if (!title || !description) {
                return new ApiResponse(res, "Title and Description are required").send(400);
            }

            // Find it and update the fields in one go
            const project = await Project.findByIdAndUpdate(id, { title, description })
                .where({ isDeleted: false, userId: userId });

            if (!project) {
                return new ApiResponse(res, "Project not found").send(404);
            }

            // Since findByIdAndUpdate returns the OLD data by default, 
            // we fetch the fresh version to send back to the user
            const updatedProject = await Project.findById(id);

            return new ApiResponse(res, "Project updated successfully", updatedProject).send(200);
        }

    } catch (error) {
        // If the database crashes or code breaks, catch the mess here
        console.error("Something went wrong in the handler:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Wrap our function in layers (Middlewares): 
// 1. Connect to DB first,
//  2. Check if user is logged in
export default withDB(withAuth(getProjectById));