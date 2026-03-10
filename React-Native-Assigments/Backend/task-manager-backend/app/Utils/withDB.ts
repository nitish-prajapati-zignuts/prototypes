import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/app/lib/db";
import { ApiError } from "./ApiError";

/* 
    This is HOC Function for Database Wrapper As we don't nee to write the Connection Requestion and Intialize the Object 
    in Every API Calls
*/
export function withDB(
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        try {
            await connectDB();
            return await handler(req, res);
        } catch (error: any) {
            console.error(error);

            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };
}