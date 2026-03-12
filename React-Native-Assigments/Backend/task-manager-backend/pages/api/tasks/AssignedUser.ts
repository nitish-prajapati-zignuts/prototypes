import { User } from "@/app/models/UserSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { withAuth } from "@/app/Utils/withAuth";
import { withDB } from "@/app/Utils/withDB";
import { NextApiRequest, NextApiResponse } from "next";


async function AssignedUserList(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
        // Fetch all users except passwords
        const users = await User.find().select("-password").lean();

        return new ApiResponse(res, "Users Fetched Successfully", users).send(200);
    } catch (error) {
        console.error(error);
        return new ApiResponse(res, "Something went wrong", null).send(500);
    }
}

export default withDB(withAuth(AssignedUserList));