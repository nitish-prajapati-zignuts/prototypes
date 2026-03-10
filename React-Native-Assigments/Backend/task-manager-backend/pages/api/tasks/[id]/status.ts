import { Task } from "@/app/models/TasksSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { NextApiRequest, NextApiResponse } from "next";

async function UpdateStatus(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
        const { id } = req.query
        const { status } = req.body

        if (!id) {
            return new ApiResponse(res, "Please Provide Id to Update", null).send(400)
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id },
            {
                status: status
            },
            { new: true }
        );

        return new ApiResponse(res, "Status Updated Successfully", updatedTask).send(200)

    } catch (error) {
        return new ApiResponse(res, "Something Went Wrong!", null).send(500)
    }
}

export default withDB(withAuth(UpdateStatus))