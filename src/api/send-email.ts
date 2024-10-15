import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { dishes } = req.body;

    if (!dishes || dishes.length === 0) {
      return res.status(400).json({ message: 'No dishes selected' });
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECEIVER_EMAIL, // Your email
      subject: 'Dish Selection',
      text: `Your girlfriend wants to eat: ${dishes.join(', ')}`,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
