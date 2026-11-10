// Función para manejar la reserva
function reservarCita(event) {
  event.preventDefault(); // Evitar el envío predeterminado del formulario

  // Obtener los valores de los campos del formulario
  const nombre = document.querySelector('input[name="nombre"]').value;
  const correo = document.querySelector('input[name="correo"]').value;
  const fecha = document.querySelector('input[name="fecha"]').value;
  const hora = document.querySelector('input[name="hora"]').value;
  const nota = document.querySelector('textarea[name="nota"]').value;

  // Validar que todos los campos necesarios estén completos
  if (!nombre || !correo || !fecha || !hora) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  // Mostrar confirmación antes de enviar el formulario
  const confirmacion = confirm(`¿Estás seguro de que deseas reservar la cita con los siguientes detalles?\n\nNombre: ${nombre}\nCorreo: ${correo}\nFecha: ${fecha}\nHora: ${hora}\nNotas: ${nota ? nota : 'No hay notas adicionales'}`);
  
  if (confirmacion) {
    // Si el usuario confirma, se envía el formulario
    document.getElementById('reserva-form').submit();
  } else {
    alert('Reserva cancelada.');
  }
}

// Añadir el evento al formulario
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('reserva-form');
  
  // Cuando se envíe el formulario, se llama a la función reservarCita
  formulario.addEventListener('submit', reservarCita);
});
