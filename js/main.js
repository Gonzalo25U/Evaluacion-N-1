document.addEventListener("DOMContentLoaded", function () {
  // Carga inicial de noticias y juegos (página principal)
  cargarNoticias();
  cargarJuegos();
  mostrarCatalogo();

  // Cargar carrito desde localStorage
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }

  // Actualizar contador y vista del carrito
  actualizarContadorCarrito();
  actualizarVistaCarrito();

  // Eventos de autenticación
  const authForm = document.getElementById("authForm");
  const btnLogout = document.getElementById("btnLogout");

  if (authForm) authForm.addEventListener("submit", procesarAuth);
  if (btnLogout) btnLogout.addEventListener("click", cerrarSesion);

  // Eventos del carrito
  const btnVaciarCarrito = document.getElementById("vaciarCarrito");
  const btnFinalizarCompra = document.getElementById("finalizarCompra");

  if (btnVaciarCarrito) btnVaciarCarrito.addEventListener("click", vaciarCarrito);
  if (btnFinalizarCompra) btnFinalizarCompra.addEventListener("click", finalizarCompra);

  // Formulario de contacto
  const formContacto = document.getElementById("formContacto");
  if (formContacto) formContacto.addEventListener("submit", procesarContacto);

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Mostrar opciones de admin si corresponde
  mostrarOpcionesAdmin();
});

// Forzar modo login o registro al abrir modal
const btnLogin = document.getElementById("btnLogin");
const btnRegistro = document.getElementById("btnRegistro");

if (btnLogin) {
  btnLogin.addEventListener("click", () => {
    if (!isLogin) cambiarAModoLogin();
  });
}

if (btnRegistro) {
  btnRegistro.addEventListener("click", () => {
    if (isLogin) cambiarAModoRegistro();
  });
}

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
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuarioActivo && usuarioActivo.rol === "admin") {
    mostrarOpcionesAdmin();
  }
}

// Mostrar Catálogo de Productos
function mostrarCatalogo() {
  const catalogoDiv = document.getElementById("catalogoProductos");
  if (!catalogoDiv) return;

  let juegos = JSON.parse(localStorage.getItem("juegos")) || [];

  if (juegos.length === 0) {
    catalogoDiv.innerHTML = `
      <p class="text-center text-muted">No hay productos disponibles en este momento.</p>`;
    return;
  }

  catalogoDiv.innerHTML = juegos
    .map(
      (j, i) => `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title"style="color:white ;" >${j.nombre}</h5>
            <p class="card-text fw-bold"style="color:white ;">$${j.precio}</p>
            <button class="btn btn-primary" onclick="agregarAlCarrito(${i})">
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Llamada inicial para admin
initAdminPanel();
