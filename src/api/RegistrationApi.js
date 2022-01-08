import { firebaseApp } from '../firebase/FirebaseConfig';
import { db } from '../firebase/FirebaseConfig';

export const RegistrationApi = {
    createUser(email, password){
        return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
    },
    addUser(id, payload){
        return db.collection("users").doc(id).set(payload);
    },
    isUserLogedIn(callbackFn){
        firebaseApp.auth().onAuthStateChanged(callbackFn);
    },
    logOut(){
        firebaseApp.auth().signOut();
    }
};

export const RegisterFormFields = ['name', 'email', 'password'];