import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyAnwc89hsjVXilrhYH5z3dZpKsQDwB29UA",
    authDomain: "iasact.firebaseapp.com",
    projectId: "iasact",
    storageBucket: "iasact.firebasestorage.app",
    messagingSenderId: "392510000083",
    appId: "1:392510000083:web:9523decf7db6eb093efd26"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = document.getElementById("login");

login.addEventListener("click", function (event) {
    event.preventDefault();

    // Input fields for login
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Sign in user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (user.emailVerified) {
                localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
                window.location.href = "profile.html";
            } else {
                alert("Please verify your email before logging in.");
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(`Log in failed: ${errorMessage}`);
        });
});
