// Esta función oculta todas las recomendaciones y limpia el mensaje
function limpiar() {
  const secciones = ['ovalado', 'redondo', 'cuadrado', 'alargado', 'corazon']; // IDs de las secciones a ocultar
  secciones.forEach(id => document.getElementById(id).style.display = 'none'); // Oculta cada sección
  document.getElementById('mensaje').innerHTML = ''; // Limpia el mensaje del rostro seleccionado
}

// Función que se ejecuta al elegir "rostro ovalado"
function rostroOvalado() {
  limpiar(); // Limpia todo lo anterior
  document.getElementById('mensaje').innerHTML = "Elegiste rostro ovalado."; // Muestra mensaje
  document.getElementById('ovalado').style.display = 'block'; // Muestra la sección correspondiente
}

// Función que se ejecuta al elegir "rostro redondo"
function rostroRedondo() {
  limpiar();
  document.getElementById('mensaje').innerHTML = "Elegiste rostro redondo.";
  document.getElementById('redondo').style.display = 'block';
}

// Función que se ejecuta al elegir "rostro cuadrado"
function rostroCuadrado() {
  limpiar();
  document.getElementById('mensaje').innerHTML = "Elegiste rostro cuadrado.";
  document.getElementById('cuadrado').style.display = 'block';
}

// Función que se ejecuta al elegir "rostro alargado"
function rostroAlargado() {
  limpiar();
  document.getElementById('mensaje').innerHTML = "Elegiste rostro alargado.";
  document.getElementById('alargado').style.display = 'block';
}

// Función que se ejecuta al elegir "rostro corazón"
function rostroCorazon() {
  limpiar();
  document.getElementById('mensaje').innerHTML = "Elegiste rostro corazón.";
  document.getElementById('corazon').style.display = 'block';
}