const twilio = require('twilio');
require('dotenv').config();

let twilioClient = null;

// Initialize Twilio client if credentials are provided
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  console.log('✅ Twilio WhatsApp client initialized');
} else {
  console.log('⚠️  Twilio credentials not found. WhatsApp messaging will be disabled.');
}

/**
 * Send WhatsApp message to user
 * @param {string} to - Phone number in format: +91XXXXXXXXXX
 * @param {string} message - Message to send
 * @returns {Promise} - Twilio response
 */
const sendWhatsAppMessage = async (to, message) => {
  if (!twilioClient) {
    console.log('⚠️  WhatsApp client not initialized. Message not sent.');
    return { success: false, message: 'WhatsApp service not configured' };
  }

  try {
    // Format phone number (ensure it starts with +91 for India)
    let formattedNumber = to.trim();
    if (!formattedNumber.startsWith('+')) {
      if (formattedNumber.startsWith('91')) {
        formattedNumber = '+' + formattedNumber;
      } else if (formattedNumber.startsWith('0')) {
        formattedNumber = '+91' + formattedNumber.substring(1);
      } else {
        formattedNumber = '+91' + formattedNumber;
      }
    }
    
    // Ensure it's in WhatsApp format
    const whatsappTo = `whatsapp:${formattedNumber}`;
    const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';

    const messageResponse = await twilioClient.messages.create({
      from: whatsappFrom,
      to: whatsappTo,
      body: message
    });

    console.log(`✅ WhatsApp message sent to ${formattedNumber}: ${messageResponse.sid}`);
    return { success: true, messageId: messageResponse.sid };
  } catch (error) {
    console.error('❌ Error sending WhatsApp message:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWhatsAppMessage,
  twilioClient
};

