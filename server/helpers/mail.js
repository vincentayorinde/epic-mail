import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

const ResetPassword = {
// async..await is not allowed in global scope, must use a wrapper
  async reset(email, token) {
  // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      pool: true,
      host: 'smtp-relay.gmail.com',
      port: 465,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: `"Support 👻" <${process.env.EMAIL}>`, // sender address
      to: email, // list of receivers
      subject: 'EPIC Mail - Password Reset', // Subject line
      text: `You are receiving this email because you or (someone else) has requested the reset of your password
      please click the link below, or past this into your browser to complete the process
      http://localhost:5000/reset-password/${token} \n\n
      If you did not request this, please ignore this email, your password will remain unchanged `, // plain text body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions);
  },

};

export default ResetPassword;
