// Firebase Configuration for SUL ESTATE
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
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

const app = typeof window !== 'undefined' && !getApps().length 
  ? initializeApp(firebaseConfig) 
  : getApps()[0]

const auth = typeof window !== 'undefined' && app ? getAuth(app) : undefined
const db = typeof window !== 'undefined' && app ? getFirestore(app) : undefined
const storage = typeof window !== 'undefined' && app ? getStorage(app) : undefined

export { auth, db, storage, app }
