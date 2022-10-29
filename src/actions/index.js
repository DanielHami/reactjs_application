import app from 'database'
import { collection, getDocs, doc, getDoc, setDoc, } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { FETCH_SERVICES, FETCH_SERVICE_BY_ID, SET_AUTH_USER } from 'types';


const db = getFirestore(app);
const auth = getAuth

export async function fetchServices() {
  const snapshot = await getDocs(collection(db, "services"));
  const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return {
    type: FETCH_SERVICES,
    services
  };
}

export async function fetchById(serviceId) {
  const docRef = doc(db, "services", `${serviceId}`)
  const snapshot = await getDoc(docRef);
  const service = { id: snapshot.id, ...snapshot.data() };
  return {
    type: FETCH_SERVICE_BY_ID,
    service
  };
}

//save user to database

async function createUserProfile(userProfile){
  await setDoc(doc(db, "profile", `${userProfile.uid}`),userProfile)
}

//register user

export const register = async ({ email, password, fullname, avatar }) => {
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

  try {
   await signInWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
    return Promise.reject(error.message)
};
}

//logout user 

export const logout = dispatch =>  {
  signOut(auth).then(_ => {
    return (
      dispatch({user: null, type: SET_AUTH_USER })
    )
  }).catch((error) => {
    // An error happened.
  });
}

export const githubLogin = async () => {

const provider = new GithubAuthProvider();
try {
signInWithPopup(auth, provider)
}
  catch(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  };
}

//

export const onAuthStateChanged = onAuthCallback => getAuth().onAuthStateChanged(onAuthCallback)

const getUserProfile = async uid => {
 const docRef = doc(db, "profile", `${uid}`)
  const snapshot = await getDoc(docRef);
  return ({ uid, ...snapshot.data() });
}



export const storeAuthUser = authUser => {
  if (authUser) {
    return  getUserProfile(authUser.uid)
            .then(userWithProfile => ({type: SET_AUTH_USER, user: userWithProfile}))
  }else {
    return ({user: null, type: SET_AUTH_USER})
  }
}