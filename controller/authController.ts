import User from "../model/User";
import {generateAccessToken, generateRefreshToken} from "../util/generateToken";
import jwt, {Secret} from "jsonwebtoken";


/**
 * @desc   User Sign Up
 * @route  POST /api/auth/signup
 * @access Public
 */
export const signUpUser = async (req: any, res: any) => {
    const { fullName, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email. Use another email." });
        }

        // Create new user
        const user = new User({
            fullName,
            email,
            password, // Will be hashed automatically in pre-save middleware
        });

        await user.save();

        // Generate tokens
        const accessToken = generateAccessToken(user._id as string);
        const refreshToken = generateRefreshToken(user._id as string);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            createdOn: user.createdOn,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Error in signUpUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc   User Sign In
 * @route  POST /api/auth/signin
 * @access Public
 */
export const signInUser = async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the password is correct
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id as string);
        const refreshToken = generateRefreshToken(user._id as string);

        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            createdOn: user.createdOn,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Error in signInUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc   Refresh Access Token
 * @route  POST /api/auth/refresh
 * @access Public
 */
export const refreshToken = async (req: any, res: any) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        // Verify refresh token
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as Secret) as { userId: string };
        const newAccessToken = generateAccessToken(payload.userId);

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Error in refreshToken:", error);
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};
