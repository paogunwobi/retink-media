import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import "assets/scss/retink/nucleo/css/nucleo.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/retink-react.scss";

import DefaultLayout from "layouts/Default.js";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./ducks/reducers";
import { AnimatePresence } from 'framer-motion';

const firebaseConfig = {
  apiKey: "AIzaSyDyKPmVgQVcb5oTi9qPk2eV7L-3JyVTM6I",
  authDomain: "retink-b8e26.firebaseapp.com",
  projectId: "retink-b8e26",
  storageBucket: "retink-b8e26.appspot.com",
  messagingSenderId: "1026447520756",
  appId: "1:1026447520756:web:57e7e884a2caaa964affa1",
  measurementId: "G-8T2DRMRGR7"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AnimatePresence exitBeforeEnter>
          <BrowserRouter>  
            <Switch>
              <Route path="" exact 
                render={(props) => <DefaultLayout {...props} />} 
              />
            </Switch>
          </BrowserRouter>
        </AnimatePresence>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

reportWebVitals();
