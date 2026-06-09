/**
 * Contact Form API Route
 * 
 * Handles contact form submissions:
 * 1. Sends email notification via Gmail SMTP (Nodemailer)
 * 2. Logs submission to Google Sheets (optional)
 */

import { NextRequest, NextResponse, after } from 'next/server';
import nodemailer from 'nodemailer';

// Initialize Gmail SMTP transporter
async function getEmailTransporter() {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_SMTP_USER,
            pass: process.env.GMAIL_SMTP_PASSWORD,
        },
        // Fail fast instead of hanging if SMTP is unreachable/slow.
        connectionTimeout: 7000, // time to establish the TCP connection
        greetingTimeout: 7000,   // time to receive the SMTP greeting
        socketTimeout: 10000,    // idle time before the socket is killed
    });
}

// Log submission to Google Sheets via Apps Script Webhook
async function logToGoogleSheets(data: {
    fullName: string;
    email: string;
    role: string;
    journey: string;
    challenge?: string;
}) {
    try {
        const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

        if (!scriptUrl) {
            console.warn('GOOGLE_APPS_SCRIPT_URL not configured. Skipping Sheets logging.');
            return;
        }

        const journeyMap: Record<string, string> = {
            'mid-level': 'Mid-level professional moving into leadership',
            'senior': 'Senior leader / Director',
            'c-suite': 'C-Suite Executive',
            'founder': 'Founder / Entrepreneur',
        };

        const response = await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                journey: journeyMap[data.journey] || data.journey
            }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Important to avoid CORS preflight issues with Apps Script
            },
        });

        if (!response.ok) {
            console.error('Failed to log to Google Sheets:', await response.text());
        }
    } catch (error) {
        console.error('Error logging to Google Sheets:', error);
    }
}

// Send email notification via Gmail SMTP
async function sendEmailNotification(data: {
    fullName: string;
    email: string;
    role: string;
    journey: string;
    challenge?: string;
}) {
    const transporter = await getEmailTransporter();

    const journeyMap: Record<string, string> = {
        'mid-level': 'Mid-level professional moving into leadership',
        'senior': 'Senior leader / Director',
        'c-suite': 'C-Suite Executive',
        'founder': 'Founder / Entrepreneur',
    };

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #FAF7F2; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #FAF7F2; color: #130E20; padding: 20px; text-align: center; }
        .content { background: #130E20; padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #D9CFF2; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .value { font-size: 16px; color: #FAF7F2; margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #826AAB; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-family: 'Playfair Display', serif;">New Application Received</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${data.fullName}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">Current Role</div>
            <div class="value">${data.role}</div>
          </div>
          <div class="field">
            <div class="label">Leadership Journey</div>
            <div class="value">${journeyMap[data.journey] || data.journey}</div>
          </div>
          ${data.challenge ? `
          <div class="field">
            <div class="label">Visibility Challenge</div>
            <div class="value">${data.challenge}</div>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          Beta Narrative · Executive Brand Strategy
        </div>
      </div>
    </body>
    </html>
  `;

    // Build recipient list - always include primary, plus additional recipients
    const primaryRecipient = process.env.CONTACT_EMAIL_TO || process.env.GMAIL_SMTP_USER || '';
    const additionalRecipients = ['egbogunfavour@gmail.com'];

    const allRecipients = [
        primaryRecipient,
        ...additionalRecipients
    ].filter(Boolean).join(', ');

    await transporter.sendMail({
        from: `"Beta Narrative" <${process.env.GMAIL_SMTP_USER}>`,
        to: allRecipients,
        subject: `New Application: ${data.fullName} - ${data.role}`,
        html: htmlContent,
        replyTo: data.email,
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, email, role, journey, challenge } = body;

        // Validate required fields
        if (!fullName || !email || !role || !journey) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Deliver the notification email + log to Google Sheets AFTER the response is sent,
        // so the user isn't blocked waiting on SMTP. after() keeps this work alive on
        // serverless platforms (unlike a naive un-awaited promise, which can be killed).
        after(async () => {
            try {
                await Promise.all([
                    sendEmailNotification({ fullName, email, role, journey, challenge }),
                    logToGoogleSheets({ fullName, email, role, journey, challenge }),
                ]);
            } catch (deliveryError) {
                console.error('Contact delivery (email/sheets) failed:', deliveryError);
            }
        });

        return NextResponse.json(
            { success: true, message: 'Application submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form critical error:', error);
        return NextResponse.json(
            { error: 'Failed to submit application' },
            { status: 500 }
        );
    }
}
