/**
 * Contact Form API Route
 * 
 * Handles contact form submissions:
 * 1. Sends email notification via Gmail SMTP (Nodemailer)
 * 2. Logs submission to Google Sheets (optional)
 */

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

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
    });
}

// Initialize Google Sheets API
async function getGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
}

// Log submission to Google Sheets
async function logToGoogleSheets(data: {
    fullName: string;
    email: string;
    role: string;
    journey: string;
    challenge?: string;
}) {
    try {
        const sheets = await getGoogleSheetsClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) {
            console.error('GOOGLE_SHEETS_ID not configured');
            return;
        }

        const timestamp = new Date().toISOString();
        const journeyMap: Record<string, string> = {
            'mid-level': 'Mid-level professional moving into leadership',
            'senior': 'Senior leader / Director',
            'c-suite': 'C-Suite Executive',
            'founder': 'Founder / Entrepreneur',
        };

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:F',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        timestamp,
                        data.fullName,
                        data.email,
                        data.role,
                        journeyMap[data.journey] || data.journey,
                        data.challenge || '',
                    ],
                ],
            },
        });
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
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #0D0B1F; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0D0B1F; color: #FAF9FF; padding: 20px; text-align: center; }
        .content { background: #FAF9FF; padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #6B4FAD; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .value { font-size: 16px; color: #0D0B1F; margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #9B8EC4; font-size: 12px; }
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

    await transporter.sendMail({
        from: `"Beta Narrative" <${process.env.GMAIL_SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL_TO || process.env.GMAIL_SMTP_USER,
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

        // Send email and log to sheets in parallel
        await Promise.all([
            sendEmailNotification({ fullName, email, role, journey, challenge }),
            logToGoogleSheets({ fullName, email, role, journey, challenge }),
        ]);

        return NextResponse.json(
            { success: true, message: 'Application submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to submit application' },
            { status: 500 }
        );
    }
}
