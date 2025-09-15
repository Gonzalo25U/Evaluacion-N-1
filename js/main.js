document.addEventListener('DOMContentLoaded', function() {
  // Carga inicial de noticias y juegos (página principal)
  cargarNoticias();
  cargarJuegos();

  // Cargar carrito desde localStorage
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
  }

  // Actualizar contador y vista del carrito
  actualizarContadorCarrito();
  actualizarVistaCarrito();

  // Eventos de autenticación
  const authSwitchLink = document.getElementById('authSwitchLink');
  const authForm = document.getElementById('authForm');
  const btnLogout = document.getElementById('btnLogout');


  
  if (authForm) authForm.addEventListener('submit', procesarAuth);
  if (btnLogout) btnLogout.addEventListener('click', cerrarSesion);

  // Eventos del carrito
  const btnVaciarCarrito = document.getElementById('vaciarCarrito');
  const btnFinalizarCompra = document.getElementById('finalizarCompra');

  if (btnVaciarCarrito) btnVaciarCarrito.addEventListener('click', vaciarCarrito);
  if (btnFinalizarCompra) btnFinalizarCompra.addEventListener('click', finalizarCompra);

  // Formulario de contacto
  const formContacto = document.getElementById('formContacto');
  if (formContacto) formContacto.addEventListener('submit', procesarContacto);

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Mostrar opciones de admin si corresponde
  mostrarOpcionesAdmin();
});

// Forzar modo login o registro al abrir modal
document.getElementById("btnLogin").addEventListener("click", () => {
  if (!isLogin) cambiarAModoLogin();
});

document.getElementById("btnRegistro").addEventListener("click", () => {
  if (isLogin) cambiarAModoRegistro();
});

// Funciones para forzar el modo (login o registro)
function cambiarAModoLogin() {
  isLogin = true;
  authModalTitle.textContent = "Iniciar Sesión";
  nombreField.style.display = "none";
  authSubmit.textContent = "Iniciar Sesión";
  authSwitchText.textContent = "¿No tienes cuenta?";
  authSwitchLink.textContent = "Regístrate aquí";
}

function cambiarAModoRegistro() {
  isLogin = false;
  authModalTitle.textContent = "Registrarse";
  nombreField.style.display = "block";
  authSubmit.textContent = "Registrarse";
  authSwitchText.textContent = "¿Ya tienes cuenta?";
  authSwitchLink.textContent = "Inicia sesión aquí";
}

// Inicializar panel admin si el usuario activo es admin
function initAdminPanel() {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
  if (usuarioActivo && usuarioActivo.rol === 'admin') {
    mostrarOpcionesAdmin();
  }
}

// Llamada inicial para admin
initAdminPanel();
