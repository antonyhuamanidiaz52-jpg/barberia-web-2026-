
import { auth } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// =====================================
// ELEMENTOS HTML
// =====================================

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const feedback = document.getElementById("feedback");

const loginHeading = document.getElementById("loginHeading");
const registerHeading = document.getElementById("registerHeading");

const switchLogin = document.getElementById("switchLogin");
const switchRegister = document.getElementById("switchRegister");

const showRegisterButton = document.getElementById("showRegister");
const showLoginButton = document.getElementById("showLogin");


// =====================================
// MENSAJES
// =====================================

function showMessage(message, error = false) {
    feedback.textContent = message;
    feedback.classList.toggle("error", error);
}


// =====================================
// CAMBIAR FORMULARIOS
// =====================================

function showMode(mode) {

    const registering = mode === "register";

    loginForm.classList.toggle("hidden", registering);
    registerForm.classList.toggle("hidden", !registering);

    loginHeading.classList.toggle("hidden", registering);
    registerHeading.classList.toggle("hidden", !registering);

    switchLogin.classList.toggle("hidden", registering);
    switchRegister.classList.toggle("hidden", !registering);

    showMessage("");
}


// =====================================
// BOTONES DE NAVEGACIÓN
// =====================================

showRegisterButton.addEventListener("click", (event) => {
    event.preventDefault();
    showMode("register");
});

showLoginButton.addEventListener("click", (event) => {
    event.preventDefault();
    showMode("login");
});


// =====================================
// MOSTRAR CONTRASEÑA
// =====================================

document.querySelectorAll(".show-password").forEach(button => {

    button.addEventListener("click", () => {

        const input = document.getElementById(button.dataset.target);

        if (input) {
            input.type = input.type === "password" ? "text" : "password";
        }

    });

});


// =====================================
// TRADUCIR ERRORES
// =====================================

function translateError(error) {

    const messages = {
        "auth/invalid-email": "El correo electrónico no es válido.",
        "auth/email-already-in-use": "Este correo ya está registrado.",
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
        "auth/invalid-credential": "Correo o contraseña incorrectos.",
        "auth/user-not-found": "No existe una cuenta con ese correo.",
        "auth/wrong-password": "La contraseña es incorrecta.",
        "auth/network-request-failed": "Revisa tu conexión a internet.",
        "auth/operation-not-allowed": "Activa Email/Password en Firebase.",
        "auth/too-many-requests": "Demasiados intentos. Inténtalo más tarde."
    };

    return messages[error.code] || "Error: " + error.message;
}


// =====================================
// REGISTRAR USUARIO Y ENVIAR VERIFICACIÓN
// =====================================

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();

    const email = document.getElementById("registerEmail").value.trim().toLowerCase();

    const password = document.getElementById("registerPassword").value;

    const confirm = document.getElementById("confirmPassword").value;


    if (!name || !email || !password || !confirm) {
        showMessage("Completa todos los campos.", true);
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage("Ingresa un correo válido.", true);
        return;
    }

    if (password.length < 6) {
        showMessage("La contraseña debe tener al menos 6 caracteres.", true);
        return;
    }

    if (password !== confirm) {
        showMessage("Las contraseñas no coinciden.", true);
        return;
    }


    const button = registerForm.querySelector('button[type="submit"]');

    button.disabled = true;
    button.textContent = "CREANDO CUENTA...";


    try {

        // CREAR CUENTA
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );


        // GUARDAR NOMBRE
        await updateProfile(credential.user, {
            displayName: name
        });


        // ENVIAR CORREO DE VERIFICACIÓN
        await sendEmailVerification(credential.user);


        // CERRAR SESIÓN HASTA QUE VERIFIQUE
        await signOut(auth);


        // MOSTRAR MENSAJE
        showMode("login");

        showMessage(
            "¡Cuenta creada! Enviamos un correo de verificación a " +
            email +
            ". Revisa tu bandeja de entrada y spam antes de iniciar sesión."
        );


        document.getElementById("loginEmail").value = email;


    } catch (error) {

        console.error("Error de registro:", error);

        showMessage(translateError(error), true);

    } finally {

        button.disabled = false;
        button.innerHTML = 'CREAR MI CUENTA <b>→</b>';

    }

});


// =====================================
// INICIAR SESIÓN
// =====================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();

    const password = document.getElementById("loginPassword").value;


    if (!email || !password) {
        showMessage("Completa tu correo y contraseña.", true);
        return;
    }


    const button = loginForm.querySelector('button[type="submit"]');

    button.disabled = true;
    button.textContent = "INICIANDO SESIÓN...";


    try {

        const remember = document.getElementById("rememberMe").checked;


        await setPersistence(
            auth,
            remember ? browserLocalPersistence : browserSessionPersistence
        );


        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        // COMPROBAR SI EL CORREO ESTÁ VERIFICADO
        await credential.user.reload();

        if (!credential.user.emailVerified) {

            await signOut(auth);

            showMessage(
                "Tu correo todavía no está verificado. " +
                "Revisa tu Gmail y pulsa el enlace que te enviamos.",
                true
            );

            return;
        }


        // ACCESO PERMITIDO
        window.location.replace("inicio.html");


    } catch (error) {

        console.error("Error de inicio de sesión:", error);

        showMessage(translateError(error), true);

    } finally {

        button.disabled = false;
        button.innerHTML = 'INICIAR SESIÓN <b>→</b>';

    }

});


// =====================================
// RECUPERAR CONTRASEÑA
// =====================================

document.getElementById("forgotButton").addEventListener("click", async () => {

    const email = document.getElementById("loginEmail").value.trim();


    if (!email) {
        showMessage("Escribe tu correo electrónico primero.", true);
        return;
    }


    try {

        await sendPasswordResetEmail(auth, email);

        showMessage("Se envió el correo para recuperar tu contraseña.");

    } catch (error) {

        console.error("Error al recuperar contraseña:", error);

        showMessage(translateError(error), true);

    }

});


// =====================================
// COMPROBAR SESIÓN
// =====================================

onAuthStateChanged(auth, async (user) => {

    if (user) {

        await user.reload();

        if (user.emailVerified) {
            window.location.replace("inicio.html");
        } else {
            await signOut(auth);
        }

    }

});


console.log("Los Tilines: autenticación y verificación activadas.");
