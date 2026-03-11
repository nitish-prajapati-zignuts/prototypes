import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { withDB } from "@/app/Utils/withDB";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { User } from "@/app/models/UserSchema";

async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //Request Body that is coming from User Request Body
        const { name, email, password } = req.body;

        //Checking the Request Required in the Body
        if (!name || !email || !password) {
            return new ApiResponse(res, "All fields are required").send(400);
        }

        //Checking if there exist any User Already with Given EmailId
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new ApiResponse(res, "User already exists").send(400);
        }
        //Hashing the Password for Better Use Case
        const hashedPassword = await bcrypt.hash(password, 10);

        //Creating the User and Saving in Database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        //Sending the Api Response to the User
        return new ApiResponse(res, "User registered successfully", {
            userId: newUser._id,
        }).send(201);

    } catch (error) {
        return new ApiResponse(res, "Internal server error").send(500);
    }
}

export default withDB(registerHandler);