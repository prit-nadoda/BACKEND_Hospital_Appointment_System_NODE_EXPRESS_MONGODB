import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";

export const petientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    number,
    age,
    gender,
    password,
    type,
    // doctorDepartment,
    // docAvatar,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !number ||
    !age ||
    !gender ||
    !password ||
    !type
  ) {
    return next(new ErrorHandler("Please fill all the fields!", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler(
        "User already Registrated with given Email Address!",
        400
      )
    );
  }

  const Petient = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    number: number,
    age: age,
    gender: gender,
    password: password,
    type: type,
    // doctorDepartment: doctorDepartment,
    // docAvatar: docAvatar,
  }).then(() => {
    res.status(200).json({
      success: true,
      message: "Petient registered successfully!",
    });
  });
});
