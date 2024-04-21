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
  const { email, password, conformPassword, type } = req.body;
  if (!email || !password || !conformPassword || !type) {
    return next(new ErrorHandler("Please provide full information!!", 400));
  }
  if (!conformPassword === password) {
    return next(new ErrorHandler("Passwords do not macth!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }

  if (type !== user.type) {
    return next(new ErrorHandler("You are not authorized for this Role", 400));
  }
  generateToken(user, "You are logged in successfully!", 200, res);
});

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, number, age, gender, password } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !number ||
    !age ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please provide full information!", 400));
  }
  const isAlreadyExist = await User.findOne({ email });
  if (isAlreadyExist) {
    return next(
      new ErrorHandler(
        `${isAlreadyExist.type} with this email already registered!`,
        400
      )
    );
  }

  const Admin = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    number: number,
    age: age,
    gender: gender,
    password: password,
    type: "Admin",
  });
  Admin
    ? res
        .status(200)
        .json({ success: true, message: "Admin Added Successfully!" })
    : res
        .status(400)
        .json({ success: false, message: "Failed to add new Admin!" });
});

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ type: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserInfo = catchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Admin logged out successfully!",
    });
});
export const logoutPatient = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Patient logged out successfully!",
    });
});
