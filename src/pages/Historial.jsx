import {
  NavLink
} from "react-router-dom";

import {
  useUsuario
} from "../context/UsuarioContext";


function Historial() {

  const {
    usuario
  } = useUsuario();


  function formatearPrecio(precio) {

    return precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP"
    });

  }


  /* SI NO HAY SESIÓN */

  if (!usuario) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Mis compras
        </h1>

        <div className="alert alert-warning mt-4">

          Debes iniciar sesión para ver
          tu historial de compras.

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


  /* RECUPERAR COMPRAS */

  let comprasGuardadas = [];


  try {

    comprasGuardadas =
      JSON.parse(
        localStorage.getItem(
          "comprasGameZone"
        )
      ) || [];

  } catch {

    comprasGuardadas = [];

  }


  /* SOLO COMPRAS DEL USUARIO */

  const comprasUsuario =
    comprasGuardadas
      .filter(
        (compra) =>
          compra.correoUsuario ===
          usuario.correo
      )
      .sort(
        (a, b) =>
          new Date(b.fecha) -
          new Date(a.fecha)
      );


  return (

    <main className="container py-5">

      <h1>
        Mis compras
      </h1>

      <p className="text-secondary">
        Aquí puedes revisar tus compras realizadas en Game Zone.
      </p>


      {/* SIN COMPRAS */}

      {comprasUsuario.length === 0 && (

        <div className="carrito-vacio mt-4">

          <p>
            Todavía no has realizado ninguna compra.
          </p>

          <NavLink
            to="/productos"
            className="btn btn-warning"
          >
            Ver productos
          </NavLink>

        </div>

      )}


      {/* COMPRAS */}

      {comprasUsuario.map(
        (compra) => (

          <article
            key={compra.id}
            className="card mb-4 mt-4"
          >

            <div className="card-body">

              <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">

                <div>

                  <h2 className="h5 mb-1">
                    Compra {compra.id}
                  </h2>

                  <span className="text-secondary">
                    {new Date(
                      compra.fecha
                    ).toLocaleString(
                      "es-CL"
                    )}
                  </span>

                </div>


                <h3 className="h5">

                  Total:{" "}

                  <span className="text-success">

                    {formatearPrecio(
                      compra.total
                    )}

                  </span>

                </h3>

              </div>


              <hr />


              {compra.productos.map(
                (producto) => (

                  <div
                    key={producto.id}
                    className="row align-items-center mb-3"
                  >

                    <div className="col-md-2 text-center">

                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain"
                        }}
                      />

                    </div>


                    <div className="col-md-5">

                      <strong>
                        {producto.nombre}
                      </strong>

                    </div>


                    <div className="col-md-2">

                      Cantidad:{" "}
                      {producto.cantidad}

                    </div>


                    <div className="col-md-3">

                      {formatearPrecio(
                        producto.precio *
                        producto.cantidad
                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          </article>

        )
      )}

    </main>

  );

}


export default Historial;