import firebase from 'firebase/compat/app';




const firebaseConfig = {
    apiKey: "AIzaSyDjJvXDnCCJcz4iDmd9GWnXM19BZDb0saU",
    authDomain: "pansariui.firebaseapp.com",
    projectId: "pansariui",
    storageBucket: "pansariui.appspot.com",
    messagingSenderId: "118567813199",
    appId: "1:118567813199:web:1a152ba431bf84ec2caa3a",
    measurementId: "G-391FSF62B7"
  };

  const Fire = firebase.initializeApp(firebaseConfig);

  export default Fire;