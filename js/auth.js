// Base de datos simulada de usuarios
let usuariosDB = [
  {
    id: 1,
    nombre: "Admin",
    email: "admin@admin.com", 
    password: "1234",      
    rol: "admin",
    fechaRegistro: "2025-01-01",
    activo: true,
    compras: []
  },
  {
    id: 2,
    nombre: "Usuario Demo",
    email: "user@demo.com",
    password: "user123",
    rol: "usuario",
    fechaRegistro: "2025-09-01",
    activo: true,
    compras: []
  },
  {
    id: 3,
    nombre: "Juan Pérez",
    email: "juan@email.com",
    password: "123456",
    rol: "usuario",
    fechaRegistro: "2025-09-10",
    activo: true,
    compras: []
  }
];

// Referencias al DOM
const authModalTitle = document.getElementById("authModalTitle");
const authForm = document.getElementById("authForm");
const nombreField = document.getElementById("nombreField");
const authNombre = document.getElementById("authNombre");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authSubmit = document.getElementById("authSubmit");
const authSwitchText = document.getElementById("authSwitchText");
const authSwitchLink = document.getElementById("authSwitchLink");

const authLinks = document.getElementById("authLinks");
const userMenu = document.getElementById("userMenu");
const welcomeMsg = document.getElementById("welcomeMsg");
const btnLogout = document.getElementById("btnLogout");

let isLogin = true;

// Cambiar entre login y registro
authSwitchLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;

  if (isLogin) {
    authModalTitle.textContent = "Iniciar Sesión";
    nombreField.style.display = "none";
    authSubmit.textContent = "Iniciar Sesión";
    authSwitchText.textContent = "¿No tienes cuenta?";
    authSwitchLink.textContent = "Regístrate aquí";
  } else {
    authModalTitle.textContent = "Registrarse";
    nombreField.style.display = "block";
    authSubmit.textContent = "Registrarse";
    authSwitchText.textContent = "¿Ya tienes cuenta?";
    authSwitchLink.textContent = "Inicia sesión aquí";
  }
});

// Manejo del formulario
authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = authEmail.value.trim();
  const password = authPassword.value.trim();
  const nombre = authNombre.value.trim();

  if (isLogin) {
    // --- LOGIN ---
    const usuario = usuariosDB.find(u => u.email === email && u.password === password);

    if (usuario) {
      iniciarSesion(usuario);
      // Cerrar modal de forma segura
      const authModalEl = document.getElementById("authModal");
      const authModalInstance = bootstrap.Modal.getOrCreateInstance(authModalEl);
      authModalInstance.hide();
    } else {
      alert("Email o contraseña incorrectos ❌");
    }

  } else {
    // --- REGISTRO ---
    if (!nombre || !email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (usuariosDB.some(u => u.email === email)) {
      alert("Este email ya está registrado ❌");
      return;
    }

    const nuevoUsuario = {
      id: Math.max(...usuariosDB.map(u => u.id)) + 1,
      nombre,
      email,
      password,
      rol: "usuario",
      fechaRegistro: new Date().toISOString().split("T")[0],
      activo: true,
      compras: []
    };
    usuariosDB.push(nuevoUsuario);

    iniciarSesion(nuevoUsuario);
    const authModalEl = document.getElementById("authModal");
    const authModalInstance = bootstrap.Modal.getOrCreateInstance(authModalEl);
    authModalInstance.hide();
  }

  authForm.reset();
});

// Iniciar sesión y actualizar UI
function iniciarSesion(usuario) {
  welcomeMsg.textContent = `Bienvenido, ${usuario.nombre}`;
  authLinks.classList.add("d-none");
  userMenu.classList.remove("d-none");

  // Guardar usuario activo
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

  // Mostrar panel admin si es admin
  if (usuario.rol === "admin") {
    mostrarOpcionesAdmin();
    togglePanelAdmin();
  } else {
    ocultarOpcionesAdmin();
  }
}

// Cerrar sesión
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("usuarioActivo");
  authLinks.classList.remove("d-none");
  userMenu.classList.add("d-none");
  ocultarOpcionesAdmin();
});

// Mantener sesión al recargar
document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuarioActivo) {
    iniciarSesion(usuarioActivo);
  }
});
