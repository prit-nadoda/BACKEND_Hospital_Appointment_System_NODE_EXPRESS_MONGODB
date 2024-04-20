import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwkToken.js";

export const patientRegister = catchAsyncError(async (req, res, next) => {
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

  let isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return next(
      new ErrorHandler(
        "User already Registrated with given Email Address!",
        400
      )
    );
  }

  const user = await User.create({
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
  });
  generateToken(user, "patient registered successfully!", 200, res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, conformPassword } = req.body;
  if (!email || !password || !conformPassword) {
    return next(new ErrorHandler("Please provide full information!!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isPasswordMatched = await user.conformPassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Passwords do not macth!", 400));
  }
  if (role !== user.role) {
    return next(
      new ErrorHandler("You are not authorized to access this resource", 400)
    );
  }
  generateToken(user, "You are logged in successfully!", 200, res);
});
