# OBC Rann Sangram Backend API

Backend server for OBC Rann Sangram Platform with MySQL database and WhatsApp integration.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup (XAMPP)

1. Start XAMPP and ensure MySQL is running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Import the database schema:
   - Go to phpMyAdmin
   - Click on "Import" tab
   - Select `database/schema.sql` file
   - Click "Go" to import

Alternatively, you can run the SQL commands manually from `database/schema.sql`

### 3. Environment Configuration

1. Copy `.env.example` to `.env`
2. Update the following variables in `.env`:
   - `DB_PASSWORD`: Your MySQL password (if set)
   - `JWT_SECRET`: Secret key for JWT tokens
   - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
   - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
   - `TWILIO_WHATSAPP_FROM`: Your Twilio WhatsApp number

### 4. Default Admin Credentials

After running the schema, default admin credentials are:
- Username: `admin`
- Password: `admin123`

**Important**: Change the default password after first login in production!

### 5. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Contact Form
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/submissions` - Get all submissions (requires auth)
- `DELETE /api/contact/submissions/:id` - Delete submission (requires auth)

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token (requires auth)

### Health Check
- `GET /api/health` - Server health check

## WhatsApp Integration

The backend uses Twilio for WhatsApp messaging. To set up:

1. Create a Twilio account at https://www.twilio.com
2. Get your Account SID and Auth Token
3. Set up a WhatsApp sandbox or use Twilio's WhatsApp API
4. Add credentials to `.env` file

When a user submits the form, a WhatsApp message will be automatically sent to their mobile number.

## Database Schema

- `admins`: Stores admin credentials
- `contact_submissions`: Stores form submissions with WhatsApp status

