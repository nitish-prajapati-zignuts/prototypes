import { withDB } from "@/app/Utils/withDB";
import { withAuth } from "@/app/Utils/withAuth";
import { ApiResponse } from "@/app/Utils/ApiResponse";
import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/app/models/ProjectSchema";
import { Task } from "@/app/models/TasksSchema";

/**
 * Handler to manage Getting Projects.
 * Wrapped with withDB for connection management and withAuth for session validation.
 */
async function getProjectsHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
) {
    /* Getting Query Parameters */
    const {
        page = "1",
        limit = "2",
        search = "",
        sortBy = "createdAt",
        //order = "desc",
    } = req.query;

    /* Converting Query Parameters to Numbers */
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    /* Creating Filter Object */
    const filter: any = {
        //userId,
    };

    /* Adding Search Filter */
    if (search) {
        filter.title = {
            $regex: search,
            $options: "i",
        };
    }

    const sort: any = {};
    //sort[sortBy as string] = order === "asc" ? 1 : -1;

    /* Fetching Projects with Pagination and Sorting */
    // const projects = await Project.find(filter)
    //     .sort(sort)
    //     .skip(skip)
    //     .limit(limitNumber).where({ isDeleted: false });

    const projects = await Project.find(filter)
        .skip(skip)
        .limit(limitNumber).where({ isDeleted: false });


    /* Counting Total Number of Project Assigment to User*/
    const total = await Project.countDocuments(filter).where({ isDeleted: false });

    /* Sending Response to User*/
    return new ApiResponse(res, "Projects fetched successfully", {
        projects,
        pagination: {
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber),
        },
    }).send(200);
}

export default withDB(withAuth(getProjectsHandler));