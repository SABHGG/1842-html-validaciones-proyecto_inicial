export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tiposDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El formato del email no es correcto",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 8 caracteres, máximo 12, debe tener al menos una minúscula, una letra mayúscula, un numero y un carácter especial",
  },
  nacimiento: {
    valueMissing: "El campo Fecha de nacimiento no puede estar vacío",
    customError: "Debes ser mayor de 18 años",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 dígitos",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    parentMismatch: "La dirección debe contener entre 10 a 40 caracteres",
  },
  cuidad: {
    valueMissing: "Este campo no puede estar vacío",
    parentMismatch: "La cuidad debe contener entre 10 a 40 caracteres",
  },
  departamento: {
    valueMissing: "Este campo no puede estar vacío",
    parentMismatch: "El departamento debe contener entre 10 a 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tiposDeErrores.forEach((error) => {
    if (input.validity[error]) {
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes ser mayor de 18 años";
  }
  mayorDeEdad(fechaCliente);
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const hoy = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= hoy;
}
