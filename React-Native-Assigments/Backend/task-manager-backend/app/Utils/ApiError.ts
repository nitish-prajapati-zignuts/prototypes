import { NextResponse } from "next/server";

export class ApiError extends Error {
    success: boolean;
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.success = false;
        this.statusCode = statusCode;
    }

    send() {
        return NextResponse.json(
            {
                success: this.success,
                message: this.message,
            },
            { status: this.statusCode }
        );
    }
}