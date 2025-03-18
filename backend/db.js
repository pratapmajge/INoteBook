const dotenv= require('dotenv')
dotenv.config();
const mongoose= require('mongoose')
const mongoURI = process.env.MONGO_URL

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