import { NextApiResponse } from "next";


/* This is Global Class for API Response */
export class ApiResponse {
    res: NextApiResponse;
    message: string;
    data: any;
    success: boolean;

    constructor(res: NextApiResponse, message: string, data: any = null) {
        this.res = res;
        this.message = message;
        this.data = data;
        this.success = true;
    }

    /* This is Global Method for API Response for Sending the Response to User */
    send(statusCode = 200) {
        return this.res.status(statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data,
        });
    }
}