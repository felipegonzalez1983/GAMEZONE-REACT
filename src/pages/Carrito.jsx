import { NavLink } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";


function Carrito() {

  const {
    carrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    totalCarrito
  } = useCarrito();


  function formatearPrecio(precio) {

    return precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP"
    });

  }


  function manejarVaciarCarrito() {

    const confirmar =
      window.confirm(
        "¿Quieres vaciar todo el carrito?"
      );


    if (confirmar) {

      vaciarCarrito();

    }

  }


  if (carrito.length === 0) {

    return (

      <main className="container py-5">

        <h1>Carrito</h1>

        <div className="carrito-vacio">

          <p>
            Tu carrito está vacío.
          </p>

          <NavLink
            to="/productos"
            className="btn btn-warning"
          >
            Ver productos
          </NavLink>

        </div>

      </main>

    );

  }


  return (

    <main className="container py-5">

      <h1>
        Carrito
      </h1>


      <div className="lista-carrito">

        {carrito.map((producto) => {

          const subtotal =
            producto.precio *
            producto.cantidad;


          return (

            <article
              key={producto.id}
              className="producto-carrito"
            >

              <div className="carrito-imagen">

                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                />

              </div>


              <div className="carrito-info">

                <h2>
                  {producto.nombre}
                </h2>

                <p>
                  Precio:{" "}
                  {formatearPrecio(
                    producto.precio
                  )}
                </p>

                <p>
                  Subtotal:{" "}

                  <strong>
                    {formatearPrecio(
                      subtotal
                    )}
                  </strong>
                </p>

              </div>


              <div className="carrito-cantidad">

                <label>
                  Cantidad
                </label>

                <input
                  type="number"
                  min="1"
                  value={producto.cantidad}
                  onChange={(evento) =>
                    cambiarCantidad(
                      producto.id,
                      evento.target.value
                    )
                  }
                />

              </div>


              <div className="carrito-eliminar">

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    eliminarDelCarrito(
                      producto.id
                    )
                  }
                >
                  Eliminar
                </button>

              </div>

            </article>

          );

        })}

      </div>


      <div className="resumen-carrito">

        <h2>
          Total:{" "}
          {formatearPrecio(totalCarrito)}
        </h2>


        <div className="acciones-carrito">

          <button
            className="btn btn-danger"
            onClick={manejarVaciarCarrito}
          >
            Vaciar carrito
          </button>


          <button
            className="btn btn-warning"
            onClick={() =>
              alert(
                "Compra realizada correctamente."
              )
            }
          >
            Finalizar compra
          </button>

        </div>

      </div>

    </main>

  );

}


export default Carrito;