const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function initAdmin() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'obc_rann_sangram',
      port: process.env.DB_PORT || 3306,
    });

    console.log('✅ Connected to MySQL database');

    // Hash password for admin123
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Check if admin exists
    const [existing] = await connection.execute(
      'SELECT * FROM admins WHERE username = ?',
      ['admin']
    );

    if (existing.length === 0) {
      // Insert admin
      await connection.execute(
        'INSERT INTO admins (username, password) VALUES (?, ?)',
        ['admin', hashedPassword]
      );
      console.log('✅ Default admin created: username=admin, password=admin123');
    } else {
      // Update password
      await connection.execute(
        'UPDATE admins SET password = ? WHERE username = ?',
        [hashedPassword, 'admin']
      );
      console.log('✅ Admin password updated');
    }

  } catch (error) {
    console.error('❌ Error initializing admin:', error.message);
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('⚠️  Database does not exist. Please run schema.sql first.');
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initAdmin();

