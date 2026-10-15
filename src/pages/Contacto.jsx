import {
  useState
} from "react";


function Contacto() {

  const [
    nombre,
    setNombre
  ] = useState("");

  const [
    correo,
    setCorreo
  ] = useState("");

  const [
    comentario,
    setComentario
  ] = useState("");

  const [
    errores,
    setErrores
  ] = useState({});

  const [
    mensajeExito,
    setMensajeExito
  ] = useState(false);


  function validarNombre(
    valor
  ) {

    if (
      valor.trim() === ""
    ) {

      return "El nombre es obligatorio.";

    }


    if (
      valor.length > 100
    ) {

      return "El nombre no puede superar los 100 caracteres.";

    }


    return "";

  }


  function validarCorreo(
    valor
  ) {

    const correoLimpio =
      valor
        .trim()
        .toLowerCase();


    const regexCorreo =
      /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;


    if (
      correoLimpio === ""
    ) {

      return "El correo es obligatorio.";

    }


    if (
      valor.length > 100
    ) {

      return "El correo no puede superar los 100 caracteres.";

    }


    if (
      !regexCorreo.test(
        correoLimpio
      )
    ) {

      return "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";

    }


    return "";

  }


  function validarComentario(
    valor
  ) {

    if (
      valor.trim() === ""
    ) {

      return "El comentario es obligatorio.";

    }


    if (
      valor.length > 500
    ) {

      return "El comentario no puede superar los 500 caracteres.";

    }


    return "";

  }


  function manejarNombre(
    evento
  ) {

    const valor =
      evento.target.value;


    setNombre(valor);


    setErrores(
      (actuales) => ({
        ...actuales,
        nombre:
          validarNombre(valor)
      })
    );


    setMensajeExito(false);

  }


  function manejarCorreo(
    evento
  ) {

    const valor =
      evento.target.value;


    setCorreo(valor);


    setErrores(
      (actuales) => ({
        ...actuales,
        correo:
          validarCorreo(valor)
      })
    );


    setMensajeExito(false);

  }


  function manejarComentario(
    evento
  ) {

    const valor =
      evento.target.value;


    setComentario(valor);


    setErrores(
      (actuales) => ({
        ...actuales,
        comentario:
          validarComentario(
            valor
          )
      })
    );


    setMensajeExito(false);

  }


  function manejarSubmit(
    evento
  ) {

    evento.preventDefault();


    const nuevosErrores = {

      nombre:
        validarNombre(
          nombre
        ),

      correo:
        validarCorreo(
          correo
        ),

      comentario:
        validarComentario(
          comentario
        )

    };


    setErrores(
      nuevosErrores
    );


    const formularioValido =
      !nuevosErrores.nombre &&
      !nuevosErrores.correo &&
      !nuevosErrores.comentario;


    if (
      !formularioValido
    ) {

      return;

    }


    setMensajeExito(
      true
    );


    setNombre("");
    setCorreo("");
    setComentario("");
    setErrores({});


    setTimeout(
      () => {

        setMensajeExito(
          false
        );

      },
      4000
    );

  }


  return (

    <main>

      <section className="container py-5">


        {/* ENCABEZADO */}

        <div className="text-center mb-5">

          <h1>
            Contacto
          </h1>

          <p className="text-secondary">

            ¿Tienes alguna consulta?
            Envíanos un mensaje.

          </p>

        </div>


        {/* FORMULARIO */}

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card p-4 shadow-sm">


              <form
                onSubmit={
                  manejarSubmit
                }
                noValidate
              >


                {/* NOMBRE */}

                <div className="mb-4">

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
                    value={
                      nombre
                    }
                    onChange={
                      manejarNombre
                    }
                  />


                  <div className="mensaje-error">

                    {errores.nombre}

                  </div>

                </div>


                {/* CORREO */}

                <div className="mb-4">

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
                    maxLength="100"
                    value={
                      correo
                    }
                    onChange={
                      manejarCorreo
                    }
                  />


                  <div className="mensaje-error">

                    {errores.correo}

                  </div>

                </div>


                {/* COMENTARIO */}

                <div className="mb-4">

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
                    rows="6"
                    maxLength="500"
                    value={
                      comentario
                    }
                    onChange={
                      manejarComentario
                    }
                  >
                  </textarea>


                  <div className="text-secondary small mt-1">

                    {
                      comentario.length
                    } / 500 caracteres

                  </div>


                  <div className="mensaje-error">

                    {errores.comentario}

                  </div>

                </div>


                {/* BOTÓN */}

                <div className="text-center">

                  <button
                    type="submit"
                    className="btn btn-warning px-5"
                  >
                    Enviar mensaje
                  </button>

                </div>


                {/* MENSAJE */}

                {mensajeExito && (

                  <div className="alert alert-success mt-4">

                    ¡Mensaje enviado correctamente!

                  </div>

                )}


              </form>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}


export default Contacto;