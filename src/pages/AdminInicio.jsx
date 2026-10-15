import {
  NavLink
} from "react-router-dom";

import {
  useUsuario
} from "../context/UsuarioContext";


function AdminInicio() {

  const {
    usuario
  } = useUsuario();


  if (!usuario) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Panel de administración
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


  if (
    usuario.rol !== "Administrador"
  ) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Acceso denegado
        </h1>

        <div className="alert alert-danger mt-4">

          No tienes permisos para acceder
          al panel de administración.

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

      <h1>
        Panel de administración
      </h1>

      <p>
        Desde este panel se pueden gestionar
        los productos y los usuarios de Game Zone.
      </p>


      <div className="row mt-4">


        {/* PRODUCTOS */}

        <div className="col-md-6 mb-3">

          <div className="card h-100">

            <div className="card-body">

              <h2 className="h4">
                Productos
              </h2>

              <p>
                Revisa y administra los productos
                disponibles en la tienda.
              </p>


              <NavLink
                to="/admin/productos"
                className="btn btn-warning"
              >
                Ver productos
              </NavLink>

            </div>

          </div>

        </div>


        {/* USUARIOS */}

        <div className="col-md-6 mb-3">

          <div className="card h-100">

            <div className="card-body">

              <h2 className="h4">
                Usuarios
              </h2>

              <p>
                Revisa y administra los usuarios
                registrados en el sistema.
              </p>


              <NavLink
                to="/admin/usuarios"
                className="btn btn-warning"
              >
                Ver usuarios
              </NavLink>

            </div>

          </div>

        </div>


      </div>

    </main>

  );

}


export default AdminInicio;