import nodemailer from "nodemailer";

export default async function sendVerificationEmail(
  email: string,
  verificationCode: string,
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailData = {
    from: process.env.SMTP_SENDER,
    to: email,
    subject: "User Registration Verification Code",
    text: `Your verification code for user registration: ${verificationCode} | Sent from: MHN Graphics`,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 20px 40px; text-align: center; background-color: #7C3AED; color: #ffffff; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; color:#FFFFFF; font-size: 24px;">Welcome to MHN Graphics</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px;">
            <h2 style="color: #333333; font-size: 22px; margin-bottom: 20px;">Verify Your Email</h2>
            <p style="font-size: 16px; color: #555555;">Thanks for registering! Please verify your email address by using the verification code below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 36px; font-weight: bold; color: #7C3AED; letter-spacing: 4px;">${verificationCode}</p>
            </div>
            <p style="font-size: 16px; color: #555555;">If you did not request this verification, you can safely ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 40px; background-color: #f4f4f4; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="font-size: 14px; color: #999999;">Sent from MHN Graphics | © ${new Date().getFullYear()} MHN Graphics</p>
          </td>
        </tr>
      </table>
    </div>
  `,
  };

  await transporter.sendMail(mailData);
}
