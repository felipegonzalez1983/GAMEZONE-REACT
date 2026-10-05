import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">

        <NavLink className="navbar-brand" to="/">
          <img
            src="/logo-game-zone.jpeg"
            alt="Game Zone"
            className="logo-tienda"
          />
        </NavLink>

        <div className="navbar-collapse">
          <ul className="navbar-nav">

            <li>
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/productos">
                Productos
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/carrito">
                Carrito
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/contacto">
                Contacto
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/login">
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