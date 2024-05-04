import express from "express";
import mongoose  from "mongoose";
import dotenv from "dotenv"
import postRoutes from "./routes/crudRoutes.js";
import cors from "cors";
import authRoutes from "./routes/userRoutes.js";


 const app = express();
 dotenv.config();
 const PORT = 8000;

 const connect = () => {

    mongoose.connect(process.env.MONGO_URL)
     
    .then(() => {
        console.log(`connected to DB`);
      })
      .catch((err) => {
        throw err;
      });
  };

  // middlewares
  app.use(express.json());
  app.use(cors());

 //routes

 app.use("/api/post", postRoutes);
 app.use("/api/auth", authRoutes);

 app.listen(PORT, ()=>{
    console.log(`server chal gya port number ${PORT}`);
    connect()
 })