import nodemailer from 'nodemailer';

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  ip?: string;
}

let transporterInstance: nodemailer.Transporter | null = null;

/**
 * Get or initialize Nodemailer transporter lazily.
 * Fallbacks gracefully to Ethereal / Test Transport if SMTP credentials are missing.
 */
export async function getTransporter(): Promise<nodemailer.Transporter> {
  if (transporterInstance) {
    return transporterInstance;
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    console.log(`[Vyzorax Mailer] Initializing production SMTP transporter with ${host}:${port} (${user})`);
    transporterInstance = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false, // Prevent issues with self-signed certificates in dev
      },
    });
  } else {
    console.warn(
      '[Vyzorax Mailer] SMTP_USER or SMTP_PASS missing. Generating Ethereal test account for development mail delivery...'
    );
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log(`[Vyzorax Mailer] Ethereal test account created: ${testAccount.user}`);
      transporterInstance = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (err) {
      console.error('[Vyzorax Mailer] Failed to create Ethereal test account, using JSON stream transport:', err);
      transporterInstance = nodemailer.createTransport({
        jsonTransport: true,
      });
    }
  }

  return transporterInstance;
}

/**
 * Send contact inquiry emails via Nodemailer / SMTP / Ethereal:
 * 1) Admin email notification (Data sent to contact@vyzorax.com / ADMIN_EMAIL)
 * 2) Auto-responder notification to the user ("We will get back to you")
 */
