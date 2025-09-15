// ==========================
// admin.js - Panel de Administración Completo
// ==========================

// ==========================
// Inicializar usuarios y juegos
// ==========================
(function inicializarDatos() {
  // Admin inicial obligatorio
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (!usuarios.some(u => u.rol === "admin")) {
    usuarios.unshift({
      nombre: "Admin",
      email: "admin@admin.com",
      password: "admin123",
      rol: "admin",
      activo: true,
      compras: [],
      fechaRegistro: new Date().toISOString()
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  // Juegos iniciales opcionales
  let juegos = JSON.parse(localStorage.getItem("juegos")) || [];
  if (juegos.length === 0) {
    juegos = [
      { nombre: "Juego 1", precio: 29.99 },
      { nombre: "Juego 2", precio: 49.99 }
    ];
    localStorage.setItem("juegos", JSON.stringify(juegos));
  }
})();

// ==========================
// Mostrar opciones de admin en el menú
// ==========================
function mostrarOpcionesAdmin() {
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!user || user.rol !== "admin") return; // Solo admin
  if (document.getElementById('btnAdminPanel')) return;

  const userMenu = document.getElementById('userMenu');
  const adminBtn = document.createElement('li');
  adminBtn.className = 'nav-item';
  adminBtn.innerHTML = `
    <a class="nav-link text-warning fw-bold" href="#" id="btnAdminPanel" onclick="togglePanelAdmin()">
      🛠️ Admin Panel
    </a>
  `;
  userMenu.insertBefore(adminBtn, userMenu.lastElementChild);
}

// ==========================
// Ocultar opciones admin
// ==========================
function ocultarOpcionesAdmin() {
  const btnAdminPanel = document.getElementById('btnAdminPanel');
  if (btnAdminPanel) btnAdminPanel.parentElement.remove();
  const panel = document.getElementById('adminPanel');
  if (panel) panel.remove();
}

// ==========================
// Toggle panel de administración
// ==========================
function togglePanelAdmin() {
  const panel = document.getElementById('adminPanel');
  if (panel) panel.scrollIntoView({ behavior: 'smooth' });
  else mostrarPanelAdmin();
}

// ==========================
// Mostrar panel de administración
// ==========================
function mostrarPanelAdmin() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const juegos = JSON.parse(localStorage.getItem("juegos")) || [];

  const panelHTML = `
    <section id="adminPanel" class="mt-5">
      <div class="container">
        <div class="card bg-dark text-white border-warning">
          <div class="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
            <h3 class="mb-0">🛠️ Panel de Administración</h3>
            <button class="btn btn-outline-dark btn-sm" onclick="cerrarPanelAdmin()">✕ Cerrar</button>
          </div>
          <div class="card-body">

            <!-- Estadísticas -->
            <div class="row text-center mb-4">
              <div class="col-md-6">
                <div class="p-3 bg-primary rounded">
                  <h4>${juegos.length}</h4>
                  <p>🎮 Juegos Total</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="p-3 bg-success rounded">
                  <h4>${usuarios.length}</h4>
                  <p>👥 Usuarios Totales</p>
                </div>
              </div>
            </div>

            <!-- Secciones de gestión -->
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="card bg-secondary">
                  <div class="card-header"><h5>🎮 Gestión de Juegos</h5></div>
                  <div class="card-body d-grid gap-2">
                    <button class="btn btn-primary" onclick="crearJuego()">➕ Agregar Nuevo Juego</button>
                    <button class="btn btn-info" onclick="mostrarListaJuegos()">📋 Ver Juegos</button>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-secondary">
                  <div class="card-header"><h5>👥 Gestión de Usuarios</h5></div>
                  <div class="card-body d-grid gap-2">
                    <button class="btn btn-success" onclick="mostrarListaUsuarios()">👥 Ver Usuarios</button>
                    <button class="btn btn-warning" onclick="crearUsuario()">➕ Crear Usuario</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contenedor dinámico -->
            <div id="adminContent"></div>

          </div>
        </div>
      </div>
    </section>
  `;

  document.body.insertAdjacentHTML('beforeend', panelHTML);
}

// ==========================
// CRUD Usuarios
// ==========================
function mostrarListaUsuarios() {
  // Tomar todos los usuarios: admin inicial + registrados
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // admin y usuarios creados en admin
  let registrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || []; // usuarios del registro normal

  // Combinar listas
  let todos = [...usuarios, ...registrados];

  // Generar tabla
  const listaHTML = `
    <div class="card bg-secondary mt-3">
      <div class="card-header"><h5>👥 Lista de Usuarios</h5></div>
      <div class="card-body table-responsive">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${todos.map((u,i) => {
              return `
                <tr class="${!u.activo ? 'table-secondary' : ''}">
                  <td>${i+1}</td>
                  <td>${u.nombre}</td>
                  <td>${u.email}</td>
                  <td>${u.rol}</td>
                  <td>${u.activo ? "Activo" : "Inactivo"}</td>
                  <td>${u.rol === "admin" ? '—' : `
                    <button class="btn btn-sm btn-info" onclick="editarUsuario(${i})">✏️ Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${i})">🗑️ Eliminar</button>
                  `}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  document.getElementById("adminContent").innerHTML = listaHTML;
}


function crearUsuario() {
  const nombre = prompt("Nombre del usuario:");
  const email = prompt("Email:");
  const password = prompt("Contraseña:");
  const rol = prompt("Rol (admin/usuario):", "usuario");

  if (!nombre || !email || !password) return alert("Todos los campos son requeridos");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push({ nombre, email, password, rol, activo: true, compras: [], fechaRegistro: new Date().toISOString() });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarListaUsuarios();
}

function editarUsuario(index) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const u = usuarios[index];

  const nombre = prompt("Editar nombre:", u.nombre);
  const email = prompt("Editar email:", u.email);
  const rol = prompt("Editar rol (admin/usuario):", u.rol);

  if (!nombre || !email) return alert("Nombre y email requeridos");

  usuarios[index] = { ...u, nombre, email, rol };
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarListaUsuarios();
}

