
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Optional: check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({ name, email, password, role });

    const token = generateToken(user._id); // pass ID to token
    res.status(201).json({ token });
  } catch (error) {
    console.error("Register Error:", error.message); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
}
exports.login = async (req, res) => {
  console.log()
  const { email, password } = req.body;
   console.log(email,password,"77777777777777777777")
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user);
  res.json({ token });
};
