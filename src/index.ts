import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
const port = 5000;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to databases");
});

// middleware to handle to json
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello",
  });
});

const server = app.listen(port, () => {
  //   if (err) {
  //     console.log(`Error in connecting to server : ${err}`);
  //   }

  console.log(`Succesfully connected to server: ${port}`);
});

server.on("error", (err: any) => {
  if (err) {
    console.log(`Error in connecting to server : ${err}`);
  }
});
