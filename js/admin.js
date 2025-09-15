// ==========================
// admin.js - Panel de Administración Mejorado
// ==========================

// Mostrar opciones admin en el menú
function mostrarOpcionesAdmin() {
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

// Quitar opciones admin
function ocultarOpcionesAdmin() {
  const btnAdminPanel = document.getElementById('btnAdminPanel');
  if (btnAdminPanel) btnAdminPanel.parentElement.remove();

  const adminPanel = document.getElementById('adminPanel');
  if (adminPanel) adminPanel.remove();
}

// Mostrar u ocultar el panel
function togglePanelAdmin() {
  const adminPanel = document.getElementById('adminPanel');
  if (adminPanel) {
    adminPanel.scrollIntoView({ behavior: 'smooth' });
  } else {
    mostrarPanelAdministracion();
  }
}

// Panel de administración
function mostrarPanelAdministracion() {
  const panelHTML = `
    <section id="adminPanel" class="mt-5">
      <div class="container">
        <div class="card bg-dark text-white border-warning">
          <div class="card-header bg-warning text-dark d-flex justify-content-between">
            <h3 class="mb-0">🛠️ Panel de Administración</h3>
            <button class="btn btn-outline-dark btn-sm" onclick="cerrarPanelAdmin()">✕ Cerrar</button>
          </div>
          <div class="card-body">
            <div class="row text-center mb-4">
              <div class="col-md-4">
                <div class="admin-stat-card bg-primary rounded p-3">
                  <h4>${typeof juegosData !== "undefined" ? juegosData.length : 0}</h4>
                  <p class="mb-0">🎮 Juegos Total</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="admin-stat-card bg-success rounded p-3">
                  <h4>${usuariosDB.filter(u => u.activo).length}</h4>
                  <p class="mb-0">👥 Usuarios Activos</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="admin-stat-card bg-info rounded p-3">
                  <h4>$${usuariosDB.reduce((total, u) => 
                    total + u.compras.reduce((sum, c) => sum + (c.total || c.precio || 0), 0), 0).toFixed(2)}</h4>
                  <p class="mb-0">💰 Ventas Total</p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="card bg-secondary">
                  <div class="card-header"><h5>🎮 Gestión de Juegos</h5></div>
                  <div class="card-body d-grid gap-2">
                    <button class="btn btn-primary" onclick="crearJuego()">➕ Agregar Nuevo Juego</button>
                    <button class="btn btn-info" onclick="mostrarListaJuegos()">📋 Ver/Editar Juegos</button>
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

            <div id="adminContent" class="mt-4"></div>
          </div>
        </div>
      </div>
    </section>
  `;
  document.getElementById('contacto').insertAdjacentHTML('afterend', panelHTML);
}

// ---------------------------------------
// CRUD Usuarios
// ---------------------------------------
function mostrarListaUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || usuariosDB;
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
            ${usuarios.map((u, i) => `
              <tr class="${!u.activo ? 'table-secondary' : ''}">
                <td>${i+1}</td>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>${u.rol}</td>
                <td>${u.activo ? "Activo" : "Inactivo"}</td>
                <td>
                  <button class="btn btn-sm btn-info" onclick="editarUsuario(${i})">✏️ Editar</button>
                  <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${i})">🗑️ Eliminar</button>
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

function crearUsuario() {
  const nombre = prompt("Nombre del usuario:");
  const email = prompt("Email:");
  const password = prompt("Contraseña:");
  const rol = prompt("Rol (admin/usuario):", "usuario");
  if (!nombre || !email || !password) return alert("Todos los campos son requeridos");
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || usuariosDB;
  usuarios.push({ nombre, email, password, rol, activo: true, compras: [], fechaRegistro: new Date().toISOString() });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarListaUsuarios();
}

function editarUsuario(index) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || usuariosDB;
  const user = usuarios[index];
  const nombre = prompt("Editar nombre:", user.nombre);
  const email = prompt("Editar email:", user.email);
  const rol = prompt("Editar rol (admin/usuario):", user.rol);
  const activo = confirm("¿Está activo? OK=Sí, Cancelar=No");
  if (!nombre || !email) return alert("Nombre y email son requeridos");
  usuarios[index] = { ...user, nombre, email, rol, activo };
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarListaUsuarios();
}

function eliminarUsuario(index) {
  if (!confirm("¿Deseas eliminar este usuario?")) return;
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || usuariosDB;
  usuarios.splice(index,1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarListaUsuarios();
}

// ---------------------------------------
// CRUD Juegos
// ---------------------------------------
function mostrarListaJuegos() {
  let juegos = JSON.parse(localStorage.getItem("juegos")) || juegosData || [];
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
  let juegos = JSON.parse(localStorage.getItem("juegos")) || juegosData || [];
  juegos.push({ nombre, precio });
  localStorage.setItem("juegos", JSON.stringify(juegos));
  mostrarListaJuegos();
}

function editarJuego(index) {
  let juegos = JSON.parse(localStorage.getItem("juegos")) || juegosData || [];
  const juego = juegos[index];
  const nombre = prompt("Editar nombre:", juego.nombre);
  const precio = parseFloat(prompt("Editar precio:", juego.precio));
  if (!nombre || isNaN(precio)) return alert("Nombre y precio requeridos");
  juegos[index] = { ...juego, nombre, precio };
  localStorage.setItem("juegos", JSON.stringify(juegos));
  mostrarListaJuegos();
}

function eliminarJuego(index) {
  if (!confirm("¿Deseas eliminar este juego?")) return;
  let juegos = JSON.parse(localStorage.getItem("juegos")) || juegosData || [];
  juegos.splice(index,1);
  localStorage.setItem("juegos", JSON.stringify(juegos));
  mostrarListaJuegos();
}

// Cerrar panel
function cerrarPanelAdmin() {
  const panel = document.getElementById('adminPanel');
  if (panel) panel.remove();
}
