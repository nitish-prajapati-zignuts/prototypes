import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@/app/models/UserSchema";
import { ApiResponse } from "../../../app/Utils/ApiResponse";
import { withDB } from "@/app/Utils/withDB";

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return new ApiResponse(res, "All fields are required").send(400);
        }

        const user = await User.findOne({ email });

        if (!user) {
            return new ApiResponse(res, "User not found").send(404);
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return new ApiResponse(res, "Incorrect password").send(401);
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY!,
            { expiresIn: "7d" }
        );

        return new ApiResponse(res, "Login successful", { token }).send(200);

    } catch (error) {
        console.error(error);

        return new ApiResponse(res, "Internal server error").send(500);
    }
}

export default withDB(loginHandler);