
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
 
 const firebaseConfig = {
    apiKey: "AIzaSyDhyLcHKhhTgFNghiOtOGBXqi53fBHvAzk",
    authDomain: "restaurant-92382.firebaseapp.com",
    projectId: "restaurant-92382",
    storageBucket: "restaurant-92382.firebasestorage.app",
    messagingSenderId: "278492472521",
    appId: "1:278492472521:web:5e87082764eae2b4219918"
  };

 const app = initializeApp(firebaseConfig);


 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='auth.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });

 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='../index.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })
// Import the functions you need from the SDKs
// import {
//   initializeApp,
// } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   setPersistence,
//   browserLocalPersistence, // For persistent sessions
// } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// import {
//   getFirestore,
//   setDoc,
//   doc,
//   getDoc,
// } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDhyLcHKhhTgFNghiOtOGBXqi53fBHvAzk",
//   authDomain: "restaurant-92382.firebaseapp.com",
//   projectId: "restaurant-92382",
//   storageBucket: "restaurant-92382.firebasestorage.app",
//   messagingSenderId: "278492472521",
//   appId: "1:278492472521:web:5e87082764eae2b4219918",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore();

// // Set session persistence
// setPersistence(auth, browserLocalPersistence)
//   .then(() => {
//     console.log("Session persistence set to local.");
//   })
//   .catch((error) => {
//     console.error("Error setting persistence:", error);
//   });

// // Show messages
// function showMessage(message, divId) {
//   const messageDiv = document.getElementById(divId);
//   messageDiv.style.display = "block";
//   messageDiv.innerHTML = message;
//   messageDiv.style.opacity = 1;
//   setTimeout(() => {
//     messageDiv.style.opacity = 0;
//   }, 5000);
// }

// // Register user
// document.getElementById("submitSignUp").addEventListener("click", (event) => {
//   event.preventDefault();
//   const email = document.getElementById("rEmail").value;
//   const password = document.getElementById("rPassword").value;
//   const firstName = document.getElementById("fName").value;
//   const lastName = document.getElementById("lName").value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       const userData = {
//         email,
//         firstName,
//         lastName,
//       };
//       const docRef = doc(db, "users", user.uid);
//       return setDoc(docRef, userData);
//     })
//     .then(() => {
//       showMessage("Account created successfully!", "signUpMessage");
//       window.location.href = "../pages/auth.html";
//     })
//     .catch((error) => {
//       if (error.code === "auth/email-already-in-use") {
//         showMessage("Email address already exists!", "signUpMessage");
//       } else {
//         showMessage("Unable to create user", "signUpMessage");
//       }
//     });
// });


// // Login user
// document.getElementById("submitSignIn").addEventListener("click", (event) => {
//   event.preventDefault();
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       localStorage.setItem("loggedInUserId", user.uid);
//       showMessage("Login successful!", "signInMessage");
//       window.location.href = "../index.html";
//     })
//     .catch((error) => {
//       if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
//         showMessage("Incorrect email or password!", "signInMessage");
//       } else {
//         showMessage("Error during login", "signInMessage");
//       }
//     });
// });

// // Logout user
// export function logoutUser() {
//   signOut(auth)
//     .then(() => {
//       localStorage.removeItem("loggedInUserId");
//       window.location.href = "../pages/auth.html";
//     })
//     .catch((error) => {
//       console.error("Error signing out:", error);
//     });
// }

// // Check if the user is logged in on page load
// // Firebase Auth State Change Listener
// onAuthStateChanged(auth, (user) => {
//   const loginButton = document.getElementById("loginButton");
//   const logoutButton = document.getElementById("logoutButton");

//   if (user) {
//     // User is logged in
//     loginButton.style.display = "none";  // Hide login button
//     logoutButton.classList.add("show");  // Show logout button with fade-in effect
//     console.log("User is logged in:", user.email);
//   } else {
//     // User is logged out
//     loginButton.style.display = "inline-block";  // Show login button
//     logoutButton.classList.remove("show");  // Hide logout button
//     console.log("No user is logged in.");
//   }
// });

// // Logout Functionality
// document.getElementById("logoutButton").addEventListener("click", () => {
//   logoutUser();
// });



  