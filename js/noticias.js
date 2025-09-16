const noticiasData = [
  {
    id: 1,
    titulo: "Nuevas actualizaciones para Cyberpunk 2077",
    contenido: "CD Projekt Red anuncia nuevas mejoras y contenido adicional.",
    contenidoCompleto: "CD Projekt Red ha anunciado una nueva actualización masiva para Cyberpunk 2077 que incluye mejoras significativas en el rendimiento, corrección de bugs críticos y nuevo contenido descargable. La actualización 2.1 presenta un sistema de IA mejorado para los NPCs, nuevas misiones secundarias ambientadas en los distritos menos explorados de Night City, y una expansión del sistema de crafting que permitirá a los jugadores crear modificaciones corporales únicas. Además, se han añadido nuevos vehículos, incluyendo motocicletas de alta velocidad y coches voladores experimentales. Los desarrolladores también confirmaron que están trabajando en compatibilidad con realidad virtual para el primer trimestre de 2026.",
    fecha: "2025-09-10",
    imagen: "https://universidadeuropea.com/resources/media/images/tipos-videojuegos-800x450.width-640.jpg",
    autor: "GameZone Editorial",
    categoria: "Actualizaciones",
    tiempoLectura: "5 min",
    tags: ["Cyberpunk 2077", "CD Projekt Red", "Actualización", "DLC"],
    fuente: "CD Projekt Red Official",
    imagenDetalle: "https://catnessgames.com/wp-content/uploads/2024/12/tipos-videojuegos-consolas-y-plataformas.jpg"
  },
  {
    id: 2,
    titulo: "E3 2025: Lo que esperamos ver",
    contenido: "Un vistazo a los juegos más esperados del año.",
    contenidoCompleto: "El E3 2025 promete ser uno de los eventos más emocionantes de la industria de los videojuegos, con grandes anuncios esperados de los principales estudios. Sony Interactive Entertainment ha confirmado su presencia con rumores de mostrar el primer gameplay de la secuela de Ghost of Tsushima y posibles detalles sobre PlayStation 6. Microsoft planea revelar nuevos títulos exclusivos para Xbox Series X/S, incluyendo el muy anticipado Fable 4 y actualizaciones sobre el próximo Elder Scrolls VI. Nintendo, aunque no confirmó oficialmente su participación, se especula que podría sorprender con el anuncio de la Nintendo Switch 2. Otros estudios como Ubisoft, EA y Activision también tendrán presencia fuerte, con Ubisoft prometiendo mostrar el nuevo Assassin's Creed ambientado en el Japón feudal.",
    fecha: "2025-09-08",
    imagen: "https://www.uoc.edu/content/dam/news/images/noticies/2025/videojocs-multijugador.jpeg",
    autor: "María González",
    categoria: "Eventos",
    tiempoLectura: "8 min",
    tags: ["E3", "PlayStation", "Xbox", "Nintendo", "Eventos"],
    fuente: "GameZone Exclusive",
    imagenDetalle: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    titulo: "PlayStation 6 rumores y especulaciones",
    contenido: "Todo lo que sabemos sobre la próxima consola de Sony.",
    contenidoCompleto: "Los rumores sobre PlayStation 6 han comenzado a intensificarse después de que Sony registrara varias patentes relacionadas con nueva tecnología de procesamiento gráfico. Según fuentes cercanas a la compañía, la PS6 podría lanzarse a finales de 2027 o principios de 2028, con un procesador personalizado basado en arquitectura AMD Zen 5 y una GPU capaz de renderizar juegos en 8K nativo a 120fps. La consola incorporaría tecnología de ray tracing de próxima generación, soporte completo para realidad virtual sin necesidad de hardware adicional, y un sistema de almacenamiento SSD ultra rápido que eliminaría por completo los tiempos de carga. Sony también estaría experimentando con tecnología háptica avanzada que permitiría sentir texturas y temperatura a través del controlador DualSense 2. Los desarrolladores ya habrían recibido kits de desarrollo preliminares para comenzar a trabajar en títulos de lanzamiento.",
    fecha: "2025-09-05",
    imagen: "https://dplnews.com/wp-content/uploads/2024/09/dplnews_ps5_vr110924.png",
    autor: "Carlos Ruiz",
    categoria: "Hardware",
    tiempoLectura: "6 min",
    tags: ["PlayStation 6", "Sony", "Rumores", "Hardware", "Consolas"],
    fuente: "Industry Insider",
    imagenDetalle: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    titulo: "Steam Deck 2: Valve confirma desarrollo",
    contenido: "La portátil de Valve tendrá una segunda generación mejorada.",
    contenidoCompleto: "Valve ha confirmado oficialmente que está trabajando en Steam Deck 2, la segunda generación de su popular consola portátil PC. El nuevo dispositivo promete mejoras significativas en rendimiento, duración de batería y calidad de pantalla. Según Gabe Newell, CEO de Valve, el Steam Deck 2 contará con un procesador AMD Ryzen personalizado de nueva generación, 32GB de RAM LPDDR5X, y opciones de almacenamiento de hasta 2TB SSD. La pantalla será OLED de 8 pulgadas con resolución 1600x2560 y frecuencia de actualización variable de hasta 120Hz. Una de las características más emocionantes es la nueva tecnología de enfriamiento líquido que mantendrá la consola fresca sin ruido de ventiladores. Valve también está desarrollando un dock mejorado que permitirá conectar múltiples monitores 4K y periféricos gaming de escritorio. El lanzamiento está previsto para el segundo trimestre de 2026.",
    fecha: "2025-09-12",
    imagen: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=200&fit=crop",
    autor: "GameZone Editorial",
    categoria: "Hardware",
    tiempoLectura: "4 min",
    tags: ["Steam Deck", "Valve", "Portátil", "PC Gaming"],
    fuente: "Valve Official",
    imagenDetalle: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=400&fit=crop"
  }
];

