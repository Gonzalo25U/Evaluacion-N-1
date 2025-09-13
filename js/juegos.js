// Datos de ejemplo con información extendida
    const juegosData = [
      {
        id: 1,
        nombre: "Cyberpunk 2077",
        precio: 59.99,
        imagen: "https://cloudfront-eu-central-1.images.arcpublishing.com/diarioas/6VUNXA3WDZP2PB2OTDZVP5VZUQ.jpg",
        descripcion: "Un RPG de mundo abierto ambientado en Night City.",
        descripcionDetallada: "Cyberpunk 2077 es un RPG de acción de mundo abierto ambientado en Night City, una megalópolis obsesionada con el poder, el glamur y la modificación corporal. Juegas como V, un mercenario forajido que busca un implante único que es la clave de la inmortalidad. Personaliza el ciberequipo, las habilidades y el estilo de juego de tu personaje para explorar una ciudad enorme donde las decisiones que tomes moldean la historia y el mundo que te rodea.",
        trailer: "https://www.youtube.com/embed/8X2kIfS6fb8",
        desarrollador: "CD Projekt Red",
        genero: "RPG, Acción",
        fechaLanzamiento: "2020-12-10",
        plataformas: ["PC", "PlayStation", "Xbox"],
        calificacion: 4.2,
        requisitos: "Windows 10, Intel Core i5-3570K, 8 GB RAM, GTX 780"
      },
      {
        id: 2,
        nombre: "The Witcher 3",
        precio: 39.99,
        imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ad9240e088f953a84aee814034c50a6a92bf4516/header.jpg?t=1756366569",
        descripcion: "Aventura épica en un mundo de fantasía oscura.",
        descripcionDetallada: "The Witcher 3: Wild Hunt es un RPG de mundo abierto de nueva generación con una apasionante trama, ambientado en un espectacular universo de fantasía lleno de decisiones significativas y consecuencias impactantes. En The Witcher encarnas a Geralt de Rivia, un cazador de monstruos profesional tasked con encontrar a una niña de la profecía en un vasto mundo abierto rico en ciudades de mercaderes, islas piratas, peligrosos pasos de montaña y cavernas olvidadas por explorar.",
        trailer: "https://www.youtube.com/embed/c0i88t0Kacs",
        desarrollador: "CD Projekt Red",
        genero: "RPG, Aventura",
        fechaLanzamiento: "2015-05-19",
        plataformas: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
        calificacion: 4.8,
        requisitos: "Windows 7, Intel Core i5-2500K, 6 GB RAM, GTX 660"
      },
      {
        id: 3,
        nombre: "Elden Ring",
        precio: 59.99,
        imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/YMUoJUYNX0xWk6eTKuZLr5Iw.jpg",
        descripcion: "Uno de los juegos más desafiantes de la compañia FromSoftware.",
        descripcionDetallada: "Elden Ring es un juego de rol y acción en un mundo abierto con ambientación de fantasía oscura creado por Hidetaka Miyazaki y George R. R. Martin. Levántate, Sinluz, y que la gracia te guíe para abrazar el poder del Círculo de Elden y convertirte en un Señor de Elden en las Tierras Intermedias. En las Tierras Intermedias gobernadas por la Reina Marika la Eterna, el Círculo de Elden, origen del Árbol Áureo, ha sido destruido.",
        trailer: "https://www.youtube.com/embed/E3Huy2cdih0",
        desarrollador: "FromSoftware",
        genero: "RPG, Acción, Souls-like",
        fechaLanzamiento: "2022-02-25",
        plataformas: ["PC", "PlayStation", "Xbox"],
        calificacion: 4.7,
        requisitos: "Windows 10, Intel Core i5-8400, 12 GB RAM, GTX 1060"
      },
      {
        id: 4,
        nombre: "God of War: Ragnarok",
        precio: 49.99,
        imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg?t=1750909504",
        descripcion: "Kratos y Atreus en una aventura nórdica.",
        descripcionDetallada: "God of War es un reinicio de la serie, presentando una nueva dirección para el personaje. Kratos ahora vive como un hombre en el reino de Midgard junto con su hijo Atreus. Después de la muerte de su segunda esposa y madre de Atreus, salen en un viaje para cumplir su último deseo: esparcir sus cenizas en el punto más alto de los nueve reinos. A lo largo de su aventura, tienen que lidiar con monstruos y dioses de la mitología nórdica.",
        trailer: "https://www.youtube.com/embed/K0u_kAWLJOA",
        desarrollador: "Santa Monica Studio",
        genero: "Acción, Aventura",
        fechaLanzamiento: "2018-04-20",
        plataformas: ["PC", "PlayStation"],
        calificacion: 4.6,
        requisitos: "Windows 10, Intel Core i5-2500K, 8 GB RAM, GTX 960"
      }
    ];

    // Estado global
    let carrito = [];
    let usuario = null;
    let isLoginMode = true;

    // Funciones de utilidad
    function mostrarNotificacion(mensaje, tipo = 'success') {
      const notification = document.createElement('div');
      notification.className = `alert alert-${tipo} notification`;
      notification.textContent = mensaje;
      document.body.appendChild(notification);
      
      setTimeout(() => notification.classList.add('show'), 100);
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 3000);
    }

    function actualizarContadorCarrito() {
      document.getElementById('cartCount').textContent = carrito.length;
    }

    // Cargar juegos
    function cargarJuegos() {
      setTimeout(() => {
        const contenedor = document.getElementById('contenedorJuegos');
        contenedor.innerHTML = '';
        
        juegosData.forEach(juego => {
          const col = document.createElement('div');
          col.className = 'col-md-6 col-lg-3 mb-4';
          col.innerHTML = `
            <div class="card game-card h-100">
              <img src="${juego.imagen}" class="card-img-top" alt="${juego.nombre}" 
                   style="cursor: pointer;" onclick="mostrarDetalleJuego(${juego.id})">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${juego.nombre}</h5>
                <p class="card-text flex-grow-1">${juego.descripcion}</p>
                <div class="mt-auto">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="price-tag">$${juego.precio}</span>
                    <div class="rating">
                      ${'★'.repeat(Math.floor(juego.calificacion))}${'☆'.repeat(5-Math.floor(juego.calificacion))}
                      <small>(${juego.calificacion})</small>
                    </div>
                  </div>
                  <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${juego.id})">
                    › Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          `;
          contenedor.appendChild(col);
        });
      }, 1200);
    }

    // Función para mostrar detalles del juego
    function mostrarDetalleJuego(juegoId) {
      const juego = juegosData.find(j => j.id === juegoId);
      if (!juego) return;

      const modalContent = `
        <div class="modal fade" id="detalleJuegoModal" tabindex="-1">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">${juego.nombre}</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <img src="${juego.imagen}" alt="${juego.nombre}" class="img-fluid rounded mb-3">
                    <div class="game-info">
                      <p><strong>Desarrollador:</strong> ${juego.desarrollador}</p>
                      <p><strong>Género:</strong> ${juego.genero}</p>
                      <p><strong>Fecha de lanzamiento:</strong> ${new Date(juego.fechaLanzamiento).toLocaleDateString('es-ES')}</p>
                      <p><strong>Plataformas:</strong> ${juego.plataformas.join(', ')}</p>
                      <p><strong>Calificación:</strong> 
                        <span class="rating">
                          ${'★'.repeat(Math.floor(juego.calificacion))}${'☆'.repeat(5-Math.floor(juego.calificacion))}
                          (${juego.calificacion}/5)
                        </span>
                      </p>
                      <p><strong>Requisitos mínimos:</strong> ${juego.requisitos}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="ratio ratio-16x9 mb-3">
                      <iframe src="${juego.trailer}" title="Trailer ${juego.nombre}" allowfullscreen></iframe>
                    </div>
                    <h6>Descripción:</h6>
                    <p>${juego.descripcionDetallada}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <span class="price-tag fs-4">$${juego.precio}</span>
                  <div>
                    <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-success" onclick="agregarAlCarrito(${juego.id})">
                       Agregar al Carrito - $${juego.precio}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Eliminar modal anterior si existe
      const existingModal = document.getElementById('detalleJuegoModal');
      if (existingModal) {
        existingModal.remove();
      }

      // Agregar el nuevo modal al DOM
      document.body.insertAdjacentHTML('beforeend', modalContent);
      
      // Mostrar el modal
      const modal = new bootstrap.Modal(document.getElementById('detalleJuegoModal'));
      modal.show();

      // Limpiar el modal cuando se cierre
      document.getElementById('detalleJuegoModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
      });
    }