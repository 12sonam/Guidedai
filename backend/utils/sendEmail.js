// import nodemailer from 'nodemailer';

// const sendEmail = async (options) => {
//     // 1) Create transporter
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     });

//     // 2) Define email options
//     const mailOptions = {
//         from: 'GuideDai <noreply@guidedai.com>',
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//         // html: options.html (if you want to send HTML emails)
//     };

//     // 3) Send email
//     await transporter.sendMail(mailOptions);
// };

// export default sendEmail;

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Verify email credentials
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('ERROR: Email credentials missing in .env file');
  console.error('Ensure EMAIL_USER and EMAIL_PASS are set');
  process.exit(1); // Exit process if credentials are missing
}

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Enable debug logs for troubleshooting
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server connection for sendEmail established successfully');
  }
});

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: {
        name: 'GuideDai',
        address: process.env.EMAIL_USER, // Use EMAIL_USER instead of noreply@guidedai.com
      },
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; padding: 10px 0;">
            <h1 style="color: #f97316;">GuideDai</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
            <h2 style="color: #333333; margin-bottom: 20px;">${options.subject}</h2>
            <p style="color: #666666; font-size: 16px; line-height: 1.5;">
              ${options.message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <div style="text-align: center; padding: 15px 0; font-size: 14px; color: #999999;">
            © ${new Date().getFullYear()} GuideDai. All rights reserved.
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.email}: Message ID ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Failed to send email to ${options.email}:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export default sendEmail;