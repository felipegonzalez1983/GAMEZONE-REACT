import { NavLink } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";


function Navbar() {

  const { cantidadCarrito } =
    useCarrito();


  return (

    <nav className="navbar">

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


        <div className="navbar-collapse">

          <ul className="navbar-nav">

            <li>

              <NavLink
                className="nav-link"
                to="/"
              >
                Inicio
              </NavLink>

            </li>


            <li>

              <NavLink
                className="nav-link"
                to="/productos"
              >
                Productos
              </NavLink>

            </li>


            <li>

              <NavLink
                className="nav-link"
                to="/carrito"
              >
                🛒 Carrito ({cantidadCarrito})
              </NavLink>

            </li>


            <li>

              <NavLink
                className="nav-link"
                to="/contacto"
              >
                Contacto
              </NavLink>

            </li>


            <li>

              <NavLink
                className="nav-link"
                to="/login"
              >
                Iniciar sesión
              </NavLink>

            </li>

          </ul>

        </div>

      </div>

    </nav>

  );

}


export default Navbar;