# Firebase Integration Setup Guide

This guide details steps to create, configure, and connect your Firebase backend services to the portfolio application.

---

## 1. Create a Firebase Project
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or **Create a project**).
3. Enter your project name (e.g. `Portfolio-Web`) and click **Continue**.
4. Decide whether to enable Google Analytics (optional, can be disabled for standard portfolios) and click **Create project**.

## 2. Register Your Web Application
1. On the Project Overview page, click the **Web icon (`</>`)** to register a new application.
2. Enter an app nickname (e.g. `Portfolio Frontend`).
3. Click **Register app**.
4. Firebase will display your config credentials (e.g. `apiKey`, `authDomain`, etc.). Keep these handy, as they will be defined in your `.env` configuration.

## 3. Enable Email/Password Authentication
1. In the left navigation pane of the Firebase console, go to **Build** > **Authentication**.
2. Click **Get started**.
3. Under the **Sign-in method** tab, click **Email/Password**.
4. Enable the **Email/Password** toggle (keep *Email link (passwordless sign-in)* disabled).
5. Click **Save**.
6. Switch to the **Users** tab and click **Add user** to manually register your administrative username and password credentials.
   > [!WARNING]
   > Do not expose public signup methods or publish admin credentials in public repositories.

## 4. Create Cloud Firestore Database
1. Go to **Build** > **Firestore Database** in the console.
2. Click **Create database**.
3. Select your Database Location and click **Next**.
4. Choose **Start in production mode** (all reads/writes are denied by default).
5. Click **Create**.
6. Once created, click the **Rules** tab and configure secure read/write rules. For example, to restrict edits only to authenticated users:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public can read portfolio details
       match /projects/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /experience/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /education/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /certifications/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /publications/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       // Secure audit logs: only authenticated users can write/read
       match /audit_logs/{document} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## 5. Enable Firebase Storage
1. Go to **Build** > **Storage** in the console.
2. Click **Get started**.
3. Choose **Start in production mode**.
4. Click **Next** and choose your storage bucket location.
5. Click **Done**.
6. Select the **Rules** tab and configure secure storage rules:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true; // public can view photos and PDFs
         allow write: if request.auth != null; // only authenticated administrators can upload
       }
     }
   }
   ```

## 6. Configure Authorized Domains
1. In the Authentication section, navigate to the **Settings** tab.
2. Select **Authorized domains** in the sidebar.
3. Click **Add domain**.
4. Add your GitHub Pages URL (e.g. `pragatitayade13.github.io`) so that auth sessions succeed on your live portfolio.

---

## 7. Local Environment Variables Config
Create a `.env` file in the root directory (this is automatically ignored by `.gitignore`) and paste your credentials:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 8. Deployment Environment Variables
When deploying the application (e.g. using GitHub Actions, Vercel, or Netlify), define these keys inside your repository secrets or deployment settings so they are injected during the production build step (`npm run build`).

- In **GitHub Actions**, store these keys under **Settings** > **Secrets and variables** > **Actions** > **Repository Secrets** and pass them to the build runner.
