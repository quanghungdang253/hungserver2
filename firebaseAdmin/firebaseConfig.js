const admin = require('firebase-admin');
// const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);  // Đường dẫn tới file serviceAccountKey.json


if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.DATABASE_URL) {
  console.error('Missing required environment variables');
  process.exit(1);
}


admin.initializeApp({
  credential: admin.credential.cert({
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.DATABASE_URL
});


const db = admin.database();
module.exports = db;
