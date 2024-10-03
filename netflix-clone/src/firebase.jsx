// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyA-PoHJhSHyC-Xqo6cLrvuZruoPLVup6S8",
    authDomain: "netflix-clone-5845a.firebaseapp.com",
    projectId: "netflix-clone-5845a",
    storageBucket: "netflix-clone-5845a.appspot.com",
    messagingSenderId: "350564001794",
    appId: "1:350564001794:web:155aa52dcf79277802df1b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        toast.success("signed up successfully!");
    }
    catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(''));
    }
}
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
    }
    catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(''));
    }
}
const logOut = async () => {

    await signOut(auth);

}
export { auth, db, login, signUp, logOut };