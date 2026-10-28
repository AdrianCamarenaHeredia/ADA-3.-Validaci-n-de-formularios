// ==========================================
// 1. MOSTRAR LA FECHA ACTUAL
// ==========================================
const fechaElemento = document.getElementById("fecha-actual");
const hoy = new Date();
const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// Muestra algo como: "lunes, 1 de enero de 2024"
fechaElemento.textContent = hoy.toLocaleDateString('es-ES', opcionesFecha);

// ==========================================
// 2. VALIDACIÓN DEL FORMULARIO
// ==========================================
const formulario = document.getElementById("miFormulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue
    let formularioValido = true;

    // Limpiar estilos de error previos
    const inputs = formulario.querySelectorAll('.form-control, .form-check-input');
    inputs.forEach(input => input.classList.remove('is-invalid'));

    // --- Validar Nombre ---
    const nombre = document.getElementById("nombre");
    if (nombre.value.trim() === "") {
        nombre.classList.add('is-invalid');
        document.getElementById("error-nombre").textContent = "El nombre es obligatorio.";
        formularioValido = false;
    }

    // --- Validar Email ---
    const email = document.getElementById("email");
    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('is-invalid');
        document.getElementById("error-email").textContent = "Ingresa un correo electrónico válido.";
        formularioValido = false;
    }

    // --- Validar Edad (Número mayor a 18) ---
    const edad = document.getElementById("edad");
    if (edad.value === "" || parseInt(edad.value) < 18) {
        edad.classList.add('is-invalid');
        document.getElementById("error-edad").textContent = "Debes ser mayor de 18 años.";
        formularioValido = false;
    }

    // --- Validar Checkbox Términos ---
    const terminos = document.getElementById("terminos");
    if (!terminos.checked) {
        terminos.classList.add('is-invalid');
        document.getElementById("error-terminos").textContent = "Debes aceptar los términos.";
        formularioValido = false;
    }

    // --- Resultado Final ---
    if (formularioValido) {
        // Usamos SweetAlert2 para un mensaje de éxito profesional
        Swal.fire({
            title: '¡Excelente!',
            text: 'Formulario enviado correctamente (Simulación).',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        formulario.reset(); // Limpia el formulario
    } else {
        // Mensaje general si hay errores
        Swal.fire({
            title: 'Error de validación',
            text: 'Por favor, revisa los campos marcados en rojo.',
            icon: 'error',
            confirmButtonText: 'Corregir'
        });
    }
});


// ==========================================
// 3. LÓGICA DE LA CALCULADORA
// ==========================================
const pantalla = document.getElementById("pantalla");
let expresion = "";

// Agregar números u operadores
function agregar(valor) {
    // Si la pantalla está en 0 y no es un operador, reemplazar el 0
    if (pantalla.value === "0" && valor !== "." && !isNaN(valor)) {
        pantalla.value = valor;
    } else {
        pantalla.value += valor;
    }
    expresion = pantalla.value;
}

// Limpiar todo
function limpiar() {
    pantalla.value = "0";
    expresion = "";
}

// Borrar un carácter
function borrar() {
    if (pantalla.value.length === 1 || pantalla.value === "Error") {
        pantalla.value = "0";
    } else {
        pantalla.value = pantalla.value.slice(0, -1);
    }
    expresion = pantalla.value;
}

// Calcular el resultado
function calcular() {
    try {
        // Usamos eval() para procesar la cadena matemática.
        // Nota: En producción real, no se debe usar eval() con datos de usuario por seguridad, 
        // pero para este proyecto frontend académico es lo más práctico.
        let resultado = eval(pantalla.value);
        
        // Manejar división por cero o resultados inválidos
        if (!isFinite(resultado)) {
            pantalla.value = "Error";
        } else {
            pantalla.value = resultado;
        }
        expresion = pantalla.value;
    } catch (error) {
        pantalla.value = "Error";
    }
}