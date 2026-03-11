import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ApiResponse } from "@/app/Utils/ApiResponse";


/* 
    This is HOC Function for Authentication Wrapper As we don't nee to write the Authentication Requestion and So we Don't Intialize the Object 
    in Every API Calls
*/
export function withAuth(
    handler: (req: NextApiRequest, res: NextApiResponse, userId: string) => Promise<any>
) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            console.log(req);
            const authHeader = req.headers.authorization;

            console.log(authHeader);

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return new ApiResponse(res, "Token not provided",{user:null,isAuthorized:false}).send(401);
            }

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY!
            ) as { id: string };

            return handler(req, res, decoded.id);

        } catch (error) {
            return new ApiResponse(res, "Invalid or expired token",{user:null,isAuthorized:false}).send(401);
        }
    };
}