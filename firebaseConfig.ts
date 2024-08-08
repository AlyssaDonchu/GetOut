import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserSessionPersistence } from 'firebase/auth';
import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: 'AIzaSyC5NDIKTVH1RaP--KerSnSeb03dgTSvaCk',
  authDomain: 'getout-97f2d.firebaseapp.com',
  projectId: 'getout-97f2d',
  storageBucket: 'getout-97f2d.appspot.com',
  messagingSenderId: '237612445002',
  appId: '1:237612445002:web:35e9b0ffbe3b13010565b3',
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };


  function getReactNativePersistence(AsyncStorage: AsyncStorageStatic): import("@firebase/auth").Persistence | import("@firebase/auth").Persistence[] | undefined {
    throw new Error('Function not implemented.');
  }

