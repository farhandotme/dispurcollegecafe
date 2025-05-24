// Database connecion via native driver cuz better auth needs native conneciton
import { MongoClient } from "mongodb";
const connectionString = process.env.MONGO_URI as string
if(!connectionString){
    console.log("Connection string is not available 🤬😠😡!!!!");
}
 const client = new MongoClient(connectionString);
 const db = client.db();   
 export  {db}

