// Firebase Server-side initialization for API routes
// Using client SDK since the project uses client-side Firebase
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDAErFJofM8skrknWevMldjw080pqJyxYQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sulbyvs.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://greencheck-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sulbyvs",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sulbyvs.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "903719442990",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:903719442990:web:10337e90c801746b28ddbf"
}

let adminDb: any = null
let adminStorage: any = null

if (typeof window === 'undefined') {
  try {
    let app: any = null
    if (!getApps().length) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }
    
    adminDb = getFirestore(app)
    adminStorage = getStorage(app)
  } catch (error) {
    adminDb = null
    adminStorage = null
  }
}

export { adminDb, adminStorage }

