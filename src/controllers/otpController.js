const Otp = require('../models/Otp');

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const existingOtp = await Otp.findOne({ email, otp });
    if (!existingOtp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (existingOtp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    await Otp.deleteOne({ email });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'OTP verification failed', error: error.message });
  }
};

module.exports = { verifyOtp };
