"use server"
import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USERNAME as string,  // my email
    pass: process.env.GMAIL_PASSWORD as string,
  },
});
interface sendEmailProps {
  to: string,
  subject: string,
  text: string,
}
const sendEmail = async ({ to, text, subject }: sendEmailProps) => {
  await transporter.sendMail({
    from: `"Beanzy Cafe Support" <${process.env.GMAIL_USERNAME}>`,
    to,
    subject,
    html: `
 <html>
  <body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #2c1e1b; color: #fef6e4;">
    <div style="
      max-width: 600px;
      margin: 40px auto;
      background-color: #3b2a26;
      padding: 30px;
      border: 4px solid transparent;
      border-image: linear-gradient(135deg, #d2691e, #8b4513, #a0522d) 1;
      border-radius: 16px;
      box-shadow:
        0 0 25px rgba(255, 248, 220, 0.1),
        0 0 40px rgba(139, 69, 19, 0.5);
    ">
      <h2 style="
        text-align: center;
        color: #ffddaa;
        text-shadow: 0 0 5px #c97a40;
        margin-bottom: 30px;
      ">
        ☕ Beanzy Café Password Reset
      </h2>

      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        Hello,
      </p>

      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        You requested to reset your password. Use the link below:
      </p>

      <div style="
        background: #5c3b33;
        padding: 14px 18px;
        color: #ffe5b4;
        font-size: 15px;
        word-break: break-all;
        border-left: 4px solid #ffb347;
        border-radius: 8px;
        margin-bottom: 20px;
        box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
      ">
        ${text}
      </div>

      <p style="font-size: 14px; color: #e0c4aa; margin-bottom: 10px;">
        This link will expire in <strong>10 minutes</strong>.
      </p>

      <p style="font-size: 14px; color: #bfae9c;">
        If you didn’t request this, please ignore this email. Your account remains secure.
      </p>

      <div style="
        margin-top: 50px;
        padding:20px;
        text-align: center;
        background-color: #1a1310;
        border-radius: 0 0 12px 12px;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
      ">
        <span style="font-size: 14px; color: #fdf5e6;">— From Brew Café</span>
        <span style="
          display: inline-block;
          margin-left: 6px;
          animation: spin 5s linear infinite;
          color: #ffddaa;
        ">☕</span>
      </div>
    </div>

    <!-- Keyframes for coffee cup rotation -->
    <style>
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  </body>
</html>
  `,
  })
}

export default sendEmail