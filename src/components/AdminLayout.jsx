import {
  NavLink,
  Outlet
} from "react-router-dom";


function AdminLayout() {

  return (

    <div className="container-fluid">

      <div className="row">


        {/* MENÚ LATERAL */}

        <aside
          className="
            col-md-3
            col-lg-2
            bg-dark
            text-white
            min-vh-100
            p-4
          "
        >

          <h2 className="text-warning">
            Game Zone
          </h2>

          <p>
            Administración
          </p>

          <hr />


          <nav>

            <ul className="nav flex-column">


              <li className="nav-item">

                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-warning"
                      : "nav-link text-white"
                  }
                >
                  Inicio
                </NavLink>

              </li>


              <li className="nav-item">

                <NavLink
                  to="/admin/productos"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-warning"
                      : "nav-link text-white"
                  }
                >
                  Productos
                </NavLink>

              </li>


              <li className="nav-item">

                <NavLink
                  to="/admin/usuarios"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-warning"
                      : "nav-link text-white"
                  }
                >
                  Usuarios
                </NavLink>

              </li>


              <li className="nav-item">

                <NavLink
                  to="/"
                  className="nav-link text-white"
                >
                  Volver a la tienda
                </NavLink>

              </li>


            </ul>

          </nav>

        </aside>


        {/* CONTENIDO */}

        <section className="col-md-9 col-lg-10">

          <Outlet />

        </section>


      </div>

    </div>

  );

}


export default AdminLayout;