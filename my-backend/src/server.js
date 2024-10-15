const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const otpCache = {};

function generateOTP() {
  return randomstring.ge;
}
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your email provider's SMTP server
  port: 465, // Typically 587 or 465
  secure: true, // true for 465, false for other ports
  auth: {
    user: "lionelbao2002@gmail.com", // Your email
    pass: "ulgqtbejvytmeuss", // Your email password or app password
  },
});

app.get("/", (req, res) => {
  res.send("Hello from the Node.js backend!");
});

app.post("/request-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP

  // Send OTP email
  const mailOptions = {
    from: "lionelbao2002@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent to your email!", otp }); // Send OTP back for testing purposes
  } catch (error) {
    res.status(500).json({ error: "Error sending OTP" });
  }
});

app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!(email && otp)) throw Error("Empty OTP details are not allowed");

    const isVerified = await verifyUserEmail({ email, otp });
    if (!isVerified) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.status(200).json({ email, verified: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// app.post("/verify-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     // Check for missing email or OTP
//     if (!email || !otp) {
//       return res.status(400).json({ message: "Email and OTP are required." });
//     }

//     // Call your function to verify the user's email and OTP
//     const isVerified = await verifyUserEmail({ email, otp });

//     if (isVerified) {
//       return res.status(200).json({ email, verified: true });
//     } else {
//       return res.status(400).json({ message: "Invalid OTP." });
//     }
//   } catch (error) {
//     // Send error message as JSON response
//     return res.status(500).json({ message: error.message || "An unexpected error occurred." });
//   }
// });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server is running on http://192.168.1.10:${PORT}`);
// });
