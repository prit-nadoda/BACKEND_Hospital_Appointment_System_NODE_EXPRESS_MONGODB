import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { checkApiKey, errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";

config({ path: "./config/config.env" });
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL_USER, process.env.FRONTEND_URL_ADMIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    Credential: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
// app.use("/api/v1/admin", userRouter);

dbConnection();
app.use(errorMiddleware);
app.use(checkApiKey);

export default app;
