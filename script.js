// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBq3C5Cz4qaHWgXac1rLEGVJSdhcyWecXU",
  authDomain: "estudiofotografia-f3ea3.firebaseapp.com",
  projectId: "estudiofotografia-f3ea3",
  storageBucket: "estudiofotografia-f3ea3.firebasestorage.app",
  messagingSenderId: "567124117238",
  appId: "1:567124117238:web:f57222429aef7bd7964ed7",
  measurementId: "G-CCVFFC8XB4"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- LOGIN ---
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        alert("Inicio de sesión exitoso 🎉");
        window.location.href = "principal.html";
      })
      .catch(error => alert(error.message));
  });
}

// --- REGISTRO ---
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        alert("Cuenta creada ✅");
        window.location.href = "login.html";
      })
      .catch(error => alert(error.message));
  });
}

// --- CERRAR SESIÓN ---
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}

// --- PROTEGER PÁGINA ---
onAuthStateChanged(auth, user => {
  if (document.body.contains(logoutBtn) && !user) {
    // Si estamos en la página principal y no hay usuario logueado
    window.location.href = "login.html";
  }
});
