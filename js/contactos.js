    // Formulario de contacto
    function procesarContacto(e) {
      e.preventDefault();
      const btnText = document.getElementById('btnContactText');
      const btnSpinner = document.getElementById('btnContactSpinner');
      
      btnText.textContent = 'Enviando...';
      btnSpinner.classList.remove('d-none');
      
      setTimeout(() => {
        mostrarNotificacion('¡Mensaje enviado exitosamente! 📧');
        document.getElementById('formContacto').reset();
        btnText.textContent = 'Enviar Mensaje';
        btnSpinner.classList.add('d-none');
      }, 2000);
    }

 