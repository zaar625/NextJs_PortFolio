import { signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBAMClIedp7o6x6U0dNAYIMNwbvgXr2CNc',
  authDomain: 'react-type-ecommerce.firebaseapp.com',
  projectId: 'react-type-ecommerce',
  storageBucket: 'react-type-ecommerce.appspot.com',
  messagingSenderId: '7712454824',
  appId: '1:7712454824:web:008f3bfc117a635dd26a9d'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

Cypress.Commands.add('login', (email, password) => {
  return signInWithEmailAndPassword(email, password);
});

Cypress.Commands.add('logout', () => {
  return auth.signOut();
});
