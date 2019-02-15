import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCzXQyLyewJ-z1ILaG_AsbveG7Jr9L7kIw",
  authDomain: "seinfeldsoups.firebaseapp.com",
  databaseURL: "https://seinfeldsoups.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// Named export
export {firebaseApp};
export default base;