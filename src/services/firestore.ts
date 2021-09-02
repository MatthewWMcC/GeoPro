// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./keys/firestore.key";
import { initializeApp } from "firebase/app";
import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { store } from "state/store";
import { ClearUserData, FirstLogin } from "state/UserData/actions";
import { LoggedInChange } from "state/AuthState/actions";
import { newPlayerInitData } from "./constants";
import { getUserData } from "./helpers";

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export const firestore = {
  _getAuth: () => {
    return getAuth();
  },
  _getFirestore: () => {
    return getFirestore(app);
  },
  _runAuth: () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider);
  },
  _getDocument: async () => {
    const userId = firestore._getUser()?.uid;
    if (!userId) return;
    const db = getFirestore();
    const userRef = doc(db, "users", userId);
    return await getDoc(userRef);
  },
  _updateDocument: async (data: any) => {
    const userId = firestore._getUser()?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...data,
    });
  },
  _getUser: () => {
    const auth = getAuth();
    return auth.currentUser;
  },
  _signOut: () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("successful sign out");
      })
      .catch(console.error);
  },
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.uid;
    const userDoc = await firestore._getDocument();
    if (userDoc?.exists()) {
      console.log("Document data:", userDoc.data());
      store.dispatch(FirstLogin(userId, getUserData(userDoc.data())));
    } else {
      console.log("No such document!");
      await setDoc(doc(db, "users", userId), {
        userId,
        ...newPlayerInitData,
      });

      store.dispatch(FirstLogin(userId, getUserData(newPlayerInitData)));
    }
    store.dispatch(LoggedInChange(true));
  } else {
    console.log("not signed in");
    store.dispatch(LoggedInChange(false));
    store.dispatch(ClearUserData());
  }
});
