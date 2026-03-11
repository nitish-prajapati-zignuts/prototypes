import { Task } from "@/app/models/TasksSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handler to manage Task creation.
 * Wrapped with withDB for connection management and withAuth for session validation.
 */
async function UpdateStatus(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
        // Get the task ID from the URL and the new status from the body
        const { id } = req.query;
        const { status } = req.body;

        // If they didn't send an ID, we don't know which task to fix!
        if (!id) {
            return new ApiResponse(res, "Please Provide Id to Update", null).send(400);
        }

        
        const updatedTask = await Task.findOneAndUpdate(
            { 
                _id: id,     
                userId: userId 
            },
            {
                status: status
            },
            { new: true } 
        );

        // If updatedTask is null, it means the ID was wrong or it's not their task
        if (!updatedTask) {
            return new ApiResponse(res, "Task not found or unauthorized", null).send(404);
        }

        // Send back the updated task so the frontend can show the change
        return new ApiResponse(res, "Status Updated Successfully", updatedTask).send(200);

    } catch (error) {
        // If the database is having a bad day, we end up here
        console.error("Update Status Error:", error);
        return new ApiResponse(res, "Something Went Wrong!", null).send(500);
    }
}

//First connect to DB, then check if they are logged in,
export default withDB(withAuth(UpdateStatus));