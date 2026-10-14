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

  const {
    cantidadCarrito
  } = useCarrito();

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

        {/* LOGO */}

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


        {/* BOTÓN CELULAR */}

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


        {/* MENÚ */}

        <div
          className="collapse navbar-collapse"
          id="menuPrincipal"
        >

          <ul className="navbar-nav ms-lg-4 align-items-lg-center">


            {/* INICIO */}

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/"
              >
                Inicio
              </NavLink>

            </li>


            {/* PRODUCTOS */}

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/productos"
              >
                Productos
              </NavLink>

            </li>


            {/* CARRITO */}

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


            {/* NOSOTROS */}

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/nosotros"
              >
                Nosotros
              </NavLink>

            </li>


            {/* BLOG */}

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/blogs"
              >
                Blogs
              </NavLink>

            </li>


            {/* CONTACTO */}

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/contacto"
              >
                Contacto
              </NavLink>

            </li>


            {/* USUARIO CON SESIÓN */}

            {usuario ? (

              <>

                {/* CLIENTE */}

                {usuario.rol === "Cliente" && (

                  <li className="nav-item">

                    <NavLink
                      className="nav-link"
                      to="/historial"
                    >
                      Mis compras
                    </NavLink>

                  </li>

                )}


                {/* ADMINISTRADOR */}

                {usuario.rol === "Administrador" && (

                  <>

                    <li className="nav-item">

                      <NavLink
                        className="nav-link text-warning"
                        to="/admin"
                      >
                        Administración
                      </NavLink>

                    </li>


                    <li className="nav-item">

                      <NavLink
                        className="nav-link text-warning"
                        to="/admin/usuarios"
                      >
                        Usuarios
                      </NavLink>

                    </li>

                  </>

                )}


                {/* NOMBRE */}

                <li className="nav-item">

                  <span className="nav-link">

                    👤 Hola, {usuario.nombre}

                  </span>

                </li>


                {/* CERRAR SESIÓN */}

                <li className="nav-item">

                  <button
                    className="btn btn-outline-warning ms-lg-2"
                    onClick={
                      manejarCerrarSesion
                    }
                  >
                    Cerrar sesión
                  </button>

                </li>

              </>

            ) : (

              /* SIN SESIÓN */

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