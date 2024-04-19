import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "prc1",
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch(() => {
      console.log("DB Connection Failed");
    });
};
