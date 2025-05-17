const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * User Registration
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the user
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role 
    });

    // 4. Return minimal user info
    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

/**
 * User Login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Generate token with userId + role
    const token = jwt.sign(
      { userId: user.id, role: user.role }, 
      process.env.JWT_SECRET
      // { expiresIn: '1d' }
    );

    // 4. Return the token and user info
    res.json({ 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};


/**
 * User Logout – cookie edition
 * Simply clears the “token” cookie so the browser no longer sends it.
 */
exports.logout = (req, res) => {
  // Same cookie options you used when LOGIN set the cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res.json({ message: 'Logged out successfully' });
};
