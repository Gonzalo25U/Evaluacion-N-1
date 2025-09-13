   // Event Listeners
    document.addEventListener('DOMContentLoaded', function() {
      cargarNoticias();
      cargarJuegos();
      actualizarContadorCarrito();
      actualizarVistaCarrito();

      // Auth events
      document.getElementById('authSwitchLink').addEventListener('click', cambiarModoAuth);
      document.getElementById('authForm').addEventListener('submit', procesarAuth);
      document.getElementById('btnLogout').addEventListener('click', cerrarSesion);

      // Cart events
      document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);
      document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);

      // Contact form
      document.getElementById('formContacto').addEventListener('submit', procesarContacto);

      // Smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    });