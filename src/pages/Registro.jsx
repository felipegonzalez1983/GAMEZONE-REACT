import { useState } from "react";
import { NavLink } from "react-router-dom";


const regiones = [
  {
    nombre: "Región Metropolitana",

    comunas: [
      "La Florida",
      "Puente Alto",
      "Macul",
      "Peñalolén",
      "Ñuñoa",
      "Santiago",
      "Providencia",
      "Maipú",
      "Las Condes",
      "San Miguel"
    ]
  }
];


function Registro() {

  const [datos, setDatos] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    fechaNacimiento: "",
    region: "",
    comuna: "",
    direccion: "",
    contrasena: "",
    repetirContrasena: ""
  });


  const [errores, setErrores] =
    useState({});


  const [
    registroCorrecto,
    setRegistroCorrecto
  ] = useState(false);


  function manejarCambio(evento) {

    const { name, value } =
      evento.target;


    setDatos((datosActuales) => ({
      ...datosActuales,

      [name]: value,

      ...(name === "region"
        ? { comuna: "" }
        : {})
    }));


    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [name]: ""
    }));


    setRegistroCorrecto(false);

  }


  function validarFormulario() {

    const nuevosErrores = {};


    /* VALIDAR RUN */

    const formatoRun =
      /^[0-9]{6,8}[0-9Kk]$/;


    if (
      !formatoRun.test(
        datos.run.trim()
      )
    ) {

      nuevosErrores.run =
        "Escribe el RUN sin puntos ni guion.";

    }


    /* VALIDAR NOMBRE */

    if (
      datos.nombre.trim() === ""
    ) {

      nuevosErrores.nombre =
        "El nombre es obligatorio.";

    }


    /* VALIDAR APELLIDOS */

    if (
      datos.apellidos.trim() === ""
    ) {

      nuevosErrores.apellidos =
        "Los apellidos son obligatorios.";

    }


    /* VALIDAR CORREO */

    const formatoCorreo =
      /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;


    if (
      !formatoCorreo.test(
        datos.correo.trim()
      )
    ) {

      nuevosErrores.correo =
        "Utiliza un correo Duoc o Gmail.";

    }


    /* VALIDAR REGIÓN */

    if (
      datos.region === ""
    ) {

      nuevosErrores.region =
        "Selecciona una región.";

    }


    /* VALIDAR COMUNA */

    if (
      datos.comuna === ""
    ) {

      nuevosErrores.comuna =
        "Selecciona una comuna.";

    }


    /* VALIDAR DIRECCIÓN */

    if (
      datos.direccion.trim() === ""
    ) {

      nuevosErrores.direccion =
        "La dirección es obligatoria.";

    }


    /* VALIDAR CONTRASEÑA */

    if (
      datos.contrasena.length < 4 ||
      datos.contrasena.length > 10
    ) {

      nuevosErrores.contrasena =
        "Debe tener entre 4 y 10 caracteres.";

    }


    /* COMPARAR CONTRASEÑAS */

    if (
      datos.repetirContrasena !==
      datos.contrasena
    ) {

      nuevosErrores.repetirContrasena =
        "Las contraseñas no coinciden.";

    }


    return nuevosErrores;

  }


  function manejarSubmit(evento) {

    evento.preventDefault();


    const nuevosErrores =
      validarFormulario();


    if (
      Object.keys(nuevosErrores)
        .length > 0
    ) {

      setErrores(
        nuevosErrores
      );

      setRegistroCorrecto(
        false
      );

      return;

    }


    /*
      RECUPERAR USUARIOS
      YA REGISTRADOS
    */

    const usuariosGuardados =
      JSON.parse(
        localStorage.getItem(
          "usuariosGameZone"
        )
      ) || [];


    /*
      REVISAR SI EL CORREO
      YA EXISTE
    */

    const correoLimpio =
      datos.correo
        .trim()
        .toLowerCase();


    const correoYaRegistrado =
      usuariosGuardados.some(
        (usuario) =>
          usuario.correo.toLowerCase() ===
          correoLimpio
      );


    if (correoYaRegistrado) {

      setErrores({
        correo:
          "Este correo ya está registrado."
      });


      setRegistroCorrecto(
        false
      );


      return;

    }


    /*
      CREAR USUARIO
    */

    const nuevoUsuario = {

      run:
        datos.run.trim(),

      nombre:
        datos.nombre.trim(),

      apellidos:
        datos.apellidos.trim(),

      correo:
        correoLimpio,

      fechaNacimiento:
        datos.fechaNacimiento,

      region:
        regiones[
          Number(datos.region)
        ].nombre,

      comuna:
        datos.comuna,

      direccion:
        datos.direccion.trim(),

      contrasena:
        datos.contrasena,

      rol:
        "Cliente"

    };


    /*
      AGREGAR USUARIO
      AL ARREGLO
    */

    const nuevosUsuarios = [
      ...usuariosGuardados,
      nuevoUsuario
    ];


    /*
      GUARDAR EN
      LOCALSTORAGE
    */

    localStorage.setItem(
      "usuariosGameZone",
      JSON.stringify(
        nuevosUsuarios
      )
    );


    /*
      LIMPIAR ERRORES
      Y MOSTRAR MENSAJE
    */

    setErrores({});


    setRegistroCorrecto(
      true
    );


    /*
      LIMPIAR FORMULARIO
    */

    setDatos({
      run: "",
      nombre: "",
      apellidos: "",
      correo: "",
      fechaNacimiento: "",
      region: "",
      comuna: "",
      direccion: "",
      contrasena: "",
      repetirContrasena: ""
    });

  }


  /*
    COMUNAS DISPONIBLES
  */

  const comunasDisponibles =
    datos.region !== ""

      ? regiones[
          Number(datos.region)
        ].comunas

      : [];


  return (

    <main>


      {/* ENCABEZADO */}

      <section
        className="
          encabezado-pagina
          text-white
          text-center
          py-5
        "
      >

        <div className="container">

          <h1>
            Registro de usuario
          </h1>

          <p>
            Completa tus datos
            para crear una cuenta.
          </p>

        </div>

      </section>


      {/* FORMULARIO */}

      <section className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">


            <form
              onSubmit={
                manejarSubmit
              }
              noValidate
            >


              {/* RUN Y NOMBRE */}

              <div className="row">


                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="run"
                    className="form-label"
                  >
                    RUN
                  </label>


                  <input
                    type="text"
                    id="run"
                    name="run"
                    className="form-control"
                    placeholder="Ejemplo: 19011022K"
                    maxLength="9"
                    value={
                      datos.run
                    }
                    onChange={
                      manejarCambio
                    }
                  />


                  <small className="text-danger">

                    {errores.run}

                  </small>

                </div>


                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="nombre"
                    className="form-label"
                  >
                    Nombre
                  </label>


                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    maxLength="50"
                    value={
                      datos.nombre
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


              {/* APELLIDOS */}

              <div className="mb-3">

                <label
                  htmlFor="apellidos"
                  className="form-label"
                >
                  Apellidos
                </label>


                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  className="form-control"
                  maxLength="100"
                  value={
                    datos.apellidos
                  }
                  onChange={
                    manejarCambio
                  }
                />


                <small className="text-danger">

                  {errores.apellidos}

                </small>

              </div>


              {/* CORREO */}

              <div className="mb-3">

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
                  placeholder="ejemplo@gmail.com"
                  maxLength="100"
                  value={
                    datos.correo
                  }
                  onChange={
                    manejarCambio
                  }
                />


                <small className="text-danger">

                  {errores.correo}

                </small>

              </div>


              {/* FECHA DE NACIMIENTO */}

              <div className="mb-3">

                <label
                  htmlFor="fechaNacimiento"
                  className="form-label"
                >
                  Fecha de nacimiento
                </label>


                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  className="form-control"
                  value={
                    datos.fechaNacimiento
                  }
                  onChange={
                    manejarCambio
                  }
                />

              </div>


              {/* REGIÓN Y COMUNA */}

              <div className="row">


                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="region"
                    className="form-label"
                  >
                    Región
                  </label>


                  <select
                    id="region"
                    name="region"
                    className="form-select"
                    value={
                      datos.region
                    }
                    onChange={
                      manejarCambio
                    }
                  >

                    <option value="">
                      Seleccione una región
                    </option>


                    {regiones.map(
                      (
                        region,
                        indice
                      ) => (

                        <option
                          key={
                            indice
                          }
                          value={
                            indice
                          }
                        >
                          {
                            region.nombre
                          }
                        </option>

                      )
                    )}

                  </select>


                  <small className="text-danger">

                    {errores.region}

                  </small>

                </div>


                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="comuna"
                    className="form-label"
                  >
                    Comuna
                  </label>


                  <select
                    id="comuna"
                    name="comuna"
                    className="form-select"
                    value={
                      datos.comuna
                    }
                    onChange={
                      manejarCambio
                    }
                    disabled={
                      datos.region === ""
                    }
                  >

                    <option value="">
                      Seleccione una comuna
                    </option>


                    {comunasDisponibles.map(
                      (comuna) => (

                        <option
                          key={
                            comuna
                          }
                          value={
                            comuna
                          }
                        >
                          {comuna}
                        </option>

                      )
                    )}

                  </select>


                  <small className="text-danger">

                    {errores.comuna}

                  </small>

                </div>


              </div>


              {/* DIRECCIÓN */}

              <div className="mb-3">

                <label
                  htmlFor="direccion"
                  className="form-label"
                >
                  Dirección
                </label>


                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  maxLength="300"
                  value={
                    datos.direccion
                  }
                  onChange={
                    manejarCambio
                  }
                />


                <small className="text-danger">

                  {errores.direccion}

                </small>

              </div>


              {/* CONTRASEÑAS */}

              <div className="row">


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
                      datos.contrasena
                    }
                    onChange={
                      manejarCambio
                    }
                  />


                  <small className="text-danger">

                    {
                      errores.contrasena
                    }

                  </small>

                </div>


                <div className="col-md-6 mb-3">

                  <label
                    htmlFor="repetirContrasena"
                    className="form-label"
                  >
                    Repetir contraseña
                  </label>


                  <input
                    type="password"
                    id="repetirContrasena"
                    name="repetirContrasena"
                    className="form-control"
                    minLength="4"
                    maxLength="10"
                    value={
                      datos.repetirContrasena
                    }
                    onChange={
                      manejarCambio
                    }
                  />


                  <small className="text-danger">

                    {
                      errores
                        .repetirContrasena
                    }

                  </small>

                </div>


              </div>


              {/* REGISTRO CORRECTO */}

              {registroCorrecto && (

                <div className="alert alert-success">

                  Usuario registrado correctamente.

                </div>

              )}


              {/* BOTÓN */}

              <div className="d-grid">

                <button
                  type="submit"
                  className="
                    btn
                    btn-warning
                    btn-lg
                  "
                >

                  Registrarme

                </button>

              </div>


              {/* LOGIN */}

              <p className="text-center mt-4">

                ¿Ya tienes una cuenta?{" "}

                <NavLink to="/login">

                  Iniciar sesión

                </NavLink>

              </p>


            </form>

          </div>

        </div>

      </section>

    </main>

  );

}


export default Registro;