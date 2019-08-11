import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const smsPackage = {
  async sendSMS(sender, phone, subject, body) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountSid, authToken);
    await client.messages
      .create({
        body: `From ${sender}: ${subject}-${body}`,
        from: '+12028838471',
        to: phone,
        rejectUnauthorized: false, // add when working with https sites
        requestCert: false, // add when working with https sites
        agent: false, // add when working with https sites
      });
    // .then(message => console.log(message.sid));
  },
};

export default smsPackage;
