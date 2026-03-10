import type { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "@/app/Utils/withDB";
import { withAuth } from "@/app/Utils/withAuth";
import { User } from "@/app/models/UserSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";

async function meHandler(req: NextApiRequest, res: NextApiResponse, userId: string) {
    const user = await User.findById(userId).select("-password");

    return new ApiResponse(res, "User fetched successfully", user).send(200);
}

export default withDB(withAuth(meHandler));