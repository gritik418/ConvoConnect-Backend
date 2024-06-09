import { connect } from "mongoose";
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
const connectToDB = async () => {
    try {
        const { connection } = await connect(mongoURI, {
            dbName: "ConvoConnect",
        });
        console.log(`Mongo connected: ${connection.host}`);
    }
    catch (error) {
        console.log(`Mongo Error: ${error}`);
    }
};
export default connectToDB;
