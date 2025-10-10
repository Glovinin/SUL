// Firebase Configuration for Greencheck Investors
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBb6VyufD93Sc7f_llL45ifFnWmVRywOPA",
  authDomain: "greencheck-app.firebaseapp.com",
  databaseURL: "https://greencheck-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "greencheck-app",
  storageBucket: "greencheck-app.firebasestorage.app",
  messagingSenderId: "1046515296661",
  appId: "1:1046515296661:web:377ea31a38e61e2cf7ee9c"
}

const app = typeof window !== 'undefined' && !getApps().length 
  ? initializeApp(firebaseConfig) 
  : getApps()[0]

const auth = typeof window !== 'undefined' && app ? getAuth(app) : undefined
const db = typeof window !== 'undefined' && app ? getFirestore(app) : undefined
const storage = typeof window !== 'undefined' && app ? getStorage(app) : undefined

export { auth, db, storage, app }
