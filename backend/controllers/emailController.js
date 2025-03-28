const nodemailer = require('nodemailer');

// You can also move this to a config file
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // yourEmail@gmail.com
    pass: process.env.EMAIL_PASS, // your App Password or Gmail password
  },
});

// Send a custom email
const sendEmail = async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "to, subject, and message are required." });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

    res.status(200).json({ success: true, info: info.response });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};

module.exports = {
  sendEmail,
};
