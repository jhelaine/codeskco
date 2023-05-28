import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

export default async function handler(req, res) {
    // console.log('req.method', req.method);
    // if (req.method = 'POST') {
    //     const { name, email, message } = req.body;
    //     res.status(200).json({ name: name });
    // } else {
    //     res.status(405).json({ message: 'Method not allowed' });
    // }
    
  if (req.method = 'POST') {
    const { name, email, message, subject } = req.body;
    console.log('req.body', req.body)
    // Validate the form inputs (e.g., presence, format, etc.)

    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        // secure: true,
        secureConnection: true, // TLS requires secureConnection to be false
        // tls: {
        //     ciphers:'SSLv3'
        // },
        // requireTLS:true,
        auth: {
          user: 'info@codeskca.com',
          pass: '9jb#2nrrFjiE500',
        },
        debug: true
      });

    // Create the email message
    const mailOptions = {
      from: 'info@codeskca.com',
      to: 'codesk.ca@gmail.com',
      cc: 'jhelainekimberly.deleon2015@gmail.com',
      subject: 'New Contact Form Submission Subject: ' + subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}