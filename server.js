const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const projects = require('./data/projects');

const app = express();
const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'bpavanqwe@gmail.com';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// Setup Nodemailer Transporter
function createTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  // Check if valid credentials are provided
  if (!user || !pass || pass === 'your_gmail_app_password') {
    return null; // Signals fallback / mock mode
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });
}

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Boddu Pavankalyan Portfolio & Booking API',
    mailServiceConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_gmail_app_password')
  });
});

// 2. Fetch all projects
app.get('/api/projects', (req, res) => {
  const { category } = req.query;
  let result = projects;

  if (category && category !== 'all') {
    result = projects.filter(p => p.category === category);
  }

  // Return list with essential card metadata
  res.json({
    success: true,
    total: result.length,
    projects: result
  });
});

// 3. Fetch specific project complete documentation by ID
app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id.toLowerCase() === id.toLowerCase());

  if (!project) {
    return res.status(404).json({
      success: false,
      message: `Project with ID '${id}' was not found.`
    });
  }

  res.json({
    success: true,
    project: project
  });
});

// 4. Book a Project Endpoint (Sends detailed project requirements to email)
app.post('/api/book-project', async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      company,
      projectType,
      timeline,
      estimatedBudget,
      projectRequirements,
      techPreferences,
      deadline
    } = req.body;

    // Validation
    if (!clientName || !clientEmail || !projectRequirements) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: Full Name, Email, and Project Requirements.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const submissionDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    // Formatted HTML Email for the Portfolio Owner
    const adminEmailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b1120; color: #f1f5f9; padding: 30px; border-radius: 12px; max-width: 680px; margin: 0 auto; border: 1px solid #1e293b;">
        <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="color: #60a5fa; margin: 0 0 6px 0; font-size: 24px;">🚀 New Project Booking Inquiry</h2>
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">Received via Boddu Pavankalyan's Portfolio on ${submissionDate} (IST)</p>
        </div>

        <!-- Client Information Card -->
        <div style="background: #1e293b; padding: 18px 24px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #38bdf8; margin: 0 0 12px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">👤 Client Information</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 6px 0; color: #94a3b8; width: 140px;"><strong>Name:</strong></td>
              <td style="padding: 6px 0; color: #ffffff;">${escapeHtml(clientName)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;"><strong>Email:</strong></td>
              <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(clientEmail)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(clientEmail)}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;"><strong>Phone / WhatsApp:</strong></td>
              <td style="padding: 6px 0; color: #ffffff;">${escapeHtml(clientPhone || 'Not provided')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;"><strong>Company / Org:</strong></td>
              <td style="padding: 6px 0; color: #ffffff;">${escapeHtml(company || 'Personal / Individual')}</td>
            </tr>
          </table>
        </div>

        <!-- Project Scope Details -->
        <div style="background: #1e293b; padding: 18px 24px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #a78bfa; margin: 0 0 12px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">📋 Project Scope & Budget</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 6px 0; color: #94a3b8; width: 140px;"><strong>Service Type:</strong></td>
              <td style="padding: 6px 0; color: #34d399; font-weight: bold;">${escapeHtml(projectType || 'Custom Full-Stack Development')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;"><strong>Timeline:</strong></td>
              <td style="padding: 6px 0; color: #ffffff;">${escapeHtml(timeline || 'Flexible')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;"><strong>Target Deadline:</strong></td>
              <td style="padding: 6px 0; color: #ffffff;">${escapeHtml(deadline || 'As discussed')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;"><strong>Estimated Budget:</strong></td>
              <td style="padding: 6px 0; color: #fbbf24; font-weight: bold;">${escapeHtml(estimatedBudget || 'To be determined')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;"><strong>Tech Preferences:</strong></td>
              <td style="padding: 6px 0; color: #ffffff;">${escapeHtml(techPreferences || 'Open to recommendations')}</td>
            </tr>
          </table>
        </div>

        <!-- Project Requirements -->
        <div style="background: #1e293b; padding: 18px 24px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="color: #38bdf8; margin: 0 0 12px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">📝 Detailed Requirements & Specifications</h3>
          <div style="background: #0f172a; padding: 16px; border-radius: 6px; border-left: 4px solid #3b82f6; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0;">
${escapeHtml(projectRequirements)}
          </div>
        </div>

        <div style="text-align: center; border-top: 1px solid #334155; padding-top: 18px;">
          <a href="mailto:${escapeHtml(clientEmail)}?subject=Re:%20Project%20Booking%20Discussion%20-%20Boddu%20Pavankalyan" 
             style="background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
             Reply Directly to Client
          </a>
        </div>
      </div>
    `;

    // Client Confirmation Auto-reply HTML
    const clientAutoReplyHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b1120; color: #f1f5f9; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
        <h2 style="color: #38bdf8; margin: 0 0 12px 0;">Hello ${escapeHtml(clientName)},</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">
          Thank you for reaching out and booking a project discussion with me! I have received your project requirements for 
          <strong style="color: #34d399;">${escapeHtml(projectType || 'Full-Stack Development')}</strong>.
        </p>
        <div style="background: #1e293b; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38bdf8;">
          <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 13px; text-transform: uppercase;">Summary of your request:</p>
          <p style="margin: 0 0 4px 0; font-size: 14px;"><strong>Timeline:</strong> ${escapeHtml(timeline || 'Flexible')}</p>
          <p style="margin: 0; font-size: 14px;"><strong>Budget:</strong> ${escapeHtml(estimatedBudget || 'To be determined')}</p>
        </div>
        <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">
          I will review your requirements and get back to you within <strong>24 hours</strong> with a detailed roadmap, architecture feasibility, and next steps.
        </p>
        <p style="font-size: 14px; color: #94a3b8; margin-top: 24px;">
          Best regards,<br/>
          <strong style="color: #ffffff;">Boddu Pavankalyan</strong><br/>
          Full-stack Developer & Backend Architect<br/>
          <a href="mailto:bpavanqwe@gmail.com" style="color: #38bdf8;">bpavanqwe@gmail.com</a>
        </p>
      </div>
    `;

    const transporter = createTransporter();

    if (transporter) {
      // 1. Send notification to owner
      await transporter.sendMail({
        from: `"${escapeHtml(clientName)} via Portfolio" <${process.env.EMAIL_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: clientEmail,
        subject: `🚀 New Project Booking: ${projectType || 'Web App'} by ${clientName}`,
        html: adminEmailHtml
      });

      // 2. Send auto-reply to client
      await transporter.sendMail({
        from: `"Boddu Pavankalyan" <${process.env.EMAIL_USER}>`,
        to: clientEmail,
        subject: `Project Booking Received: ${projectType || 'Web Development'}`,
        html: clientAutoReplyHtml
      });

      console.log(`[MAIL DISPATCH] Successfully sent emails for project booking from ${clientEmail}`);
    } else {
      // Fallback mode when SMTP credentials are not yet configured in .env
      console.log('----------------------------------------------------');
      console.log('📧 [MOCK EMAIL DISPATCH] Project Booking Received:');
      console.log(`To: ${RECIPIENT_EMAIL}`);
      console.log(`Client: ${clientName} (${clientEmail})`);
      console.log(`Project: ${projectType}`);
      console.log(`Budget: ${estimatedBudget}`);
      console.log(`Timeline: ${timeline}`);
      console.log(`Requirements:\n${projectRequirements}`);
      console.log('💡 To enable real Gmail sending, configure EMAIL_USER and EMAIL_PASS in .env');
      console.log('----------------------------------------------------');
    }

    return res.status(200).json({
      success: true,
      message: 'Your project requirements have been submitted successfully! Boddu Pavankalyan will review and email you shortly.',
      data: {
        clientName,
        clientEmail,
        projectType,
        submittedAt: submissionDate
      }
    });

  } catch (error) {
    console.error('Error handling /api/book-project:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process project booking request. Please try again or email directly at bpavanqwe@gmail.com.',
      error: error.message
    });
  }
});

// 5. General Contact Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address provided.'
      });
    }

    const transporter = createTransporter();

    if (transporter) {
      await transporter.sendMail({
        from: `"${escapeHtml(name)}" <${process.env.EMAIL_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: `💬 New Message from ${name} (Portfolio Contact)`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 8px;">
            <h3 style="color: #38bdf8;">New Message via Portfolio Contact Form</h3>
            <p><strong>From:</strong> ${escapeHtml(name)} (<a href="mailto:${escapeHtml(email)}" style="color: #60a5fa;">${escapeHtml(email)}</a>)</p>
            <p><strong>Message:</strong></p>
            <div style="background: #1e293b; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
        `
      });
    } else {
      console.log(`📧 [MOCK CONTACT MESSAGE] From: ${name} (${email}): ${message}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });
  } catch (error) {
    console.error('Error handling /api/contact:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please email directly at bpavanqwe@gmail.com.',
      error: error.message
    });
  }
});

// Helper function to escape HTML
function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`✨ Boddu Pavankalyan Portfolio Server Active!`);
  console.log(`🚀 Running at: http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - GET  /api/projects`);
  console.log(`   - GET  /api/projects/:id`);
  console.log(`   - POST /api/book-project`);
  console.log(`   - POST /api/contact`);
  console.log(`====================================================`);
});
