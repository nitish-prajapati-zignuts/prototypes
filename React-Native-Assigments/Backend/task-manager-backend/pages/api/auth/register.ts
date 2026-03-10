import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { withDB } from "@/app/Utils/withDB";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { User } from "@/app/models/UserSchema";

async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return new ApiResponse(res, "All fields are required").send(400);
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new ApiResponse(res, "User already exists").send(400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return new ApiResponse(res, "User registered successfully", {
            userId: newUser._id,
        }).send(201);

    } catch (error) {
        console.error(error);

        return new ApiResponse(res, "Internal server error").send(500);
    }
}

export default withDB(registerHandler);