function eliminarUsuario(index) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const u = usuarios[index];

  // Proteger admin inicial
  if (u.rol === "admin" && u.email === "admin@admin.com") {
    return alert("No puedes eliminar al usuario admin inicial");
  }

  if (!confirm("¿Deseas eliminar este usuario?")) return;
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarListaUsuarios();
}

// ==========================
// CRUD Juegos
// ==========================
function mostrarListaJuegos() {
  let juegos = JSON.parse(localStorage.getItem("juegos")) || [];

  const listaHTML = `
    <div class="card bg-secondary mt-3">
      <div class="card-header"><h5>🎮 Lista de Juegos</h5></div>
      <div class="card-body table-responsive">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Precio</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${juegos.map((j, i) => `
              <tr>
                <td>${i+1}</td>
                <td>${j.nombre}</td>
                <td>$${j.precio}</td>
                <td>
                  <button class="btn btn-sm btn-info" onclick="editarJuego(${i})">✏️ Editar</button>
                  <button class="btn btn-sm btn-danger" onclick="eliminarJuego(${i})">🗑️ Eliminar</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("adminContent").innerHTML = listaHTML;
}

function crearJuego() {
  const nombre = prompt("Nombre del juego:");
  const precio = parseFloat(prompt("Precio:"));
  if (!nombre || isNaN(precio)) return alert("Nombre y precio requeridos");

  let juegos = JSON.parse(localStorage.getItem("juegos")) || [];
  juegos.push({ nombre, precio });
  localStorage.setItem("juegos", JSON.stringify(juegos));
  mostrarListaJuegos();
}

function editarJuego(index) {
  let juegos = JSON.parse(localStorage.getItem("juegos")) || [];
  const j = juegos[index];

  const nombre = prompt("Editar nombre:", j.nombre);
  const precio = parseFloat(prompt("Editar precio:", j.precio));
  if (!nombre || isNaN(precio)) return alert("Nombre y precio requeridos");

  juegos[index] = { ...j, nombre, precio };
  localStorage.setItem("juegos", JSON.stringify(juegos));
  mostrarListaJuegos();
}

function eliminarJuego(index) {
  if (!confirm("¿Deseas eliminar este juego?")) return;
  let juegos = JSON.parse(localStorage.getItem("juegos")) || [];
  juegos.splice(index, 1);
  localStorage.setItem("juegos", JSON.stringify(juegos));
  mostrarListaJuegos();
}

// ==========================
// Cerrar panel
// ==========================
function cerrarPanelAdmin() {
  const panel = document.getElementById('adminPanel');
  if (panel) panel.remove();
}
