
import { auth } from "./firebase-config.js";

import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// ELEMENTOS
const logoutButton = document.getElementById("logoutButton");
const userName = document.getElementById("userName");


// VERIFICAR SESIÓN
onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.replace("index.html");
        return;
    }

    // MOSTRAR NOMBRE DEL CLIENTE
    if (userName) {
        userName.textContent = user.displayName || user.email;
    }

});


// CERRAR SESIÓN
if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        try {

            logoutButton.disabled = true;
            logoutButton.textContent = "CERRANDO SESIÓN...";

            await signOut(auth);

            window.location.replace("index.html");

        } catch (error) {

            console.error("Error al cerrar sesión:", error);

            alert("No se pudo cerrar la sesión: " + error.message);

            logoutButton.disabled = false;
            logoutButton.textContent = "Cerrar sesión";

        }

    });

}

console.log("Sistema de sesión Los Tilines iniciado.");
