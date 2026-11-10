document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("compra-form");

  form.addEventListener("submit", function (event) {
    // Validación básica de campos
    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const producto = form.producto.value;
    const cantidad = form.cantidad.value;
    const direccion = form.direccion.value.trim();

    if (!nombre || !correo || !producto || !cantidad || !direccion) {
      event.preventDefault();
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Confirmación de compra
    const confirmacion = confirm(`¿Deseas confirmar la compra de "${producto}" (x${cantidad})?`);
    if (!confirmacion) {
      event.preventDefault(); // Cancela el envío si el usuario no confirma
      return;
    }

    // Mostrar alerta de pedido aceptado
    alert("Tu pedido ha sido aceptado. Estará llegando en un periodo de 3 a 5 días.");
  });
});
