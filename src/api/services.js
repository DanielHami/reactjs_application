import app from 'database'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, doc, setDoc, getDoc, query, where} from "firebase/firestore";


const db = getFirestore(app);


export const fetchById = async serviceId => {  
    const docRef = doc(db, "services", `${serviceId}`)
    const snapshot = await getDoc(docRef);
    console.log({ id: snapshot.id, ...snapshot.data()})
    return { id: snapshot.id, ...snapshot.data()}
}

   

export const fetchServices = async () => {
    const snapshot = await getDocs(collection(db, "services"));
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return services
}

export const fetchUserServices = async userId => {
    const q = query(collection(db, "services"), where('user', '==', userId))
    const snapshot = await getDocs(q);
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
     return services
  }

export const createService = async newService => {
    const a = doc(collection(db, "services"));
     await setDoc(a, newService)

  }