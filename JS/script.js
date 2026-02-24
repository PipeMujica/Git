//agregar personas en Nómina de funcionarios
let contador = 3; // ya hay 3 campos iniciales

    function agregarCampo() {
      contador++;
      const fieldset = document.getElementById("nomina");
      const boton = document.getElementById("btnAgregar");

      const nuevo = document.createElement("div");
      nuevo.innerHTML = `${contador}.- <input type="text" name="persona[]" placeholder="Nombre y apellido"><br>`;

      // Insertar ANTES del botón
    fieldset.insertBefore(nuevo, boton);
    }


  // Función para mostrar u ocultar el contenido de los fieldset
  function togContenido(legend) {
    const fieldset = legend.parentElement;
    const hijos = Array.from(fieldset.children).filter(el => el.tagName !== "LEGEND");
    hijos.forEach(el => el.classList.toggle("oculto"));
  }


//selecciona un solo checkbox
document.addEventListener('DOMContentLoaded', () => {
  // Buscar todos los grupos de checkboxes con name distinto
  const grupos = ['chk1', 'chk2','chk3','chk4','chk5','chk6','chk7','chk8','chk9','chk10','chk11','chk12','chk13','chk14', 'check1', 'check2', 'check3', 'check4', 'check5', 'check6', 'check7']; // agrega más nombres si tienes otros grupos

  grupos.forEach(grupo => {
    const checkboxes = document.querySelectorAll(`input[name="${grupo}"]`);
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.checked) {
          checkboxes.forEach(other => {
            if (other !== cb) other.checked = false;
          });
        }
      });
    });
  });
});

// Función para inicializar firma en un canvas
  function initFirma(idCanvas) {
    const canvas = document.getElementById(idCanvas);
    const ctx = canvas.getContext("2d");
    let drawing = false;

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    canvas.addEventListener("mousedown", (e) => {
      drawing = true;
      ctx.beginPath();
      const pos = getPos(e);
      ctx.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener("mouseup", () => {
      drawing = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!drawing) return;
      const pos = getPos(e);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    });
  }

  // Función para limpiar una firma
  function limpiarFirma(idCanvas) {
    const canvas = document.getElementById(idCanvas);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(); // reinicia el path
  }

  // Inicializar ambas firmas
  initFirma("canvasFirma1");
  initFirma("canvasFirma2");


  
const formulario = document.getElementById("miFormulario");
const btnPDF = document.getElementById("btnPDF");
const { jsPDF } = window.jspdf;

// Guardar datos en LocalStorage
formulario.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  localStorage.setItem("nombre", nombre);
  localStorage.setItem("email", email);
  localStorage.setItem("mensaje", mensaje);

  alert("✅ Datos guardados en el navegador (LocalStorage)");
});


// Descargar PDF con los datos
btnPDF.addEventListener("click", function() {
  const nombre = localStorage.getItem("nombre") || "";
  const email = localStorage.getItem("email") || "";
  const mensaje = localStorage.getItem("mensaje") || "";

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("📋 Registro de Formulario", 10, 20);
  doc.text(`Nombre: ${nombre}`, 10, 40);
  doc.text(`Email: ${email}`, 10, 50);
  doc.text(`Mensaje: ${mensaje}`, 10, 60);

  doc.save("formulario.pdf");
});