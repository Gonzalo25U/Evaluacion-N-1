// carrito.js - Sistema de carrito con cantidades y persistencia

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Agregar un juego al carrito
function agregarAlCarrito(juegoId) {
  const juego = juegosData.find(j => j.id === juegoId);
  if (!juego) return;

  const itemExistente = carrito.find(item => item.id === juegoId);

  if (itemExistente) {
    itemExistente.cantidad += 1;
    mostrarNotificacion(`${juego.nombre} agregado al carrito (${itemExistente.cantidad} unidades) 🎮`);
  } else {
    carrito.push({ ...juego, cantidad: 1 });
    mostrarNotificacion(`${juego.nombre} agregado al carrito! 🎮`);
  }

  guardarCarrito();
  actualizarContadorCarrito();
  actualizarVistaCarrito();
}

// Eliminar del carrito
function eliminarDelCarrito(juegoId) {
  const index = carrito.findIndex(item => item.id === juegoId);
  if (index !== -1) {
    const item = carrito[index];
    carrito.splice(index, 1);
    mostrarNotificacion(`${item.nombre} eliminado del carrito`);
    guardarCarrito();
    actualizarContadorCarrito();
    actualizarVistaCarrito();
  }
}

// Cambiar cantidad específica
function cambiarCantidad(juegoId, nuevaCantidad) {
  const item = carrito.find(item => item.id === juegoId);
  if (item) {
    if (nuevaCantidad > 0) {
      item.cantidad = nuevaCantidad;
    } else {
      eliminarDelCarrito(juegoId);
      return;
    }
    guardarCarrito();
    actualizarContadorCarrito();
    actualizarVistaCarrito();
  }
}

// Aumentar / disminuir cantidad
function aumentarCantidad(juegoId) {
  const item = carrito.find(item => item.id === juegoId);
  if (item) {
    item.cantidad += 1;
    guardarCarrito();
    actualizarContadorCarrito();
    actualizarVistaCarrito();
  }
}

function disminuirCantidad(juegoId) {
  const item = carrito.find(item => item.id === juegoId);
  if (item) {
    if (item.cantidad > 1) {
      item.cantidad -= 1;
    } else {
      eliminarDelCarrito(juegoId);
      return;
    }
    guardarCarrito();
    actualizarContadorCarrito();
    actualizarVistaCarrito();
  }
}

// Vaciar carrito
function vaciarCarrito() {
  if (carrito.length > 0) {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito();
    actualizarVistaCarrito();
    mostrarNotificacion(`Carrito vaciado (${totalItems} items eliminados)`, 'info');
  }
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) return;

  const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
  if (!usuario) {
    mostrarNotificacion('Debes iniciar sesión para finalizar la compra', 'warning');
    document.getElementById('btnLogin').click();
    return;
  }

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  if (typeof usuariosDB !== 'undefined') {
    const usuarioEnDB = usuariosDB.find(u => u.id === usuario.id);
    if (usuarioEnDB) {
      const compra = {
        fecha: new Date().toISOString().split('T')[0],
        items: carrito.map(item => ({
          juegoId: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          subtotal: item.precio * item.cantidad
        })),
        total,
        totalItems
      };
      usuarioEnDB.compras.push(compra);
      localStorage.setItem('usuarios', JSON.stringify(usuariosDB));
    }
  }

  mostrarNotificacion(`¡Compra finalizada! ${totalItems} items por $${total.toFixed(2)} 🎉`, 'success');

  carrito = [];
  guardarCarrito();
  actualizarContadorCarrito();
  actualizarVistaCarrito();
  bootstrap.Modal.getInstance(document.getElementById('carritoModal')).hide();
}

// Actualizar vista del carrito
function actualizarVistaCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  const carritoVacio = document.getElementById('carritoVacio');
  const carritoTotal = document.getElementById('carritoTotal');
  const totalCarrito = document.getElementById('totalCarrito');
  const vaciarBtn = document.getElementById('vaciarCarrito');
  const finalizarBtn = document.getElementById('finalizarCompra');

  if (carrito.length === 0) {
    carritoVacio.classList.remove('d-none');
    listaCarrito.classList.add('d-none');
    carritoTotal.classList.add('d-none');
    vaciarBtn.disabled = true;
    finalizarBtn.disabled = true;
  } else {
    carritoVacio.classList.add('d-none');
    listaCarrito.classList.remove('d-none');
    carritoTotal.classList.remove('d-none');
    vaciarBtn.disabled = false;
    finalizarBtn.disabled = false;

    listaCarrito.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    carrito.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      totalItems += item.cantidad;

      const li = document.createElement('li');
      li.className = 'list-group-item cart-item';
      li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center flex-grow-1">
            <img src="${item.imagen}" alt="${item.nombre}" 
                 style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" 
                 class="me-3">
            <div class="flex-grow-1">
              <h6 class="mb-1">${item.nombre}</h6>
              <div class="d-flex align-items-center">
                <small class="text-muted me-2">$${item.precio} c/u</small>
                <div class="quantity-controls d-flex align-items-center">
                  <button class="btn btn-outline-secondary btn-sm me-1" onclick="disminuirCantidad(${item.id})">-</button>
                  <input type="number" class="form-control form-control-sm text-center mx-1" style="width: 60px;" value="${item.cantidad}" min="1" onchange="cambiarCantidad(${item.id}, parseInt(this.value))">
                  <button class="btn btn-outline-secondary btn-sm ms-1" onclick="aumentarCantidad(${item.id})">+</button>
                </div>
              </div>
              <small class="fw-bold text-success">Subtotal: $${subtotal.toFixed(2)}</small>
            </div>
          </div>
          <button class="btn btn-outline-danger btn-sm ms-2" onclick="eliminarDelCarrito(${item.id})" title="Eliminar del carrito">🗑️</button>
        </div>
      `;
      listaCarrito.appendChild(li);
    });

    totalCarrito.innerHTML = `
      <div class="d-flex justify-content-between">
        <span>Total de items: <strong>${totalItems}</strong></span>
        <span>Total: <strong>$${total.toFixed(2)}</strong></span>
      </div>
    `;
  }
}

// Actualizar contador
function actualizarContadorCarrito() {
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById('cartCount').textContent = totalItems;
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar resumen rápido
function mostrarResumenCarrito() {
  if (carrito.length === 0) return "Carrito vacío";
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrecio = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  return `${totalItems} items - $${totalPrecio.toFixed(2)}`;
}
