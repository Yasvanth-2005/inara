import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Checking Username
    const user1 = await User.findOne({ username });
    if (user1) {
      return res.status(400).json({ message: "Username Already Exists" });
    }

    // Checking Email
    const user2 = await User.findOne({ email });
    if (user2) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    // Creating jwt token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    newUser.password = "";
    return res
      .status(201)
      .json({ message: "User Registered Successfully", token, user: newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .populate("authorId")
      .populate({
        path: "savedBooks",
        populate: {
          path: "author",
        },
      });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email/Password" });
    }

    // Check Password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(404).json({ message: "Invalid Email/Password" });
    }

    // Creating jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.password = "";
    return res
      .status(200)
      .json({ message: "Logged in Successfully", token, user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editUser = async (req, res) => {
  const userId = req.userId;
  const image = req.file ? req.file.filename : "";

  const { bio, favGenres } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        bio,
        image,
        favGenres,
      },
      {
        new: true,
      }
    )
      .populate("authorId")
      .populate({
        path: "savedBooks",
        populate: {
          path: "author",
        },
      });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Profile Updated successfully", user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId)
      .populate("authorId")
      .populate({
        path: "savedBooks",
        populate: {
          path: "author",
        },
      });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const topupBalance = async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;

  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Topup Successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Internal Server Error" });
  }
};
