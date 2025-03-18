const mongoose= require('mongoose')
const mongoURI = "mongodb://localhost:27017/"

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