import app from 'database'
import { getFirestore } from 'firebase/firestore'
import { doc } from "firebase/firestore";


export * from './services'
export * from './auth'

const db = getFirestore(app);


export const createUserRef = (collection, docId) => doc(db, `${collection}/` + docId);