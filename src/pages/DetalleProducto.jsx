import {
  useState
} from "react";

import {
  useParams,
  NavLink
} from "react-router-dom";

import {
  useCarrito
} from "../context/CarritoContext";

import {
  useProductos
} from "../context/ProductosContext";


function DetalleProducto() {

  const {
    id
  } = useParams();


  const {
    productos
  } = useProductos();


  const {
    agregarAlCarrito
  } = useCarrito();


  const [
    cantidad,
    setCantidad
  ] = useState(1);


  const producto =
    productos.find(
      (producto) =>
        producto.id ===
        Number(id)
    );


  function formatearPrecio(
    precio
  ) {

    return precio.toLocaleString(
      "es-CL",
      {
        style: "currency",
        currency: "CLP"
      }
    );

  }


  function manejarAgregarAlCarrito() {

    const cantidadNumero =
      parseInt(cantidad);


    if (
      isNaN(cantidadNumero) ||
      cantidadNumero < 1
    ) {

      alert(
        "Ingresa una cantidad válida."
      );

      return;

    }


    if (
      cantidadNumero >
      producto.stock
    ) {

      alert(
        `Solo hay ${producto.stock} unidades disponibles.`
      );

      return;

    }


    agregarAlCarrito(
      producto,
      cantidadNumero
    );

  }


  return (

    <main>


      {/* ENCABEZADO */}

      <section
        className="
          encabezado-pagina
          text-white
          text-center
          py-5
        "
      >

        <div className="container">

          <h1>
            Detalle del producto
          </h1>

          <p>
            Revisa las características
            del producto seleccionado.
          </p>

        </div>

      </section>


      {/* PRODUCTO */}

      <section className="container py-5">

        {!producto ? (

          /* PRODUCTO NO ENCONTRADO */

          <div className="alert alert-danger text-center">

            <h2>
              Producto no encontrado
            </h2>

            <p>
              El producto seleccionado no existe.
            </p>

            <NavLink
              to="/productos"
              className="btn btn-dark"
            >
              Volver a productos
            </NavLink>

          </div>

        ) : (

          /* DETALLE DEL PRODUCTO */

          <div className="detalle-producto">

            <div className="row g-5 align-items-start">


              {/* IMAGEN */}

              <div className="col-lg-6">

                <div className="producto-detalle-imagen">

                  <img
                    src={
                      producto.imagen
                    }
                    alt={
                      producto.nombre
                    }
                    className="img-fluid"
                  />

                </div>

              </div>


              {/* INFORMACIÓN */}

              <div className="col-lg-6">

                <span className="badge bg-dark mb-3">

                  {producto.categoria}

                </span>


                <h1 className="mb-3">

                  {producto.nombre}

                </h1>


                <h2 className="precio-producto mb-4">

                  {formatearPrecio(
                    producto.precio
                  )}

                </h2>


                <hr />


                <p className="descripcion-producto">

                  {producto.descripcion}

                </p>


                <p>

                  <strong>
                    Plataforma:
                  </strong>{" "}

                  {producto.plataforma}

                </p>


                <p>

                  <strong>
                    Código:
                  </strong>{" "}

                  {producto.codigo}

                </p>


                <p>

                  <strong>
                    Stock disponible:
                  </strong>{" "}

                  {producto.stock}

                </p>


                {/* CANTIDAD */}

                <div className="mb-4">

                  <label
                    htmlFor="cantidad-producto"
                    className="form-label"
                  >
                    Cantidad
                  </label>


                  <input
                    id="cantidad-producto"
                    type="number"
                    className="form-control"
                    value={cantidad}
                    min="1"
                    max={
                      producto.stock
                    }
                    onChange={(evento) =>
                      setCantidad(
                        evento.target.value
                      )
                    }
                  />

                </div>


                {/* BOTÓN */}

                <button
                  type="button"
                  className="btn btn-warning btn-lg w-100"
                  onClick={
                    manejarAgregarAlCarrito
                  }
                >
                  Añadir al carrito
                </button>

              </div>

            </div>

          </div>

        )}

      </section>


      {/* VOLVER AL CATÁLOGO */}

      <section className="container text-center pb-5">

        <NavLink
          to="/productos"
          className="btn btn-outline-dark"
        >
          ← Volver al catálogo
        </NavLink>

      </section>


    </main>

  );

}


export default DetalleProducto;