import firebase from "firebase/app";
import firebaseClient from "./firebaseClient";

firebaseClient();
const firestore = firebase.firestore();
export function updateUser(uid, data) {
  return firestore.collection("users").doc(uid).update(data);
}
export function createUser(uid, email) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, email }, { merge: true });
}
