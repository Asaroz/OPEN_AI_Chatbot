import  mongoose  from "mongoose";


export async function  connect() {
    // Add mongoose connection event to follow what is happening with the connection
    mongoose.connection.on("error",         (e) => console.log("[M] Error", e));
    mongoose.connection.on("connecting",    (x) => console.log("[M] Connecting"));
    mongoose.connection.on("connected",     (x) => console.log("[M] Connected"));
    mongoose.connection.on("disconnecting", (x) => console.log("[M] Disconnecting"));
    mongoose.connection.on("disconnected",  (x) => console.log("[M] Disconnected"));
  
    // Destructure DB variables from environment variables
    // const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
    const DB_USER = "Admin"
    const DB_PASS = "Lars123"
    const DB_HOST = "localhost:27017"
    const DB_NAME = "Chatbot"
  
    // const connectionString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/`;

    
    const connectionString = `mongodb://Admin:myNewPassword@localhost:27017/Chatbot`
    
    return await mongoose.connect(connectionString);
  }