//import firebase from '../firebase/app';
//import '../firebase/firestore';
let db = ''
document.addEventListener('DOMContentLoaded', event => {
const firebaseConfig = {
    apiKey: "AIzaSyBk-hZI9TWctupZq8mjp3j3yLXsPUrOq_I",
    authDomain: "library-the-odin-project.firebaseapp.com",
    databaseURL: "https://library-the-odin-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "library-the-odin-project",
    storageBucket: "library-the-odin-project.appspot.com",
    messagingSenderId: "267260362907",
    appId: "1:267260362907:web:2f1a2cb38a0b81d9a1063e"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

db = firebase.firestore()
const books = db.collection('books')
const book0 = books.doc('0')

book0.get()
     .then(doc => {
      const data = doc.data();
      console.log(data.title)
          })

      book0.onSnapshot(doc => {
      const data = doc.data();
      console.log(data.title)
    })
});

export default db;