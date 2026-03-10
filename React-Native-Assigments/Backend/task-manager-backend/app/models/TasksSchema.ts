import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enums: ["TODO", "IN_PROGRESS", "DONE"],
        required: true,
        default: "TODO"
    },
    priority: {
        type: String,
        enums: ["LOW", "MEDIUM", "HIGH"],
        required: true,
        default: "LOW"
    },
    dueDate: {
        type: Date,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
