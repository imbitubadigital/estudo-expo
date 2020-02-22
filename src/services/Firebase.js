import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDxfvAj3fSYFaWjR1R1BvpkO0Fk6m8DCic',
  authDomain: 'estudo-expo.firebaseapp.com',
  databaseURL: 'https://estudo-expo.firebaseio.com',
  projectId: 'estudo-expo',
  storageBucket: 'estudo-expo.appspot.com',
  messagingSenderId: '23330632209',
  appId: '1:23330632209:web:1b95046724a2752e7cb7b0',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.9.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDxfvAj3fSYFaWjR1R1BvpkO0Fk6m8DCic",
    authDomain: "estudo-expo.firebaseapp.com",
    databaseURL: "https://estudo-expo.firebaseio.com",
    projectId: "estudo-expo",
    storageBucket: "estudo-expo.appspot.com",
    messagingSenderId: "23330632209",
    appId: "1:23330632209:web:1b95046724a2752e7cb7b0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
 */
