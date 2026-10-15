import {
  useState
} from "react";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  useUsuario
} from "../context/UsuarioContext";


function AdminNuevoUsuario() {

  const navigate =
    useNavigate();


  const {
    usuario
  } = useUsuario();


  const [
    formulario,
    setFormulario
  ] = useState({
    rut: "",
    nombre: "",
    correo: "",
    contrasena: "",
    rol: ""
  });


  const [
    errores,
    setErrores
  ] = useState({});


  function manejarCambio(
    evento
  ) {

    const {
      name,
      value
    } = evento.target;


    setFormulario(
      (actual) => ({
        ...actual,
        [name]: value
      })
    );


    setErrores(
      (actual) => ({
        ...actual,
        [name]: ""
      })
    );

  }


  function manejarSubmit(
    evento
  ) {

    evento.preventDefault();


    const nuevosErrores = {};


    if (
      formulario.rut.trim() === ""
    ) {

      nuevosErrores.rut =
        "El RUT es obligatorio.";

    }


    if (
      formulario.nombre.trim() === ""
    ) {

      nuevosErrores.nombre =
        "El nombre es obligatorio.";

    }


    if (
      !formulario.correo.includes("@")
    ) {

      nuevosErrores.correo =
        "Ingresa un correo válido.";

    }


    if (
      formulario.contrasena.length < 4 ||
      formulario.contrasena.length > 10
    ) {

      nuevosErrores.contrasena =
        "La contraseña debe tener entre 4 y 10 caracteres.";

    }


    if (
      formulario.rol === ""
    ) {

      nuevosErrores.rol =
        "Selecciona un rol.";

    }


    if (
      Object.keys(
        nuevosErrores
      ).length > 0
    ) {

      setErrores(
        nuevosErrores
      );

      return;

    }


    let usuarios = [];


    try {

      usuarios =
        JSON.parse(
          localStorage.getItem(
            "usuariosGameZone"
          )
        ) || [];

    } catch {

      usuarios = [];

    }


    const nuevoUsuario = {

      rut:
        formulario.rut.trim(),

      nombre:
        formulario.nombre.trim(),

      correo:
        formulario.correo
          .trim()
          .toLowerCase(),

      contrasena:
        formulario.contrasena,

      rol:
        formulario.rol

    };


    usuarios.push(
      nuevoUsuario
    );


    localStorage.setItem(
      "usuariosGameZone",
      JSON.stringify(
        usuarios
      )
    );


    alert(
      "Usuario guardado correctamente."
    );


    navigate(
      "/admin/usuarios"
    );

  }


  if (
    !usuario ||
    usuario.rol !==
      "Administrador"
  ) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Acceso denegado
        </h1>

        <p>
          Esta sección es solo para administradores.
        </p>

        <NavLink
          to="/"
          className="btn btn-dark"
        >
          Volver al inicio
        </NavLink>

      </main>

    );

  }


  return (

    <main className="container py-5">

      <h1>
        Nuevo usuario
      </h1>

      <p>
        Completa los datos para registrar un usuario.
      </p>


      <form
        className="mt-4"
        onSubmit={
          manejarSubmit
        }
        noValidate
      >

        <div className="row">


          {/* RUT */}

          <div className="col-md-6 mb-3">

            <label
              htmlFor="rut"
              className="form-label"
            >
              RUT
            </label>

            <input
              type="text"
              id="rut"
              name="rut"
              className="form-control"
              placeholder="12.345.678-9"
              value={
                formulario.rut
              }
              onChange={
                manejarCambio
              }
            />

            <small className="text-danger">
              {errores.rut}
            </small>

          </div>


          {/* NOMBRE */}

          <div className="col-md-6 mb-3">

            <label
              htmlFor="nombre"
              className="form-label"
            >
              Nombre completo
            </label>

            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              maxLength="100"
              value={
                formulario.nombre
              }
              onChange={
                manejarCambio
              }
            />

            <small className="text-danger">
              {errores.nombre}
            </small>

          </div>

        </div>


        <div className="row">


          {/* CORREO */}

          <div className="col-md-6 mb-3">

            <label
              htmlFor="correo"
              className="form-label"
            >
              Correo electrónico
            </label>

            <input
              type="email"
              id="correo"
              name="correo"
              className="form-control"
              value={
                formulario.correo
              }
              onChange={
                manejarCambio
              }
            />

            <small className="text-danger">
              {errores.correo}
            </small>

          </div>


          {/* CONTRASEÑA */}

          <div className="col-md-6 mb-3">

            <label
              htmlFor="contrasena"
              className="form-label"
            >
              Contraseña
            </label>

            <input
              type="password"
              id="contrasena"
              name="contrasena"
              className="form-control"
              minLength="4"
              maxLength="10"
              value={
                formulario.contrasena
              }
              onChange={
                manejarCambio
              }
            />

            <small className="text-danger">
              {errores.contrasena}
            </small>

          </div>

        </div>


        {/* ROL */}

        <div className="mb-3">

          <label
            htmlFor="rol"
            className="form-label"
          >
            Rol
          </label>

          <select
            id="rol"
            name="rol"
            className="form-select"
            value={
              formulario.rol
            }
            onChange={
              manejarCambio
            }
          >

            <option value="">
              Seleccione un rol
            </option>

            <option value="Cliente">
              Cliente
            </option>

            <option value="Administrador">
              Administrador
            </option>

          </select>

          <small className="text-danger">
            {errores.rol}
          </small>

        </div>


        <button
          type="submit"
          className="btn btn-warning me-2"
        >
          Guardar usuario
        </button>


        <NavLink
          to="/admin/usuarios"
          className="btn btn-secondary"
        >
          Cancelar
        </NavLink>

      </form>

    </main>

  );

}


export default AdminNuevoUsuario;