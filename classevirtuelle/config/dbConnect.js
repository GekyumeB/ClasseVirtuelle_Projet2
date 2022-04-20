import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState > 0) {
    return;
  }

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnect;
