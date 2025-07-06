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
    text: `Your verification code for user registration: ${verificationCode} | Sent from: Oylkka Graphics`,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 20px 40px; text-align: center; background-color: #7C3AED; color: #ffffff; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; color:#FFFFFF; font-size: 24px;">Welcome to Oylkka Graphics</h1>
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
            <p style="font-size: 14px; color: #999999;">Sent from Oylkka Graphics | © ${new Date().getFullYear()} Oylkka Graphics</p>
          </td>
        </tr>
      </table>
    </div>
  `,
  };

  await transporter.sendMail(mailData);
}
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function sendWelcomeEmail(email: string) {
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
    from: `"Oylkka Graphics" <${process.env.SMTP_SENDER}>`,
    to: email,
    subject: "🎉 Welcome to Oylkka Graphics! Let’s Get Started!",
    text: `Thank you for subscribing to Oylkka Graphics! We're thrilled to have you with us. Stay tuned for updates, resources, and more!`,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px;">
      <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 6px 12px rgba(0,0,0,0.15); overflow: hidden;">

        <!-- Header -->
        <tr style="background-color: #7C3AED;">
          <td style="padding: 20px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 26px;">Welcome to Oylkka Graphics</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 40px;">
            <h2 style="color: #333333; font-size: 24px;">Hello and Welcome!</h2>
            <p style="font-size: 16px; color: #555555; line-height: 1.6;">
              We're thrilled to have you join the Oylkka Graphics community! You'll now be the first to know about our latest content, updates, and exclusive resources, all curated just for you.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${siteUrl}" style="display: inline-block; background-color: #7C3AED; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: bold;">
               Visit Oylkka Graphics
              </a>
            </div>

            <p style="font-size: 16px; color: #555555; line-height: 1.6;">
              Here’s a sneak peek of what you can expect:
            </p>
            <ul style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 20px;">
              <li>🔥 Access to our latest blog posts and resources</li>
              <li>✨ Free design tips to improve your skills</li>
              <li>🌐 Invitations to upcoming webinars and events</li>
            </ul>
            <p style="font-size: 16px; color: #555555;">
              We’re excited to support your creative journey. Let’s create something amazing together!
            </p>
          </td>
        </tr>

        <!-- Unsubscribe -->
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f4f4f4; color: #999999; font-size: 14px;">
            <p style="margin: 0;">If you prefer not to receive updates, you can <a href="${siteUrl}/unsubscribe?email=${email}" style="color: #7C3AED; text-decoration: none;">unsubscribe</a> at any time.</p>
            <p style="margin: 0;">© ${new Date().getFullYear()} Oylkka Graphics | All rights reserved.</p>
          </td>
        </tr>
      </table>
    </div>
  `,
  };

  await transporter.sendMail(mailData);
}

export async function sendRegistrationEmail(email: string) {
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
    from: `"Oylkka Graphics" <${process.env.SMTP_SENDER}>`,
    to: email,
    subject: "🎉 Welcome to Oylkka Graphics! Let’s Get Started!",
    text: `Thank you for joining Oylkka Graphics! We're thrilled to have you with us. Stay tuned for updates, resources, and more!`,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px;">
      <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 6px 12px rgba(0,0,0,0.15); overflow: hidden;">

        <!-- Header -->
        <tr style="background-color: #7C3AED;">
          <td style="padding: 20px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 26px;">Welcome to Oylkka Graphics</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 40px;">
            <h2 style="color: #333333; font-size: 24px;">Hello and Welcome!</h2>
            <p style="font-size: 16px; color: #555555; line-height: 1.6;">
              We're thrilled to have you join the Oylkka Graphics community! You'll now be the first to know about our latest content, updates, and exclusive resources, all curated just for you.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${siteUrl}" style="display: inline-block; background-color: #7C3AED; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: bold;">
               Visit Oylkka Graphics
              </a>
            </div>

            <p style="font-size: 16px; color: #555555; line-height: 1.6;">
              Here’s a sneak peek of what you can expect:
            </p>
            <ul style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 20px;">
              <li>🔥 Access to our latest blog posts and resources</li>
              <li>✨ Free design tips to improve your skills</li>
              <li>🌐 Invitations to upcoming webinars and events</li>
            </ul>
            <p style="font-size: 16px; color: #555555;">
              We’re excited to support your creative journey. Let’s create something amazing together!
            </p>
          </td>
        </tr>

        <!-- Unsubscribe -->
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f4f4f4; color: #999999; font-size: 14px;">
            <p style="margin: 0;">If you prefer not to receive updates, you can <a href="${siteUrl}/unsubscribe?email=${email}" style="color: #7C3AED; text-decoration: none;">unsubscribe</a> at any time.</p>
            <p style="margin: 0;">© ${new Date().getFullYear()} Oylkka Graphics | All rights reserved.</p>
          </td>
        </tr>
      </table>
    </div>
  `,
  };

  await transporter.sendMail(mailData);
}
