// sendEmail.js
const nodemailer = require('nodemailer');

// 1) Create transporter
//    If using Gmail, set up an App Password or 'less secure apps' (not recommended for production).
//    For other providers, replace host, port, auth, etc.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'taulantpeci8@gmail.com',
    pass: 'fkrf svuk pwdh wjfq' // or an App Password
  }
});

// 2) A simple function to send email
async function sendSimpleEmail(to, subject, message) {
  const mailOptions = {
    from: 'taulantpeci8@gmail.com', // The same email as user in auth
    to,                         // e.g. "student@example.com"
    subject,                    // e.g. "Class Cancellation"
    text: message              // e.g. "Today's class is canceled."
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendSimpleEmail };
