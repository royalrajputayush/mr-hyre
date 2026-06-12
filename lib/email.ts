import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOtpEmail(to: string, otp: string): Promise<boolean> {
  // Gmail credentials missing, skipping actual email send
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    // In development, log only that OTP was generated — NEVER log the OTP value itself
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEV] OTP generated for ${to} — check database for value.`);
    }
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"Mr. Hyre" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Your Mr. Hyre Verification Code",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #4F46E5;">Verify Your Email</h2>
          <p>Your one-time verification code is:</p>
          <div style="background: #F3F4F6; padding: 16px 24px; border-radius: 12px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111;">
            ${otp}
          </div>
          <p style="color: #6B7280; font-size: 14px; margin-top: 16px;">This code expires in 10 minutes. If you didn't request this, please ignore this email.</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

export function generateOtp(): string {
  // Use crypto for stronger randomness when available
  if (typeof globalThis.crypto !== "undefined" && globalThis.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return String(100000 + (array[0] % 900000));
  }
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendContactFormEmail(
  firstName: string,
  lastName: string,
  email: string,
  message: string
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || "support@mrhyre.ai";
  
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEV] Contact Form Submission from ${firstName} ${lastName} (${email}): ${message}`);
    }
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"Mr. Hyre Contact Form" <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #E5E7EB; border-radius: 16px;">
          <h2 style="color: #4F46E5; margin-bottom: 24px; font-weight: 800; tracking-tight;">New Contact Form</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4B5563; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #111827;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4B5563;">Email:</td>
              <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
          <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; border: 1px solid #F3F4F6;">
            <h4 style="margin-top: 0; margin-bottom: 8px; color: #374151; font-weight: 700;">Message:</h4>
            <p style="margin: 0; color: #4B5563; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${message}</p>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Contact Email send error:", error);
    return false;
  }
}

