import mongoose from "mongoose";
import { User } from "./User.js";

const studentSchema = mongoose.Schema({
    level: { type: "String", required: true, default: "1A" },
    phone: { type: "String", required: true },
    dob: { type: "Date", required: true },
    class: { type: "String", required: true },
    interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }],
})

export const Student = User.discriminator('Student', studentSchema)

