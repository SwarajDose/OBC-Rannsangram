const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken } = require('./auth');

// Submit query form
router.post('/submit', async (req, res) => {
    try {
        const { fullName, mobile, message } = req.body;

        // Validate required fields
        if (!fullName || !mobile || !message) {
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

        // Insert into database
        const [result] = await pool.execute(
            `INSERT INTO queries 
       (full_name, mobile, message) 
       VALUES (?, ?, ?)`,
            [fullName, mobile, message]
        );

        const submissionId = result.insertId;

        res.json({
            success: true,
            message: 'Query submitted successfully',
            submissionId: submissionId
        });

    } catch (error) {
        console.error('Error submitting query:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get all queries (for admin) - requires authentication
router.get('/submissions', verifyToken, async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT 
        id,
        full_name as fullName,
        mobile,
        message,
        created_at as submittedAt
       FROM queries 
       ORDER BY created_at DESC`
        );

        res.json({
            success: true,
            data: rows,
            count: rows.length
        });

    } catch (error) {
        console.error('Error fetching queries:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Delete query (for admin) - requires authentication
router.delete('/submissions/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            'DELETE FROM queries WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Query not found'
            });
        }

        res.json({
            success: true,
            message: 'Query deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting query:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

module.exports = router;
