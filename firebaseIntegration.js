import firebase from 'firebase/app';
import 'firebase/database';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"
import { getValidRedirectLink, redirect } from "../common/utils/urls.js"


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIOoxfWZ_UIqD8iITP3KZ_X9kmMls0Ygc",
  authDomain: "locator-7d788.firebaseapp.com",
  projectId: "locator-7d788",
  storageBucket: "locator-7d788.appspot.com",
  messagingSenderId: "1074249375086",
  appId: "1:1074249375086:web:e58ddefb002c169daeb57f",
  measurementId: "G-9V2N649V9J"
}
initializeApp(firebaseConfig)

// Services & References
export const auth = getAuth()
export const dBase = getDatabase()
export const storage = getStorage()
export const USERS = "users/"
export const KEYS = "keys/"
export const authStateListener = onAuthStateChanged

// Logout Current User
export const logoutUser = async () => {
    await signOut(auth).then(() => {
        let currentPath = getValidRedirectLink()
        redirect(currentPath)
    })
}

// Get User-details by uid from Db
export const getUserDetails = async (uid) => {
    const userRef = child(ref(dBase), USERS + uid)
    try {
        const userCred = await get(userRef)
        return userCred.val()
    } catch (error) {
        return error.message
    }
}

// Unique Id (key) generetor/updater
export const keyTracker = async (key) => {
    const keyRef = ref(dBase, KEYS + key)
    try {
        const nextKeyRef = await get(keyRef)
        let nextKey = nextKeyRef.val()
        if (nextKey == null) nextKey = "01"
        set(keyRef, generateKey(nextKey))
        return nextKey
    } catch (error) {
        return error.message
    }
}

// Generate next key
export const generateKey = (value) => {
    let newid = value ? Number.parseInt(value) + 1 : 1
    return newid < 10 ? `0${newid}` : newid
}

// const firebaseConfig = {
//     apiKey: "AIzaSyDIOoxfWZ_UIqD8iITP3KZ_X9kmMls0Ygc",
//     authDomain: "locator-7d788.firebaseapp.com",
//     projectId: "locator-7d788",
//     storageBucket: "locator-7d788.appspot.com",
//     messagingSenderId: "1074249375086",
//     appId: "1:1074249375086:web:e58ddefb002c169daeb57f",
//     measurementId: "G-9V2N649V9J"
//   };


// firebase.initializeApp(firebaseConfig);
// const database = firebase.database();