import type { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "@/app/Utils/withDB";
import { withAuth } from "@/app/Utils/withAuth";
import { User } from "@/app/models/UserSchema";
import { ApiResponse } from "@/app/Utils/ApiResponse";

async function meHandler(req: NextApiRequest, res: NextApiResponse, userId: string) {
    //Sending the User his Logged In Data and this Profile, This works for Every Segment Changes
    const user = await User.findById(userId).select("-password");
    //Sending the Api Response with {isAuthorized} flag for ensuring the user is Logged or not
    return new ApiResponse(res, "User fetched successfully", { user, isAuthorized: true }).send(200);
}

export default withDB(withAuth(meHandler));