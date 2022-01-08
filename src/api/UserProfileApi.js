import { db } from '../firebase/FirebaseConfig';
export const UserProfileApi = {
    getLogedInUserData(id){
      return db.collection("users").doc(id).get();
    },
    updateLogedInUserData(id, payload){
      return db.collection("users").doc(id).update(payload);
    }
};

export const UserProfileFormFields = ['name', 'email', 'password', 'userName', 'mobileNumber'];