const dotenv= require('dotenv')
dotenv.config();
const mongoose= require('mongoose')
const mongoURI = "mongodb+srv://inotebook:pratap123@user.zwuze.mongodb.net/?retryWrites=true&w=majority&appName=User"

const connectToMongo =  async () =>{
        try{
           await mongoose.connect(mongoURI)
           console.log("Connected successfully")
        }
        catch(error){
            console.log("connection error",error)
            process.exit(1)
        }
}

module.exports = connectToMongo;