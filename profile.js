import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("User not logged in");
        window.location.href = "login.html";
    } else {
        const loggedInUser = user.uid;
        console.log("User logged in");
        const docRef = doc(db, "users", loggedInUser);
        getDoc(docRef)
            .then(docSnap => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const userData = docSnap.data();
                    document.getElementById("loggedUserFName").innerText = userData.firstName;
                    document.getElementById("loggedUserLName").innerText = userData.lastName;
                    document.getElementById("loggedUserEmail").innerText = userData.email;
                } else {
                    console.log("No such document found matching id!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }
});

const logout = document.getElementById("logout");
if (logout) {
    logout.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Logout button clicked");

        signOut(auth)
            .then(() => {
                localStorage.removeItem("user");
                window.location.href = "login.html" + new Date().getTime();
            })
            .catch((error) => {
                console.log(error);
            });
    });
} else {
    console.log("Logout button not found");
}

const clearToken = (idToken) => {
    localStorage.removeItem('idToken', idToken);
}

