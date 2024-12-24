  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='auth.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// import { logoutUser } from "../js/firebaseauth";

// const auth = getAuth();
// const db = getFirestore();

// onAuthStateChanged(auth, (user) => {
//   const loggedInUserId = localStorage.getItem("loggedInUserId");
  
//   const loginButton = document.getElementById('signInButton');
//   const signUpButton = document.getElementById('signUpButton');
//   const logoutButton = document.getElementById('logoutButton');
  
//   if (user && loggedInUserId) {
//     // Show logout button
//     logoutButton.style.display = 'block';
//     // Hide login/signup buttons
//     loginButton.style.display = 'none';
//     signUpButton.style.display = 'none';
    
//     const docRef = doc(db, "users", loggedInUserId);
//     getDoc(docRef)
//       .then((docSnap) => {
//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           document.getElementById("loggedUserFName").innerText = userData.firstName;
//           document.getElementById("loggedUserEmail").innerText = userData.email;
//           document.getElementById("loggedUserLName").innerText = userData.lastName;
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   } else {
//     // Hide logout button
//     logoutButton.style.display = 'none';
//     // Show login/signup buttons
//     loginButton.style.display = 'block';
//     signUpButton.style.display = 'block';
//     window.location.href = "../pages/auth.html";
//   }
// });

// document.getElementById("logoutButton").addEventListener("click", logoutUser);
