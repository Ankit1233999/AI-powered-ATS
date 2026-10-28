import nodemailer from "nodemailer";

let transporter;
function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) return null;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
  });
  return transporter;
}

const stageCopy = {
  applied: "Your application is now being reviewed by the hiring team.",
  interview: "We would like to move forward with an interview. The hiring team will contact you with scheduling details.",
  offered: "Congratulations! The hiring team would like to discuss an offer with you.",
};

export async function sendStageNotification({ applicant, job, stage }) {
  const mailer = getTransporter();
  if (!mailer) return { sent: false, reason: "Email is not configured." };
  await mailer.sendMail({
    from: process.env.SMTP_FROM,
    to: applicant.email,
    subject: `Update on your ${job.title} application`,
    text: `Hello ${applicant.name},\n\n${stageCopy[stage]}\n\nRole: ${job.title}\n\nThank you,\n${process.env.EMAIL_FROM_NAME || "Hiring Team"}`,
  });
  return { sent: true };
}
