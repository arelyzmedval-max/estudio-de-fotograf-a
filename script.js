// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Configuración Firebase (✅ tu configuración real)
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

// Saber en qué página estoy
const path = window.location.pathname;
const isIndex =
  path.endsWith("/") || path.endsWith("/index.html") || path.endsWith("index.html");
const isPrincipal = path.endsWith("/principal.html") || path.endsWith("principal.html");

// 🔄 Cuando cambia el estado de autenticación
onAuthStateChanged(auth, (user) => {
  // Si estoy en index (login) y YA hay usuario, lo mando a principal
  if (isIndex && user) {
    window.location.href = "principal.html";
  }

  // Si estoy en principal y NO hay usuario, lo mando al login (index)
  if (isPrincipal && !user) {
    window.location.href = "index.html";
  }
});

// --- LOGIN ---
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Inicio de sesión exitoso 🎉");
        window.location.href = "principal.html"; // 👉 va a la página principal
      })
      .catch((error) => alert(error.message));
  });
}

// --- REGISTRO ---
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Cuenta creada ✅. Ahora inicia sesión.");
        // 👉 tu login está en index.html, no en login.html
        window.location.href = "index.html";
      })
      .catch((error) => alert(error.message));
  });
}

// --- CERRAR SESIÓN ---
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("Sesión cerrada 👋");
        // 👉 al cerrar sesión volvemos al login (index)
        window.location.href = "index.html";
      })
      .catch((error) => alert(error.message));
  });
}
// --- BOTÓN RESERVAR SESIÓN ---
const reservarBtn = document.getElementById("btn-reserva");
if (reservarBtn) {
  reservarBtn.addEventListener("click", () => {
    const contacto = document.getElementById("contacto");
    if (contacto) {
      contacto.scrollIntoView({ behavior: "smooth" }); // baja suave a la sección contacto
    }
  });
}
