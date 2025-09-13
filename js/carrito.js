

    // Funciones del carrito
    function agregarAlCarrito(juegoId) {
      const juego = juegosData.find(j => j.id === juegoId);
      if (juego && !carrito.find(item => item.id === juegoId)) {
        carrito.push(juego);
        actualizarContadorCarrito();
        actualizarVistaCarrito();
        mostrarNotificacion(`${juego.nombre} agregado al carrito! 🎮`);
      } else if (carrito.find(item => item.id === juegoId)) {
        mostrarNotificacion('Este juego ya está en tu carrito', 'warning');
      }
    }

    function eliminarDelCarrito(juegoId) {
      const index = carrito.findIndex(item => item.id === juegoId);
      if (index !== -1) {
        const juego = carrito[index];
        carrito.splice(index, 1);
        actualizarContadorCarrito();
        actualizarVistaCarrito();
        mostrarNotificacion(`${juego.nombre} eliminado del carrito`);
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

        carrito.forEach(item => {
          total += item.precio;
          const li = document.createElement('li');
          li.className = 'list-group-item cart-item d-flex justify-content-between align-items-center';
          li.innerHTML = `
            <div class="d-flex align-items-center">
              <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;" class="me-3">
              <div>
                <h6 class="mb-0">${item.nombre}</h6>
                <small class="text-muted">$${item.precio}</small>
              </div>
            </div>
            <button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">
              🗑️
            </button>
          `;
          listaCarrito.appendChild(li);
        });

        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
      }
    }

    function vaciarCarrito() {
      if (carrito.length > 0) {
        carrito = [];
        actualizarContadorCarrito();
        actualizarVistaCarrito();
        mostrarNotificacion('Carrito vaciado', 'info');
      }
    }

    function finalizarCompra() {
      if (carrito.length === 0) return;
      
      if (!usuario) {
        mostrarNotificacion('Debes iniciar sesión para finalizar la compra', 'warning');
        document.getElementById('btnLogin').click();
        return;
      }

      const total = carrito.reduce((sum, item) => sum + item.precio, 0);
      mostrarNotificacion(`¡Compra finalizada! Total: $${total.toFixed(2)} 🎉`, 'success');
      carrito = [];
      actualizarContadorCarrito();
      actualizarVistaCarrito();
      bootstrap.Modal.getInstance(document.getElementById('carritoModal')).hide();
    }