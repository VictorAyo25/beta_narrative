# Beta Narrative - Executive Brand Strategy Website

A premium, full-stack web application for a PR & Communications expert, built with Next.js, Firebase, and Tailwind CSS.

## 🚀 Tech Stack

- **Frontend:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS 4
- **Backend:** Firebase (Authentication, Firestore)
- **Email:** Resend API
- **Logging:** Google Sheets API
- **Deployment:** Vercel

## 📁 Project Structure

```
favour_website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── login/          # Admin login page
│   │   │   ├── layout.tsx      # Admin layout with auth check
│   │   │   └── page.tsx        # Content editor dashboard
│   │   ├── api/                # API routes
│   │   │   ├── contact/        # Contact form handler
│   │   │   └── content/        # Content CRUD operations
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer
│   │   ├── SectionLabel.tsx    # Section label component
│   │   ├── Divider.tsx         # Divider component
│   │   └── sections/           # Page sections
│   │       ├── HeroSection.tsx
│   │       ├── PainSection.tsx
│   │       ├── ValueSection.tsx
│   │       ├── ResultsSection.tsx
│   │       ├── OfferSection.tsx
│   │       └── ContactSection.tsx
│   ├── context/                # React context providers
│   │   ├── ContentContext.tsx  # Site content provider
│   │   └── AuthContext.tsx     # Authentication provider
│   ├── lib/                    # Utilities
│   │   ├── firebase.ts         # Firebase client config
│   │   ├── firebase-admin.ts   # Firebase Admin SDK config
│   │   ├── firestore.ts        # Firestore utilities
│   │   └── default-content.ts  # Default site content
│   └── types/                  # TypeScript types
│       └── index.ts
├── public/
│   └── images/
│       └── favour.jpg          # Hero image
├── .env.example                # Environment variables template
├── .env.local                  # Local environment variables
├── next.config.ts              # Next.js configuration
└── package.json
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm
- A Firebase project (https://console.firebase.google.com)
- A Gmail account to send contact-form notifications from
- A Google Cloud project with Sheets API enabled

### 2. Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** (Email/Password provider)
4. Enable **Firestore Database**
5. Go to Project Settings > General > Your apps > Web app
6. Register the app and copy the configuration values to `.env.local`
7. Go to Project Settings > Service Accounts > Generate new private key
8. Copy the service account values to `.env.local`

### 4. Contact Email Setup

Application notifications are sent over SMTP with Nodemailer. They go out **from
Favour's own Gmail account**, so an applicant reading the notification sees her
address rather than a developer's.

1. On `egbogunfavour@gmail.com`, turn on **2-Step Verification**
   (Google Account > Security). App Passwords do not exist without it.
2. Go to Google Account > Security > **App passwords**, create one named
   `Beta Narrative site`, and copy the 16-character code.
3. Set the values below. `GMAIL_SMTP_USER` doubles as the From address, so no
   `MAIL_FROM_ADDRESS` is needed:

   ```env
   GMAIL_SMTP_USER=egbogunfavour@gmail.com
   GMAIL_SMTP_PASSWORD=the_16_character_app_password
   CONTACT_EMAIL_TO=egbogunfavour@gmail.com, second_inbox@example.com
   MAIL_FROM_NAME=Beta Narrative
   ```

`CONTACT_EMAIL_TO` is a comma-separated list of everyone who should receive
applications. `replyTo` is set to the applicant, so replying goes to them.

If the App Password is ever revoked or regenerated, the form keeps returning
success while notifications stop — the send happens after the response. Check
the Vercel function logs if applications go quiet.

**Using a different relay** (Brevo, Resend, Mailjet) instead of Gmail: set
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASSWORD`, plus
`MAIL_FROM_ADDRESS` for an address that relay has verified. No code change.

### 5. Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the **Google Sheets API**
4. Create a **Service Account** with Editor role
5. Generate a JSON key file
6. Create a new Google Sheet and share it with the service account email
7. Copy the Sheet ID from the URL to `.env.local`
8. Add the service account credentials to `.env.local`

### 6. Environment Variables

Fill in your `.env.local` file:

```env
# Firebase (Client)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key"

# Contact email (Gmail SMTP)
GMAIL_SMTP_USER=egbogunfavour@gmail.com
GMAIL_SMTP_PASSWORD=gmail_app_password
CONTACT_EMAIL_TO=egbogunfavour@gmail.com, second_inbox@example.com
MAIL_FROM_NAME=Beta Narrative

# Google Sheets
GOOGLE_SHEETS_PRIVATE_KEY="your_google_private_key"
GOOGLE_SHEETS_CLIENT_EMAIL=your_google_service_email
GOOGLE_SHEETS_ID=your_sheet_id
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/favour_website.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add all environment variables from `.env.local`
4. Deploy!

### 3. Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to configure project
```

## 🔐 Admin Access

1. Go to `/admin/login`
2. Sign in with your Firebase admin credentials
3. Access the content editor at `/admin`
4. Edit site content and save changes

## 📝 Content Management

All site content is stored in Firestore and can be edited through the admin dashboard:

- **Hero Section:** Headline, subtitle, CTA
- **Pain Section:** Problem statements
- **Value Section:** Value proposition, credentials
- **Results Section:** Client results
- **Offer Section:** Package details, pricing
- **Contact Section:** Form labels, messages

## 🎨 Customization

### Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --purple: #3C3489;
  --purple-mid: #534AB7;
  --orange: #E8721A;
  /* ... */
}
```

### Fonts

Edit the font imports in `src/app/layout.tsx`:

```typescript
const playfair = Playfair_Display({ ... });
const dmSans = DM_Sans({ ... });
```

## 📄 License

All rights reserved. Beta Narrative © 2025
