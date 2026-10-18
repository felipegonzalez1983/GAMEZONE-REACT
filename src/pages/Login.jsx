
import { useState } from "react";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  useUsuario
} from "../context/UsuarioContext";

function Login() {

  const navigate = useNavigate();

  const { iniciarSesion } = useUsuario();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errores, setErrores] = useState({});

  function manejarSubmit(evento) {

    evento.preventDefault();

    const nuevosErrores = {};

    const correoLimpio =
      correo.trim().toLowerCase();

    // VALIDAR CORREO
    const formatoCorreo =
      /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (!formatoCorreo.test(correoLimpio)) {
      nuevosErrores.correo =
        "Ingresa un correo Duoc o Gmail.";
    }

    // VALIDAR CONTRASEÑA
    if (
      contrasena.length < 4 ||
      contrasena.length > 10
    ) {
      nuevosErrores.contrasena =
        "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    // COMPROBAR ERRORES
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    // ACCESO DEL ADMINISTRADOR
    if (
      correoLimpio === "admin@gmail.com" &&
      contrasena === "1234"
    ) {

      iniciarSesion({
        correo: correoLimpio,
        nombre: "Administrador",
        rol: "Administrador"
      });

      setErrores({});

      alert("Bienvenido, administrador.");

      navigate("/admin");

      return;
    }

    // RECUPERAR USUARIOS REGISTRADOS
    // Mejorado para evitar errores con datos dañados
    let usuariosGuardados = [];

    try {

      const datosGuardados = localStorage.getItem(
        "usuariosGameZone"
      );

      const datos = datosGuardados
        ? JSON.parse(datosGuardados)
        : [];

      usuariosGuardados = Array.isArray(datos)
        ? datos
        : [];

    } catch {

      usuariosGuardados = [];

    }

    // BUSCAR USUARIO REGISTRADO
    const usuarioEncontrado =
      usuariosGuardados.find(
        (usuario) =>
          usuario &&
          typeof usuario.correo === "string" &&
          usuario.correo.toLowerCase() === correoLimpio &&
          usuario.contrasena === contrasena
      );

    // CREDENCIALES INCORRECTAS
    if (!usuarioEncontrado) {

      setErrores({
        general: "Correo o contraseña incorrectos."
      });

      return;
    }

    // INICIAR SESIÓN COMO CLIENTE
    iniciarSesion({
      correo: usuarioEncontrado.correo,
      nombre: usuarioEncontrado.nombre,
      rol: usuarioEncontrado.rol
    });

    setErrores({});

    alert(
      `Bienvenido, ${usuarioEncontrado.nombre}.`
    );

    navigate("/");

  }

  return (

    <main className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <h1 className="text-center mb-4">
            Iniciar sesión
          </h1>

          <form
            onSubmit={manejarSubmit}
            noValidate
          >

            {/* CORREO */}
            <div className="mb-3">

              <label
                htmlFor="correo-login"
                className="form-label"
              >
                Correo electrónico
              </label>

              <input
                type="email"
                id="correo-login"
                className="form-control"
                maxLength="100"
                value={correo}
                onChange={(evento) => {
                  setCorreo(evento.target.value);
                  setErrores({});
                }}
              />

              <small className="text-danger">
                {errores.correo}
              </small>

            </div>

            {/* CONTRASEÑA */}
            <div className="mb-3">

              <label
                htmlFor="contrasena-login"
                className="form-label"
              >
                Contraseña
              </label>

              <input
                type="password"
                id="contrasena-login"
                className="form-control"
                minLength="4"
                maxLength="10"
                value={contrasena}
                onChange={(evento) => {
                  setContrasena(evento.target.value);
                  setErrores({});
                }}
              />

              <small className="text-danger">
                {errores.contrasena}
              </small>

            </div>

            {/* MENSAJE DE ERROR */}
            {errores.general && (

              <div className="alert alert-danger">
                {errores.general}
              </div>

            )}

            {/* BOTÓN INGRESAR */}
            <button
              type="submit"
              className="btn btn-warning w-100"
            >
              Ingresar
            </button>

          </form>

          {/* ENLACE DE REGISTRO */}
          <p className="text-center mt-3">

            ¿No tienes una cuenta?{" "}

            <NavLink to="/registro">
              Regístrate
            </NavLink>

          </p>

        </div>

      </div>

    </main>

  );

}

export default Login;