// Cargar noticias
function cargarNoticias() {
  setTimeout(() => {
    const contenedor = document.getElementById('contenedorNoticias');
    contenedor.innerHTML = '';
    
    noticiasData.forEach(noticia => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';
      col.innerHTML = `
        <div class="card news-card h-100">
          <img src="${noticia.imagen}" class="card-img-top" alt="${noticia.titulo}" 
               style="cursor: pointer;" onclick="mostrarDetalleNoticia(${noticia.id})">
          <div class="card-body d-flex flex-column">
            <div class="mb-2">
              <span class="badge bg-secondary">${noticia.categoria}</span>
              <span class="badge bg-info ms-1">${noticia.tiempoLectura}</span>
            </div>
            <h5 class="card-title">${noticia.titulo}</h5>
            <p class="card-text flex-grow-1">${noticia.contenido}</p>
            <div class="mt-auto"style="color:white ;>
              <small class="text-muted">
                "… ${new Date(noticia.fecha).toLocaleDateString('es-ES')} • 
                Por ${noticia.autor}
              </small>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(col);
    });
  }, 1000);
}

// Función para mostrar detalles de la noticia
function mostrarDetalleNoticia(noticiaId) {
  const noticia = noticiasData.find(n => n.id === noticiaId);
  if (!noticia) return;

  const modalContent = `
    <div class="modal fade" id="detalleNoticiaModal" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <div>
              <h5 class="modal-title">${noticia.titulo}</h5>
              <div class="mt-1">
                <span class="badge bg-light text-dark">${noticia.categoria}</span>
                <span class="badge bg-light text-dark ms-1">${noticia.tiempoLectura}</span>
              </div>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <img src="${noticia.imagenDetalle}" alt="${noticia.titulo}" 
                     class="img-fluid rounded mb-4" style="width: 100%; height: 300px; object-fit: cover;">
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-8">
                <div class="article-content">
                  <div class="mb-3"style="color:white ;>
                    <small class="text-muted" >
                      <strong >Publicado:</strong> ${new Date(noticia.fecha).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} • 
                      <strong>Por:</strong> ${noticia.autor} • 
                      <strong>Fuente:</strong> ${noticia.fuente}
                    </small>
                  </div>
                  
                  <div class="article-text" style="line-height: 1.6; font-size: 1.1rem;">
                    ${noticia.contenidoCompleto.split('\n').map(paragraph => 
                      paragraph.trim() ? `<p>${paragraph.trim()}</p>` : ''
                    ).join('')}
                  </div>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="sidebar">
                  <div class="card bg-light">
                    <div class="card-body">
                      <h6 class="card-title">Etiquetas</h6>
                      <div class="mb-3">
                        ${noticia.tags.map(tag => `<span class="badge bg-primary me-1 mb-1">${tag}</span>`).join('')}
                      </div>
                      
                      <h6 class="card-title">Información del artículo</h6>
                      <ul class="list-unstyled" >
                        <li><strong>Autor:</strong> ${noticia.autor}</li>
                        <li><strong>Tiempo de lectura:</strong> ${noticia.tiempoLectura}</li>
                        <li><strong>Categoría:</strong> ${noticia.categoria}</li>
                        <li><strong>Fuente:</strong> ${noticia.fuente}</li>
                      </ul>
                      
                      <div class="mt-3">
                        <h6>Compartir</h6>
                        <div class="d-flex gap-2">
                          <button class="btn btn-outline-primary btn-sm" onclick="compartirNoticia('twitter', ${noticia.id})">
                            Twitter
                          </button>
                          <button class="btn btn-outline-primary btn-sm" onclick="compartirNoticia('facebook', ${noticia.id})">
                            Facebook
                          </button>
                          <button class="btn btn-outline-secondary btn-sm" onclick="copiarEnlace(${noticia.id})">
                            Copiar enlace
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" onclick="mostrarNoticiasRelacionadas(${noticia.id})">
              Ver más noticias
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Eliminar modal anterior si existe
  const existingModal = document.getElementById('detalleNoticiaModal');
  if (existingModal) {
    existingModal.remove();
  }

  // Agregar el nuevo modal al DOM
  document.body.insertAdjacentHTML('beforeend', modalContent);
  
  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById('detalleNoticiaModal'));
  modal.show();

  // Limpiar el modal cuando se cierre
  document.getElementById('detalleNoticiaModal').addEventListener('hidden.bs.modal', function() {
    this.remove();
  });
}

// Funciones adicionales para el modal de noticias
function compartirNoticia(plataforma, noticiaId) {
  const noticia = noticiasData.find(n => n.id === noticiaId);
  const url = `${window.location.origin}#noticia-${noticiaId}`;
  const texto = `${noticia.titulo} - ${noticia.contenido}`;
  
  let shareUrl = '';
  
  switch(plataforma) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}

function copiarEnlace(noticiaId) {
  const url = `${window.location.origin}#noticia-${noticiaId}`;
  navigator.clipboard.writeText(url).then(() => {
    mostrarNotificacion('Enlace copiado al portapapeles', 'info');
  });
}

function mostrarNoticiasRelacionadas(noticiaId) {
  const noticia = noticiasData.find(n => n.id === noticiaId);
  const relacionadas = noticiasData.filter(n => 
    n.id !== noticiaId && 
    (n.categoria === noticia.categoria || n.tags.some(tag => noticia.tags.includes(tag)))
  );
  
  if (relacionadas.length > 0) {
    // Cerrar modal actual
    bootstrap.Modal.getInstance(document.getElementById('detalleNoticiaModal')).hide();
    
    // Mostrar la primera noticia relacionada
    setTimeout(() => {
      mostrarDetalleNoticia(relacionadas[0].id);
    }, 300);
  } else {
    mostrarNotificacion('No hay noticias relacionadas disponibles', 'info');
  }
}