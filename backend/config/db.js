import mongoose from "mongoose";

// connecting to the Db using the connection string in the DB
export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch (error){
        console.error(`Error ${error.messsage}`);
        process.exit(1)//process code 1 code means failure
    }
};