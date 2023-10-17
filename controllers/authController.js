// Import necessary modules and models
const User = require('../models/userModel'); // Import your User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto');
// Import jsonwebtoken for token generation



function generateSecretKey() {
    const secret = crypto.randomBytes(32).toString('base64url');
    return secret;
}

console.log(generateSecretKey());

// User authentication (login)
const authenticateUser = async (req, res) => {
  try {
    // Extract user credentials from the request body
    const { username, password } = req.body;

    // Find the user in the database by username
    const user = await User.findOne({ username });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
    }

    // If authentication is successful, generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', {
      expiresIn: '1h', // Token expiration time
    });

    // Return a success message and the generated token
    return res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    // Handle any errors that occur during authentication
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// User authorization (role-based access control)
const authoriseUser = (req, res, next) => {
  try {
    // Check the user's role or permissions here
    // You can use information from the JWT token or the user object stored in the request to determine authorization

    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Authorization denied. Token not provided.' });
    }

    jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Authorization denied. Invalid token.' });
      }

      const { userId, username } = decodedToken;

      // You can fetch user data from the database or use the decoded token information
      // For simplicity, we assume the user has a role property in the decoded token
      if (decodedToken.role === 'admin') {
        // Allow access to the protected resource
        req.user = { userId, username, role: 'admin' };
        next();
      } else {
        // Deny access if the user doesn't have the required role/permissions
        return res.status(403).json({ message: 'Authorization denied. Insufficient permissions.' });
      }
    });
  } catch (error) {
    // Handle any errors that occur during authorization
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
const registerUser = async (req, res) => {
  try {
    // Extract user registration data from the request body
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken. Please choose a different one.' });
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// User logout
const logoutUser = (req, res) => {
  try {
    // Handle user logout logic, e.g., invalidate the token if using JWT
    // You can also clear any session data if using session-based authentication

    return res.status(200).json({ message: 'User logout successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the auth controller
module.exports = {
  authenticateUser,
  authoriseUser,
  registerUser,
  logoutUser,
};