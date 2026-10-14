import {
  useState
} from "react";

import {
  NavLink
} from "react-router-dom";

import {
  useUsuario
} from "../context/UsuarioContext";


function AdminUsuarios() {

  const {
    usuario
  } = useUsuario();


  const [
    usuarios,
    setUsuarios
  ] = useState(() => {

    try {

      return JSON.parse(
        localStorage.getItem(
          "usuariosGameZone"
        )
      ) || [];

    } catch {

      return [];

    }

  });


  function eliminarUsuario(
    posicion
  ) {

    const confirmar =
      window.confirm(
        "¿Deseas eliminar este usuario?"
      );


    if (!confirmar) {
      return;
    }


    const nuevosUsuarios =
      usuarios.filter(
        (_, indice) =>
          indice !== posicion
      );


    setUsuarios(
      nuevosUsuarios
    );


    localStorage.setItem(
      "usuariosGameZone",
      JSON.stringify(
        nuevosUsuarios
      )
    );

  }


  /* SIN SESIÓN */

  if (!usuario) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Administrar usuarios
        </h1>

        <div className="alert alert-warning mt-4">

          Debes iniciar sesión como administrador.

        </div>

        <NavLink
          to="/login"
          className="btn btn-warning"
        >
          Iniciar sesión
        </NavLink>

      </main>

    );

  }


  /* NO ES ADMINISTRADOR */

  if (
    usuario.rol !==
    "Administrador"
  ) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Acceso denegado
        </h1>

        <div className="alert alert-danger mt-4">

          No tienes permisos para acceder
          a esta sección.

        </div>

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

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <div>

          <h1>
            Administrar usuarios
          </h1>

          <p className="text-secondary">
            Usuarios registrados en Game Zone.
          </p>

        </div>


        <NavLink
          to="/admin/usuarios/nuevo"
          className="btn btn-warning"
        >
          Nuevo usuario
        </NavLink>

      </div>


      <div className="mb-4">

        <NavLink
          to="/admin"
          className="btn btn-outline-dark"
        >
          ← Volver a productos
        </NavLink>

      </div>


      <div className="table-responsive">

        <table className="table table-bordered table-striped align-middle">

          <thead className="table-dark">

            <tr>

              <th>
                RUT
              </th>

              <th>
                Nombre
              </th>

              <th>
                Correo
              </th>

              <th>
                Rol
              </th>

              <th>
                Acciones
              </th>

            </tr>

          </thead>


          <tbody>

            {/* ADMINISTRADOR */}

            <tr>

              <td>
                11.111.111-1
              </td>

              <td>
                Administrador
              </td>

              <td>
                admin@gmail.com
              </td>

              <td>
                Administrador
              </td>

              <td>
                -
              </td>

            </tr>


            {/* USUARIOS GUARDADOS */}

            {usuarios.map(
              (
                usuarioGuardado,
                posicion
              ) => (

                <tr
                  key={
                    `${usuarioGuardado.correo}-${posicion}`
                  }
                >

                  <td>

                    {
                      usuarioGuardado.rut ||
                      usuarioGuardado.run ||
                      "-"
                    }

                  </td>


                  <td>

                    {usuarioGuardado.nombre}

                    {
                      usuarioGuardado.apellidos
                        ? ` ${usuarioGuardado.apellidos}`
                        : ""
                    }

                  </td>


                  <td>
                    {usuarioGuardado.correo}
                  </td>


                  <td>

                    {
                      usuarioGuardado.rol ||
                      "Cliente"
                    }

                  </td>


                  <td>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        eliminarUsuario(
                          posicion
                        )
                      }
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              )
            )}


            {usuarios.length === 0 && (

              <tr>

                <td
                  colSpan="5"
                  className="text-center text-secondary"
                >
                  No hay usuarios registrados.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </main>

  );

}


export default AdminUsuarios;