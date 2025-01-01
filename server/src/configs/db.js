import mongoose from "mongoose"
import { MONGODB_URI } from '../configs/env.js'

export const connectToDB = async () => {
    try {
        if (!MONGODB_URI) {
            console.error('MONGODB_URI is not defined in the environment variables.');
        }
        await mongoose.connect(MONGODB_URI)
        console.log("Connected to MongoDB...")
    } catch (error) {
        console.log('Error connecting to databse', error)
    }
}