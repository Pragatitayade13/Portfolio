# Administrative Authentication Setup Guide

This guide details steps to set up administrative login credentials, map roles in Cloud Firestore, and test the secure private administration dashboard.

---

## 1. Create a Firebase Authentication User
To authorize an administrator account, you must first register their credentials in the Firebase Console:

1. Open your [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Build** > **Authentication** > **Users** tab.
3. Click **Add user**.
4. Enter the administrator's email and password:
   - **Email:** `pragatitayade1302@gmail.com`
   - **Password:** *Choose a secure password*
5. Click **Add user**.

## 2. Obtain User UID
Every registered user is assigned a unique User Identifier (UID). You need this UID to map database authorization claims:

1. Locate the newly created user in the **Users** table list.
2. In the **User UID** column, copy the alphanumeric string (e.g. `zR94yHsk2...`).

## 3. Create the Authorization Document in Firestore
The admin application checks user UIDs against document entries inside the `adminUsers` Firestore collection.

1. Go to **Build** > **Firestore Database** in the console.
2. Click **Start Collection** and set the Collection ID to: `adminUsers`.
3. Set the Document ID exactly to the **User UID** you copied in Step 2.
4. Add the following fields to the document:
   - `email` (string): `pragatitayade1302@gmail.com`
   - `role` (string): `admin`
   - `active` (boolean): `true`
5. Click **Save**.

### Required Field Map
```json
{
  "email": "pragatitayade1302@gmail.com",
  "role": "admin",
  "active": true
}
```

---

## 4. Verification & Testing

### Accessing the Portal
Navigate to the hidden admin login path in your browser:
- Local url: `http://localhost:5173/Pragati_portfolio/#/admin/login`
- GitHub Pages url: `https://pragatitayade13.github.io/Pragati_portfolio/#/admin/login`

### Testing Redirection Security
1. **Unauthenticated Redirects:** Try to access `http://localhost:5173/Pragati_portfolio/#/admin` directly. The application will immediately redirect you to `#/admin/login`.
2. **Access Control Check:** Log in using a non-admin Firebase Auth account (if created). The application will intercept the session, recognize the missing `adminUsers/{uid}` profile, and redirect to `#/admin/unauthorized`.
3. **Session Restoration:** Log in as the primary admin (`pragatitayade1302@gmail.com`). Refresh the page on the dashboard (`#/admin`). The dashboard should load your credentials directly from cache without asking for credentials again.
4. **Logout Execution:** Click the **Log Out** button on the dashboard. The application will terminate your Firebase Auth session and redirect you back to `#/admin/login`.
