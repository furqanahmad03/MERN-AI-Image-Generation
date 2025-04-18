import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));

// err handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from server',
  });
});

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(8080, () => {
      console.log(`Server is running on port ${8080}`);
    });
  } catch (error) {
    console.log(error);
  }
  
}
startServer();