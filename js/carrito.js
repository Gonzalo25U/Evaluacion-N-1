// Sistema de carrito mejorado con cantidades (stack)

// Funciones del carrito con cantidades
function agregarAlCarrito(juegoId) {
  const juego = juegosData.find(j => j.id === juegoId);
  if (!juego) return;

  // Buscar si el juego ya está en el carrito
  const itemExistente = carrito.find(item => item.id === juegoId);
  
  if (itemExistente) {
    // Si ya existe, aumentar la cantidad
    itemExistente.cantidad += 1;
    mostrarNotificacion(`${juego.nombre} agregado al carrito (${itemExistente.cantidad} unidades) 🎮`);
  } else {
    // Si no existe, agregar nuevo item con cantidad 1
    const nuevoItem = {
      ...juego,
      cantidad: 1
    };
    carrito.push(nuevoItem);
    mostrarNotificacion(`${juego.nombre} agregado al carrito! 🎮`);
  }
  
  actualizarContadorCarrito();
  actualizarVistaCarrito();
}

function eliminarDelCarrito(juegoId) {
  const index = carrito.findIndex(item => item.id === juegoId);
  if (index !== -1) {
    const item = carrito[index];
    carrito.splice(index, 1);
    actualizarContadorCarrito();
    actualizarVistaCarrito();
    mostrarNotificacion(`${item.nombre} eliminado del carrito`);
  }
}

// Nueva función para cambiar cantidad específica
function cambiarCantidad(juegoId, nuevaCantidad) {
  const item = carrito.find(item => item.id === juegoId);
  if (item && nuevaCantidad > 0) {
    item.cantidad = nuevaCantidad;
    actualizarContadorCarrito();
    actualizarVistaCarrito();
  } else if (nuevaCantidad <= 0) {
    eliminarDelCarrito(juegoId);
  }
}

// Función para aumentar cantidad
function aumentarCantidad(juegoId) {
  const item = carrito.find(item => item.id === juegoId);
  if (item) {
    item.cantidad += 1;
    actualizarContadorCarrito();
    actualizarVistaCarrito();
  }
}

// Función para disminuir cantidad
function disminuirCantidad(juegoId) {
  const item = carrito.find(item => item.id === juegoId);
  if (item) {
    if (item.cantidad > 1) {
      item.cantidad -= 1;
      actualizarContadorCarrito();
      actualizarVistaCarrito();
    } else {
      eliminarDelCarrito(juegoId);
    }
  }
}

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
                  <button class="btn btn-outline-secondary btn-sm me-1" 
                          onclick="disminuirCantidad(${item.id})" 
                          style="width: 30px; height: 30px; padding: 0;">
                    -
                  </button>
                  <input type="number" 
                         class="form-control form-control-sm text-center mx-1" 
                         style="width: 60px;" 
                         value="${item.cantidad}" 
                         min="1" 
                         onchange="cambiarCantidad(${item.id}, parseInt(this.value))"
                         onkeypress="if(event.key==='Enter') this.blur()">
                  <button class="btn btn-outline-secondary btn-sm ms-1" 
                          onclick="aumentarCantidad(${item.id})" 
                          style="width: 30px; height: 30px; padding: 0;">
                    +
                  </button>
                </div>
              </div>
              <small class="fw-bold text-success">Subtotal: $${subtotal.toFixed(2)}</small>
            </div>
          </div>
          <button class="btn btn-outline-danger btn-sm ms-2" 
                  onclick="eliminarDelCarrito(${item.id})" 
                  title="Eliminar del carrito">
            🗑️
          </button>
        </div>
      `;
      listaCarrito.appendChild(li);
    });

    // Mostrar totales
    totalCarrito.innerHTML = `
      <div class="d-flex justify-content-between">
        <span>Total de items: <strong>${totalItems}</strong></span>
        <span>Total: <strong>$${total.toFixed(2)}</strong></span>
      </div>
    `;
  }
}

function actualizarContadorCarrito() {
  // Contar total de items (considerando cantidades)
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  document.getElementById('cartCount').textContent = totalItems;
}

function vaciarCarrito() {
  if (carrito.length > 0) {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    carrito = [];
    actualizarContadorCarrito();
    actualizarVistaCarrito();
    mostrarNotificacion(`Carrito vaciado (${totalItems} items eliminados)`, 'info');
  }
}

function finalizarCompra() {
  if (carrito.length === 0) return;
  
  if (!usuario) {
    mostrarNotificacion('Debes iniciar sesión para finalizar la compra', 'warning');
    document.getElementById('btnLogin').click();
    return;
  }

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  
  // Agregar la compra al historial del usuario (si existe el sistema de usuarios)
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
        total: total,
        totalItems: totalItems
      };
      
      usuarioEnDB.compras.push(compra);
    }
  }
  
  mostrarNotificacion(
    `¡Compra finalizada! ${totalItems} items por $${total.toFixed(2)} 🎉`, 
    'success'
  );
  
  carrito = [];
  actualizarContadorCarrito();
  actualizarVistaCarrito();
  bootstrap.Modal.getInstance(document.getElementById('carritoModal')).hide();
}

// Función para mostrar resumen rápido del carrito
function mostrarResumenCarrito() {
  if (carrito.length === 0) {
    return "Carrito vacío";
  }
  
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  
  return `${totalItems} items - $${totalPrecio.toFixed(2)}`;
}