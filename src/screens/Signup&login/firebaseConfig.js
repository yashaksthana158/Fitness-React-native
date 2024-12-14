/* 
import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
import { getReactNativePersistence } from '@react-native-firebase/auth/persistence';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyB0XdTmhO-2AXfZqW2tlLtsS7rCr9GRuMM",
    authDomain: "thirdprojectbackend.firebaseapp.com",
    project_id: "thirdprojectbackend",
    storage_bucket: "thirdprojectbackend.appspot.com",
    messagingSenderId: "113343748722",
    appId: "1:113343748722:android:ff77f247fe6092de1540eb",
};

let firebaseApp;
let auth;

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
} else {
    firebaseApp = getApps()[0];
    auth = getAuth(firebaseApp);
}

export { auth, firebaseApp };
 */