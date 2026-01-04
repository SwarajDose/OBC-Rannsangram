const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // Find admin in database
    const [admins] = await pool.execute(
      'SELECT * FROM admins WHERE username = ?',
      [username]
    );

    if (admins.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    const admin = admins[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'obc-rann-sangram-secret-key-2024',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Verify Token (middleware helper)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided. Access denied.' 
    });
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'obc-rann-sangram-secret-key-2024'
    );
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

// Verify admin token endpoint
router.get('/verify', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    admin: req.admin
  });
});

module.exports = router;
module.exports.verifyToken = verifyToken;

