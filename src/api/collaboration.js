import app from 'database'
import { collection, getFirestore } from 'firebase/firestore'
import { doc, setDoc, addDoc,onSnapshot, updateDoc, query, where, getDocs} from "firebase/firestore"; 


const db = getFirestore(app);


export const createCollaboration = async(collab) => {
 const docRef = await addDoc(collection(db, "collaborations"),collab)
   return docRef.id
}

export const sendMessage = async(message) => {
    const docRef = doc(collection(db, `profile/${message.toUser}`, 'messages'))
    await setDoc(docRef, message)
}

export const subscribeToMessages = (userId, callback) => 
    onSnapshot(collection(db, `profile/${userId}/messages`), snapshot => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages)
  })

export const markMessageAsRead = async message => {
    const messagesRef = doc(db, `profile/${message.toUser}/messages/${message.id}`)
    await updateDoc(messagesRef, {
      isRead: true
    })
}

export const fetchCollaborations = async userId => {
  const q = query(collection(db, "collaborations"), where('allowedPeople', 'array-contains', userId))
  const snapshot = await getDocs(q)
  const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return services
}