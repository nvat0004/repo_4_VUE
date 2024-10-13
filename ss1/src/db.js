// Firebase imports
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYPDWwsRpPloUXvcLUV-aC4RnA4uanl9E',
  authDomain: 'signupdoctor.firebaseapp.com',
  projectId: 'signupdoctor',
  storageBucket: 'signupdoctor.appspot.com',
  messagingSenderId: '714706458398',
  appId: '1:714706458398:web:d170bf145c4af5fe435b0f'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(firebaseApp)
// Export db for direct use in components
export { db, firebaseApp }