export async function sendContactEmails(data: ContactFormData): Promise<{
  adminMailSent: boolean;
  userMailSent: boolean;
  provider: 'nodemailer';
  previewUrl?: string | false;
}> {
  const { name, email, subject = 'General Inquiry', message, ip = 'Unknown' } = data;
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'contact@vyzorax.com';
  const fromEmail = process.env.SMTP_USER || 'no-reply@vyzorax.com';

  const transporter = await getTransporter();

  // 1. Email to Admin / Owner with form submission details
  const adminMailOptions = {
    from: `"Vyzorax Contact Form" <${fromEmail}>`,
    to: adminEmail,
    replyTo: `"${name}" <${email}>`,
    subject: `[Vyzorax Inquiry] ${subject} - from ${name}`,
    text: `
NEW CONTACT FORM SUBMISSION ON VYZORAX.COM
-------------------------------------------
Sender Name : ${name}
Sender Email: ${email}
Subject     : ${subject}
IP Address  : ${ip}
Received At : ${new Date().toLocaleString()}

MESSAGE CONTENT:
${message}

-------------------------------------------
Reply directly to this email to respond to ${name} (${email}).
    `.trim(),
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border: 1px solid #334155; border-radius: 12px; padding: 24px;">
  <div style="border-b: 1px solid #334155; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="color: #f43f5e; margin: 0; font-size: 20px;">📥 New Contact Inquiry — Vyzorax.com</h2>
    <p style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Received on ${new Date().toLocaleString()}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
    <tr>
      <td style="padding: 8px; font-weight: bold; color: #cbd5e1; width: 120px;">Sender Name:</td>
      <td style="padding: 8px; color: #ffffff;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 8px; font-weight: bold; color: #cbd5e1;">Sender Email:</td>
      <td style="padding: 8px; color: #38bdf8;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: underline;">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px; font-weight: bold; color: #cbd5e1;">Subject:</td>
      <td style="padding: 8px; color: #ffffff;">${subject}</td>
    </tr>
    <tr>
      <td style="padding: 8px; font-weight: bold; color: #cbd5e1;">Sender IP:</td>
      <td style="padding: 8px; color: #94a3b8; font-family: monospace;">${ip}</td>
    </tr>
  </table>

  <div style="background-color: #1e293b; border-left: 4px solid #f43f5e; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
    <h4 style="margin: 0 0 8px 0; color: #f8fafc; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</h4>
    <p style="margin: 0; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
  </div>

  <div style="font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #334155; padding-top: 12px;">
    You can reply directly to this email to reach <strong>${email}</strong>.
  </div>
</div>
    `.trim(),
  };

  // 2. Automated Confirmation Email to the User ("We will get back to you")
  const userMailOptions = {
    from: `"Vyzorax Support" <${fromEmail}>`,
    to: email,
    subject: `We received your message - Vyzorax.com Support`,
    text: `
Hi ${name},

Thank you for reaching out to Vyzorax.com!

We have successfully received your inquiry regarding "${subject}". Our support team is currently reviewing your message, and WE WILL GET BACK TO YOU as soon as possible (typically within 24 business hours).

SUMMARY OF YOUR MESSAGE:
-------------------------------------------
${message}
-------------------------------------------

If you have any additional details or urgency, feel free to reply directly to this email or reach us at contact@vyzorax.com / +91 9339316583.

Best regards,
Vyzorax.com Support Team
Website: https://vyzorax.com
Email  : contact@vyzorax.com
Phone  : +91 9339316583
    `.trim(),
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border: 1px solid #334155; border-radius: 12px; padding: 24px;">
  <div style="text-align: center; border-b: 1px solid #334155; padding-bottom: 16px; margin-bottom: 20px;">
    <h1 style="color: #f43f5e; font-size: 24px; margin: 0; font-weight: 800; tracking: -0.5px;">VYZORAX.COM</h1>
    <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0 0;">Free Online Instagram Reels Downloader</p>
  </div>

  <div style="margin-bottom: 20px;">
    <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">Hi ${name}, 👋</h2>
    <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
      Thank you for contacting us! We have received your inquiry regarding <strong>"${subject}"</strong>.
    </p>
    <div style="background-color: #10b98115; border: 1px solid #10b98140; border-radius: 8px; padding: 14px; margin: 16px 0; text-align: center;">
      <p style="margin: 0; color: #34d399; font-size: 15px; font-weight: bold;">
        ✨ We will get back to you shortly!
      </p>
      <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px;">
        Our support team usually responds within 24 business hours.
      </p>
    </div>
  </div>

  <div style="background-color: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
    <p style="margin: 0 0 6px 0; color: #94a3b8; font-size: 11px; text-transform: uppercase; font-weight: bold;">Copy of your submitted message:</p>
    <p style="margin: 0; color: #e2e8f0; font-size: 13px; line-height: 1.5; font-style: italic; white-space: pre-wrap;">"${message}"</p>
  </div>

  <div style="border-t: 1px solid #334155; padding-top: 16px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
    <p style="margin: 0 0 4px 0; font-weight: bold; color: #f8fafc;">Need immediate assistance?</p>
    <p style="margin: 0;">
      Email: <a href="mailto:contact@vyzorax.com" style="color: #f43f5e; text-decoration: none;">contact@vyzorax.com</a> |
      Phone: <a href="tel:+919339316583" style="color: #f43f5e; text-decoration: none;">+91 9339316583</a>
    </p>
  </div>

  <div style="margin-top: 20px; font-size: 11px; color: #64748b; text-align: center;">
    © ${new Date().getFullYear()} Vyzorax.com Digital. All rights reserved.
  </div>
</div>
    `.trim(),
  };

  let adminMailSent = false;
  let userMailSent = false;
  let previewUrl: string | false = false;

  try {
    const adminInfo = await transporter.sendMail(adminMailOptions);
    adminMailSent = true;
    console.log(`[Vyzorax Mailer] Admin notification sent successfully: ${adminInfo.messageId}`);

    // If Ethereal test account was generated, retrieve preview URL for easy developer testing
    const testPreview = nodemailer.getTestMessageUrl(adminInfo);
    if (testPreview) {
      previewUrl = testPreview;
      console.log(`[Vyzorax Mailer] Ethereal Email Preview URL: ${testPreview}`);
    }
  } catch (err) {
    console.error('[Vyzorax Mailer] Error sending admin email via Nodemailer:', err);
  }

  try {
    const userInfo = await transporter.sendMail(userMailOptions);
    userMailSent = true;
    console.log(`[Vyzorax Mailer] User auto-reply sent successfully to ${email}: ${userInfo.messageId}`);
  } catch (err) {
    console.error('[Vyzorax Mailer] Error sending user auto-reply email via Nodemailer:', err);
  }

  return { adminMailSent, userMailSent, provider: 'nodemailer', previewUrl };
}

