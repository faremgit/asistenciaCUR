// Función para obtener la IP pública usando ipify
function obtenerIP() {
    return fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => data.ip)
      .catch(error => {
        console.error('Error al obtener la IP:', error);
        return null;
      });
  }
  
  // Función para validar si la IP pertenece a la red institucional
  function validarIP(ip) {
    // Ejemplo: se permite cualquier IP que comience con "192.168.1."
    const ipPermitida = "45.170.226.";
    return ip.startsWith(ipPermitida);
  }
  
  // Función para generar un código único basado en la fecha y un identificador aleatorio
  function generarCodigoUnico() {
    const fecha = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `${fecha}-${random}`;
  }
  
  // Función para generar el código QR usando QRCode.js
  function generarQR(codigo) {
    const qrContainer = document.getElementById('qr-container');
    qrContainer.innerHTML = ""; // Limpiar contenedor
    new QRCode(qrContainer, {
      text: codigo,
      width: 256,
      height: 256,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
  }
  
  // Inicialización de la aplicación
  document.addEventListener("DOMContentLoaded", async () => {
    const resultadoDiv = document.getElementById('resultado');
    const ip = await obtenerIP();
    
    if (!ip) {
      resultadoDiv.textContent = "No se pudo determinar la IP.";
      return;
    }
    
    resultadoDiv.textContent = `Tu IP pública es: ${ip}. `;
    
    if (validarIP(ip)) {
      resultadoDiv.textContent += "Conexión validada: pertenece a la red institucional.";
      // Genera el código único y el QR
      const codigoUnico = generarCodigoUnico();
      generarQR(codigoUnico);
      console.log("Código generado:", codigoUnico);
      // Aquí se puede realizar el envío del código al servidor para registrar la sesión
    } else {
      resultadoDiv.textContent += " Acceso denegado: la IP no pertenece a la red institucional.";
    }
  });
  