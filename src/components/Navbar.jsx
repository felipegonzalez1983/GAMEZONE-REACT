import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  useCarrito
} from "../context/CarritoContext";

import {
  useUsuario
} from "../context/UsuarioContext";


function Navbar() {

  const navigate = useNavigate();

  const { cantidadCarrito } =
    useCarrito();

  const {
    usuario,
    cerrarSesion
  } = useUsuario();


  function manejarCerrarSesion() {

    cerrarSesion();

    alert(
      "Sesión cerrada correctamente."
    );

    navigate("/");

  }


  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <NavLink
          className="navbar-brand"
          to="/"
        >

          <img
            src="/logo-game-zone.jpeg"
            alt="Game Zone"
            className="logo-tienda"
          />

        </NavLink>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >

          <span className="navbar-toggler-icon">
          </span>

        </button>


        <div
          className="collapse navbar-collapse"
          id="menuPrincipal"
        >

          <ul className="navbar-nav ms-lg-4 align-items-lg-center">

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/"
              >
                Inicio
              </NavLink>

            </li>


            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/productos"
              >
                Productos
              </NavLink>

            </li>


            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/carrito"
              >

                 Carrito

                <span className="badge bg-warning text-dark ms-1">
                  {cantidadCarrito}
                </span>

              </NavLink>

            </li>

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/nosotros"
  >
                Nosotros
              </NavLink>

            </li>

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/blogs"
              >
                Blogs
              </NavLink>

            </li>


            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/contacto"
              >
                Contacto
              </NavLink>

            </li>


            {usuario ? (

              <>

                <li className="nav-item">

                  <span className="nav-link">

                    👤 Hola, {usuario.nombre}

                  </span>

                </li>


                <li className="nav-item">

                  <button
                    className="btn btn-outline-warning ms-lg-2"
                    onClick={manejarCerrarSesion}
                  >
                    Cerrar sesión
                  </button>

                </li>

              </>

            ) : (

              <li className="nav-item">

                <NavLink
                  className="btn btn-warning ms-lg-2"
                  to="/login"
                >
                  Iniciar sesión
                </NavLink>

              </li>

            )}

          </ul>

        </div>

      </div>

    </nav>

  );

}


export default Navbar;