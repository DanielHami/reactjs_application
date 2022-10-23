import app from 'database'
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { FETCH_SERVICES, FETCH_SERVICE_BY_ID } from 'types';


const db = getFirestore(app);

export function fetchServices() {
  return getDocs(collection(db, "services"))
    .then((snapshot) => {
      const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
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
      const service = { id: snapshot.id, ...snapshot.data() }
      return {
        type: FETCH_SERVICE_BY_ID,
        service
      }
    })
}

//save user to database

async function createUserProfile(userProfile){
  await setDoc(doc(db, "profile", `${userProfile.uid}`),userProfile)
}

//register user

export const register = async ({ email, password, fullname, avatar }) => {
  const auth = getAuth();
  try{
     const res = await createUserWithEmailAndPassword(auth, email, password)
     const {user} = res
     const userProfile = {uid: user.uid, fullname, email, avatar, services: [], description: ''}
     createUserProfile(userProfile)
     return userProfile
  }
  catch(error) {
      return Promise.reject(error.message)
  };
}

// login user

export const login = async ({ email, password}) => {
  const auth = getAuth();
  try {
   await signInWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
    return Promise.reject(error.message)
};
}