import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@/app/models/UserSchema";
import { ApiResponse } from "../../../app/Utils/ApiResponse";
import { withDB } from "@/app/Utils/withDB";

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Get the Request Body from the user sent us
        const { email, password } = req.body;

        //Checking if the email and Password Exist or Not
        if (!email || !password) {
            return new ApiResponse(res, "All fields are required").send(400);
        }

        // Check if this email even exists in our database
        const user = await User.findOne({ email });

        // If no user comes back, we stop right here.
        if (!user) {
            return new ApiResponse(res, "User not found").send(404);
        }

        //Comparing the Password with what is stored in Database and What User has send by Comparing
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return new ApiResponse(res, "Incorrect password").send(401);
        }

       //Signing the JWT Token 
       //For Now I have Kept it for 7 days
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY!, 
            { expiresIn: "7d" } 
        );

        // Send back the token. The frontend will take this and save it to the Auth store.
        return new ApiResponse(res, "Login successful", { token }).send(200);

    } catch (error) {
        return new ApiResponse(res, "Internal server error").send(500);
    }
}

// Wrap it with our DB connection logic with login Handler
export default withDB(loginHandler);