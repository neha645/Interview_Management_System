import mongoose from "mongoose";
import { User } from "./User.js";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
  },
  experience: {
    type: Number,
    required: [true, "Years of experience is required"],
  }
}, {
  timestamps: true
})

export const Teacher = User.discriminator('Teacher', teacherSchema);

