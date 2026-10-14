import { useState } from "react";


function Contacto() {

  const [nombre, setNombre] =
    useState("");

  const [correo, setCorreo] =
    useState("");

  const [comentario, setComentario] =
    useState("");

  const [errores, setErrores] =
    useState({});

  const [mensajeExito, setMensajeExito] =
    useState(false);


  function validarNombre(valor) {

    if (valor.trim() === "") {
      return "El nombre es obligatorio.";
    }

    if (valor.length > 100) {
      return "El nombre no puede superar los 100 caracteres.";
    }

    return "";

  }


  function validarCorreo(valor) {

    const correoLimpio =
      valor.trim().toLowerCase();

    const regexCorreo =
      /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;


    if (correoLimpio === "") {
      return "El correo es obligatorio.";
    }

    if (valor.length > 100) {
      return "El correo no puede superar los 100 caracteres.";
    }

    if (!regexCorreo.test(correoLimpio)) {
      return "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }

    return "";

  }


  function validarComentario(valor) {

    if (valor.trim() === "") {
      return "El comentario es obligatorio.";
    }

    if (valor.length > 500) {
      return "El comentario no puede superar los 500 caracteres.";
    }

    return "";

  }


  function manejarNombre(evento) {

    const valor =
      evento.target.value;

    setNombre(valor);

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      nombre: validarNombre(valor)
    }));

    setMensajeExito(false);

  }


  function manejarCorreo(evento) {

    const valor =
      evento.target.value;

    setCorreo(valor);

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      correo: validarCorreo(valor)
    }));

    setMensajeExito(false);

  }


  function manejarComentario(evento) {

    const valor =
      evento.target.value;

    setComentario(valor);

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      comentario:
        validarComentario(valor)
    }));

    setMensajeExito(false);

  }


  function manejarSubmit(evento) {

    evento.preventDefault();


    const nuevosErrores = {

      nombre:
        validarNombre(nombre),

      correo:
        validarCorreo(correo),

      comentario:
        validarComentario(comentario)

    };


    setErrores(nuevosErrores);


    const formularioValido =
      !nuevosErrores.nombre &&
      !nuevosErrores.correo &&
      !nuevosErrores.comentario;


    if (!formularioValido) {
      return;
    }


    setMensajeExito(true);


    setNombre("");
    setCorreo("");
    setComentario("");
    setErrores({});


    setTimeout(() => {

      setMensajeExito(false);

    }, 4000);

  }


  return (

    <main>

      {/* ENCABEZADO */}

      <section className="encabezado-pagina text-white text-center py-5">

        <div className="container">

          <h1>
            Contacto
          </h1>

          <p>
            ¿Tienes alguna duda?
            Escríbenos y te responderemos.
          </p>

        </div>

      </section>


      {/* FORMULARIO */}

      <section className="contacto py-5">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-lg-8">

              <div className="card p-4">

                <h2 className="text-center mb-4">
                  Contáctanos
                </h2>


                <form
                  onSubmit={manejarSubmit}
                  noValidate
                >


                  {/* NOMBRE */}

                  <div className="mb-3">

                    <label
                      htmlFor="nombre"
                      className="form-label"
                    >
                      Nombre
                    </label>


                    <input
                      type="text"
                      id="nombre"
                      className={
                        `form-control ${
                          errores.nombre
                            ? "campo-error"
                            : nombre
                              ? "campo-correcto"
                              : ""
                        }`
                      }
                      maxLength="100"
                      value={nombre}
                      onChange={
                        manejarNombre
                      }
                    />


                    <small className="mensaje-error">

                      {errores.nombre}

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
                      className={
                        `form-control ${
                          errores.correo
                            ? "campo-error"
                            : correo
                              ? "campo-correcto"
                              : ""
                        }`
                      }
                      placeholder="ejemplo@gmail.com"
                      maxLength="100"
                      value={correo}
                      onChange={
                        manejarCorreo
                      }
                    />


                    <small className="mensaje-error">

                      {errores.correo}

                    </small>

                  </div>


                  {/* COMENTARIO */}

                  <div className="mb-3">

                    <label
                      htmlFor="comentario"
                      className="form-label"
                    >
                      Comentario
                    </label>


                    <textarea
                      id="comentario"
                      className={
                        `form-control ${
                          errores.comentario
                            ? "campo-error"
                            : comentario
                              ? "campo-correcto"
                              : ""
                        }`
                      }
                      maxLength="500"
                      value={comentario}
                      onChange={
                        manejarComentario
                      }
                    >
                    </textarea>


                    <div className="d-flex justify-content-between">

                      <small className="mensaje-error">

                        {errores.comentario}

                      </small>


                      <small className="text-secondary">

                        {comentario.length}
                        {" / 500 caracteres"}

                      </small>

                    </div>

                  </div>


                  {/* MENSAJE DE ÉXITO */}

                  {mensajeExito && (

                    <div className="alert alert-success">

                      Mensaje enviado correctamente.

                    </div>

                  )}


                  {/* BOTÓN */}

                  <div className="d-grid">

                    <button
                      type="submit"
                      className="btn btn-warning btn-lg"
                    >
                      Enviar mensaje
                    </button>

                  </div>


                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}


export default Contacto;