
    // Sistema de autenticación
    function cambiarModoAuth() {
      isLoginMode = !isLoginMode;
      const titulo = document.getElementById('authModalTitle');
      const nombreField = document.getElementById('nombreField');
      const submitBtn = document.getElementById('authSubmit');
      const switchText = document.getElementById('authSwitchText');
      const switchLink = document.getElementById('authSwitchLink');

      if (isLoginMode) {
        titulo.textContent = 'Iniciar Sesión';
        nombreField.style.display = 'none';
        submitBtn.textContent = 'Iniciar Sesión';
        switchText.textContent = '¿No tienes cuenta?';
        switchLink.textContent = 'Regístrate aquí';
      } else {
        titulo.textContent = 'Registro';
        nombreField.style.display = 'block';
        submitBtn.textContent = 'Registrarse';
        switchText.textContent = '¿Ya tienes cuenta?';
        switchLink.textContent = 'Inicia sesión aquí';
      }
    }

    function procesarAuth(e) {
      e.preventDefault();
      const email = document.getElementById('authEmail').value;
      const password = document.getElementById('authPassword').value;
      const nombre = document.getElementById('authNombre').value;

      if (isLoginMode) {
        // Simular login
        usuario = { email, nombre: nombre || email.split('@')[0] };
        mostrarNotificacion(`¡Bienvenido ${usuario.nombre}! 👋`);
      } else {
        // Simular registro
        if (!nombre) {
          mostrarNotificacion('El nombre es requerido', 'danger');
          return;
        }
        usuario = { email, nombre };
        mostrarNotificacion(`¡Cuenta creada exitosamente! Bienvenido ${usuario.nombre}! 🎉`);
      }

      actualizarUIUsuario();
      bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
      document.getElementById('authForm').reset();
    }

    function actualizarUIUsuario() {
      const authLinks = document.getElementById('authLinks');
      const userMenu = document.getElementById('userMenu');
      const welcomeMsg = document.getElementById('welcomeMsg');

      if (usuario) {
        authLinks.classList.add('d-none');
        userMenu.classList.remove('d-none');
        welcomeMsg.textContent = `¡Hola, ${usuario.nombre}!`;
      } else {
        authLinks.classList.remove('d-none');
        userMenu.classList.add('d-none');
      }
    }

    function cerrarSesion() {
      usuario = null;
      actualizarUIUsuario();
      mostrarNotificacion('Sesión cerrada correctamente', 'info');
    }