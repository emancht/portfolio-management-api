import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import { DecodeToken, EncodeToken } from "../utilities/tokenConfig.js";

// Register User
export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,

        });

        await newUser.save();

        res.status(201).json({ status: "success", msg: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Server error, please try again later" });
    }
};

// Login User
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ status: "fail", msg: "Missing required fields" });
        }

        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: "fail", msg: "Invalid email or password" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: "fail", msg: "Invalid email or password" });
        }

        // Generate JWT token and RefreshToken
        const token = EncodeToken(email);
        const { RefreshToken } = DecodeToken(token);

        // Set RefreshToken in a secure cookie
        res.cookie("Token", RefreshToken, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        res.status(200).json({ status: "success", msg: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Server error, please try again later" });
    }
};


// Logout User
export const Logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("Token");
        res.status(200).json({ status: "success", msg: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Server error, please try again later" });
    }
};
