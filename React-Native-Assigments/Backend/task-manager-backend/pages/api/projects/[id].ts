import { Project } from "@/app/models/ProjectSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { NextApiRequest, NextApiResponse } from "next";
import { StringDecoder } from "node:string_decoder";

async function getProjectById(req: NextApiRequest, res: NextApiResponse, userId: string) {
    console.log(userId)
    try {
        if (req.method === "GET") {
            const { id } = req.query;

            if (!id) {
                return new ApiResponse(res, "Project ID is required").send(400);
            }

            const project = await Project.findOne({
                _id: id,
                userId: userId,
                isDeleted: false
            })
                .populate("userId", "name email") // Selective population is faster
                .lean(); // Returns a plain JS object, better for performance if you aren't saving changes
            if (!project) {
                return new ApiResponse(res, "Project not found").send(404);
            }

            return new ApiResponse(res, "Project fetched successfully", project).send(200);
        }
        if (req.method === "DELETE") {
            const { id } = req.query

            if (!id) {
                return new ApiResponse(res, "Project ID is required").send(400);
            }

            const project = await Project.findById(id).where({ isDeleted: false, userId: userId });
            if (project) {
                await Project.findByIdAndUpdate(id, { isDeleted: true });
            }

            if (!project) {
                return new ApiResponse(res, "Project not found").send(404);
            }

            return new ApiResponse(res, "Project deleted successfully", project).send(200);
        }

        if (req.method === "PUT") {
            const { title, description } = req.body
            const { id } = req.query
            if (!title || !description) {
                return new ApiResponse(res, "Title and Description are required").send(400);
            }

            const project = await Project.findByIdAndUpdate(id, { title, description }).where({ isDeleted: false, userId: userId });

            if (!project) {
                return new ApiResponse(res, "Project not found").send(404);
            }

            const updatedProject = await Project.findById(id);

            return new ApiResponse(res, "Project updated successfully", updatedProject).send(200);
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default withDB(withAuth(getProjectById));