
import mongoose from 'mongoose'; 

const connectDB = async ()=>{ 
     try{
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("MongoDb Connected Successfully"); 
     }
     catch(err)
     {  
        console.error("Database Connection Failed",err.message); 
        process.exit(1); // Exit Process with Failure 
     }
}; 
export default connectDB; 