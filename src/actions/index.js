import app from 'database'
import { collection, getDocs,doc,getDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'
import {FETCH_SERVICES, FETCH_SERVICE_BY_ID} from 'types';

const db = getFirestore();

export function fetchServices() {
  return getDocs(collection(db, "services"))
    .then((snapshot) => {
      const services = snapshot.docs.map(doc => ({id: doc.id,...doc.data()}))
      return {
        type: FETCH_SERVICES,
        services
      }
    })
  }
 
  export function fetchById(serviceId) {
    const docRef = doc(db, "services", `${serviceId}`)
    return getDoc(docRef)
      .then((snapshot) => {
        const service = {id:snapshot.id, ...snapshot.data()}
        return {
          type: FETCH_SERVICE_BY_ID,
          service
        }
      })
    }