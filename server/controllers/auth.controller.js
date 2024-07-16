import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
//& signup
export const signup = async (req, res) => {
  try {
    // signup logic
    const { firstName, lastName, emailOrPhone, password, dateOfBirth, gender } =
      req.body;

    // check if required fields are empty
    if (
      !firstName ||
      !lastName ||
      !emailOrPhone ||
      !password ||
      !dateOfBirth ||
      !gender
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check if first name and last name are valid
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return res.status(400).json({
        error: "First name and last name must only contain letters",
      });
    }

    // check if password is valid
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // if password is valid then hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // check if phone number is valid and bangladesh phone number and email is valid for signup
    const phoneOrEmailRegex =
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$|^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // check if email or phone number is valid
    if (!phoneOrEmailRegex.test(emailOrPhone)) {
      return res.status(400).json({ error: "Invalid email or phone number" });
    }

    // check if user already exists
    const checkByEmailOrPhone = await User.findOne({
      emailOrPhone,
    });

    // if user already exists then return error

    if (checkByEmailOrPhone) {
      return res.status(400).json({ error: "User already exists" });
    }

    // check if date of birth is valid
    if (new Date(dateOfBirth) > new Date()) {
      return res
        .status(400)
        .json({ error: "Date of birth cannot be in the future" });
    }

    // check if date of birth format is valid
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateOfBirth)) {
      return res.status(400).json({ error: "Invalid date of birth" });
    }

    // if user doesn't exist then create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      emailOrPhone,
      password: hashedPassword,
      dateOfBirth,
      gender,
    });

    if (newUser) {
      // generate token and set cookie function
      generateTokenAndSetCookie(newUser._id, res);
      //save user in database
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        emailOrPhone: newUser.emailOrPhone,
        password: newUser.password,
        date: newUser.dateOfBirth,
        gender: newUser.gender,
        friends: newUser.friends,
        friendRequests: newUser.friendRequests,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
    // json response
  } catch (error) {
    // error handling for signup
    console.log(`Error while signing up: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

//& login
export const login = async (req, res) => {
  try {
    // login logic
    const { emailOrPhone, password } = req.body;
    // check if required fields are empty
    if (!emailOrPhone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // check if user exists
    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    // generate token and set cookie function
    generateTokenAndSetCookie(user._id, res);
    // json response
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailOrPhone: user.emailOrPhone,
      password: user.password,
      date: user.dateOfBirth,
      gender: user.gender,
      friends: user.friends,
      friendRequests: user.friendRequests,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error) {
    // error handling for login
    console.log(`Error while logging in: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

//& logout
export const logout = async (req, res) => {
  try {
    // logout logic
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    // error handling for logout
    console.log(`Error while logging out: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

//& get me

export const getMe = async (req, res) => {
  try {
    // get me logic
    const user = await User.findById(req.user._id).select("-password");
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    // error handling for get me
    res.status(500).json({ error: "Internal server error" });
  }
};
