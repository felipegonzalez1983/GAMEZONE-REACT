import { useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import { productos } from "../data/productos";
import { useCarrito } from "../context/CarritoContext";


function DetalleProducto() {

  const { id } = useParams();

  const { agregarAlCarrito } = useCarrito();

  const [cantidad, setCantidad] = useState(1);


  const producto = productos.find(
    (producto) =>
      producto.id === Number(id)
  );


  function formatearPrecio(precio) {

    return precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP"
    });

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


  if (!producto) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Producto no encontrado
        </h1>

        <p>
          El producto que estás buscando no existe.
        </p>

        <NavLink
          to="/productos"
          className="btn btn-warning"
        >
          Volver a productos
        </NavLink>

      </main>

    );

  }


  return (

    <main>

      <section className="container py-5 detalle-producto">

        <div className="row g-5 align-items-start">


          {/* IMAGEN */}

          <div className="col-lg-6">

            <div className="producto-detalle-imagen">

              <img
                src={producto.imagen}
                alt={producto.nombre}
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
                max={producto.stock}
                onChange={(evento) =>
                  setCantidad(
                    evento.target.value
                  )
                }
              />

            </div>


            {/* AÑADIR AL CARRITO */}

            <button
              className="btn btn-warning btn-lg w-100"
              onClick={
                manejarAgregarAlCarrito
              }
            >
              Añadir al carrito
            </button>


            {/* VOLVER */}

            <NavLink
              to="/productos"
              className="btn btn-outline-dark w-100 mt-3"
            >
              Volver a productos
            </NavLink>

          </div>

        </div>

      </section>

    </main>

  );

}


export default DetalleProducto;