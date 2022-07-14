import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyB1d5BhJIY5mgQoAZS2y4eX9qeuKOII8Q8',
    authDomain: 'rubics-algo-6cd59.firebaseapp.com',
    projectId: 'rubics-algo-6cd59',
    storageBucket: 'rubics-algo-6cd59.appspot.com',
    messagingSenderId: '538727207711',
    appId: '1:538727207711:web:096188f12046e29e62d62a'
}

initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore()