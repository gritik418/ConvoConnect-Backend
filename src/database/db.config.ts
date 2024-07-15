import { connect } from "mongoose";

const MONGO_URI = process.env.DATABASE_URL!;

const connectDB = async () => {
  try {
    const { connection } = await connect(MONGO_URI);
    console.log(`Mongo connected: ${connection.host}`);
  } catch (error) {
    console.log(`Mongo error: ${error}`);
  }
};

export default connectDB;
