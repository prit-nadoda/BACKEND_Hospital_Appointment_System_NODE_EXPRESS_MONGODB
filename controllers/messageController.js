import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, message } = req.body;
  if (!firstname || !lastname || !email || !message) {
    return next(new ErrorHandler("Please fill all the fields!", 400));
  }
  await Message.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    message: message,
  }).then(() => {
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  });
});
