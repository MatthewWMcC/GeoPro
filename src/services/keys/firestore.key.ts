const envVars = process.env;

export const firebaseConfig = {
  apiKey: envVars.FIRESTORE_API_KEY,
  authDomain: envVars.FIRESTORE_AUTH_DOMAIN,
  projectId: envVars.FIRESTORE_PROJECT_ID,
  storageBucket: envVars.FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: envVars.FIRESTORE_MESSAGING_SENDER_ID,
  appId: envVars.FIRESTORE_APP_ID,
};
