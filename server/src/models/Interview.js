import mongoose from "mongoose";

const interviewSchema = mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    level: { type: "String", required: true },
    skills: { type: "String", required: true },
    score: { type: "Number", required: true },
    result: { type: "String", required: true },
    date: { type: "Date", required: true, default: Date.now() },
    interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
})

export const Interview = mongoose.model('Interview', interviewSchema)