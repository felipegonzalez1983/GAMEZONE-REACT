import { NavLink } from "react-router-dom";


function Footer() {

  return (

    <footer className="pie-pagina text-white py-5">

      <div className="container">

        <div className="row">


          {/* INFORMACIÓN */}

          <div className="col-lg-4 col-md-6 mb-4">

            <h2 className="h4">
              Game Zone
            </h2>

            <p>
              Tienda online de videojuegos,
              consolas y accesorios gamer.
            </p>

          </div>


          {/* ENLACES */}

          <div className="col-lg-4 col-md-6 mb-4">

            <h2 className="h4">
              Enlaces
            </h2>

            <ul className="list-unstyled">

              <li>
                <NavLink to="/">
                  Inicio
                </NavLink>
              </li>

              <li>
                <NavLink to="/productos">
                  Productos
                </NavLink>
              </li>

              <li>
                <NavLink to="/nosotros">
                  Nosotros
                </NavLink>
              </li>

              <li>
                <NavLink to="/blogs">
                  Blogs
                </NavLink>
              </li>

              <li>
                <NavLink to="/contacto">
                  Contacto
                </NavLink>
              </li>

              <li>
                <NavLink to="/carrito">
                  Carrito
                </NavLink>
              </li>

            </ul>

          </div>


          {/* CONTACTO */}

          <div className="col-lg-4 col-md-6 mb-4">

            <h2 className="h4">
              Contacto
            </h2>

            <p>
              Correo: contacto@gamezone.cl
            </p>

            <p>
              Teléfono: +56 9 1234 5678
            </p>

          </div>


        </div>


        <hr />


        <p className="text-center mb-0">
          Game Zone © 2026 - DuocUC
        </p>

      </div>

    </footer>

  );

}


export default Footer;