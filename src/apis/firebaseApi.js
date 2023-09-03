import { addDoc, collection } from "firebase/firestore"
import { db, storage } from "../config/firebase"



export const addSign = async (data) => {
  const { uid, docName = '', docRef, tags = [], signd } = data
  const signDocumentsCollectionsRef = collection(db, 'signDocuments')

  try {
    const res = await  addDoc(signDocumentsCollectionsRef, {
      uid,
      docName,
      docRef,
      updatedAt: new Date(),
      signd,
      tags
    })
    return res
  } catch (error) {
    console.error(error)
  }
}
