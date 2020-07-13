import React from 'react'
import NavigationBottom from './Navigation/NavigationBottom'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import firebase from 'firebase'
import { firebaseConfig } from './Config';

firebase.initializeApp(firebaseConfig)

export default function App() {
  return (
    <Provider store={Store}>
        <NavigationBottom/>
    </Provider>
  );
}

