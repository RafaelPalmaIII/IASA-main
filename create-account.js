
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore , doc , setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAnwc89hsjVXilrhYH5z3dZpKsQDwB29UA",
    authDomain: "iasact.firebaseapp.com",
    projectId: "iasact",
    storageBucket: "iasact.firebasestorage.app",
    messagingSenderId: "392510000083",
    appId: "1:392510000083:web:9523decf7db6eb093efd26"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



const submit = document.getElementById("submit");

submit.addEventListener('click', function (event) {
    event.preventDefault();
   
    //input fields
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const idNumber = document.getElementById("idNumber").value;
    const school = document.getElementById("school").value;
    const password = document.getElementById("password").value;
    
    createUserWithEmailAndPassword(auth, email, password, idNumber,school,username)
  .then((userCredential) => {
    const user = userCredential.user;
    setDoc(doc(db,"users", user.uid), {

        email: user.email,
        uid: user.uid,
        displayName : username,
        idNumber : idNumber,
        school : school
      


    }) 

    sendEmailVerification(auth.currentUser)
    .then(() => {
      alert("Email verification link sent");
    })

    .then(() => {

        alert("Account Created. Please verify your email before logging in")
        window.location.href="login.html";
    })    
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });

})