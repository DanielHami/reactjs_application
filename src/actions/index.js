import app from 'database'
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'
import FETCH_SERVICES from 'types';

const db = getFirestore();

export function fetchServices() {
  
  return getDocs(collection(db, "services"))
    .then((snapshot) => {
      const services = snapshot.docs.map(doc => ({id: doc.id,...doc.data()}))
      console.log(services)
      return {
        type: FETCH_SERVICES,
        services
      }
    })
  }