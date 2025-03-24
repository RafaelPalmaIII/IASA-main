import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyCUZBdQ0TopHRfktfUrW_85EuwXQ-AgH6E",
    authDomain: "create-account-b137b.firebaseapp.com",
    projectId: "create-account-b137b",
    storageBucket: "create-account-b137b.firebasestorage.app",
    messagingSenderId: "904046684259",
    appId: "1:904046684259:web:2e336c1f510c0c715cb056"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = document.getElementById("login");

login.addEventListener("click", function (event){
event.preventDefault();

// Input fields for login
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

//sign in user
signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    const user = userCredential.user;

    localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));

    window.location.href = "profile.html"
})
.catch((error) => {
    const errorMessage = error.message;
    alert('Log in failed: ${errorMessage}');
})

});