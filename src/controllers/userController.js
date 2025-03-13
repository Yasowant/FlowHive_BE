const User = require('../models/User');
const Otp = require('../models/Otp');
const generateToken = require('../utils/generateToken');
const generateOtp = require('../utils/generateOtp');
const sendEmail = require('../services/emailService');
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
    });

    // ✅ Generate OTP
    const otp = generateOtp();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // ✅ Save OTP in DB
    await Otp.create({
      email,
      otp,
      expiresAt: otpExpiration,
    });

    // ✅ Send OTP via email to the user's email
    await sendEmail({
      to: email, // Send to user's email, not SMTP_USER
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    });

    res.status(201).json({
      message: 'User registered successfully. OTP sent to your email.',
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Registration failed', error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Generate token
      const token = generateToken(user._id);

      // Store token in database
      user.token = token;
      await user.save();

      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
