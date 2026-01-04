const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken } = require('./auth');

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { fullName, mobile, state, district, taluka, village, pincode } = req.body;

    // Validate required fields
    if (!fullName || !mobile || !state || !district || !taluka || !village || !pincode) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate mobile number (should be 10 digits)
    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid mobile number. Please enter 10 digits.' 
      });
    }

    // Validate pincode (should be 6 digits)
    if (!/^[0-9]{6}$/.test(pincode)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid pincode. Please enter 6 digits.' 
      });
    }

    // Insert into database
    const [result] = await pool.execute(
      `INSERT INTO contact_submissions 
       (full_name, mobile, state, district, taluka, village, pincode) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [fullName, mobile, state, district, taluka, village, pincode]
    );

    const submissionId = result.insertId;

    res.json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submissionId
    });

  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Get all submissions (for admin) - requires authentication
router.get('/submissions', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT 
        id,
        full_name as fullName,
        mobile,
        state,
        district,
        taluka,
        village,
        pincode,
        whatsapp_sent as whatsappSent,
        created_at as submittedAt
       FROM contact_submissions 
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Delete submission (for admin) - requires authentication
router.delete('/submissions/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM contact_submissions WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Submission not found' 
      });
    }

    res.json({
      success: true,
      message: 'Submission deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

module.exports = router;

