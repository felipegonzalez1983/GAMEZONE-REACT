import { NavLink } from "react-router-dom";

import { useCarrito } from "../context/CarritoContext";


function ProductoCard({ producto }) {

  const { agregarAlCarrito } =
    useCarrito();


  function formatearPrecio(precio) {

    return precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP"
    });

  }


  return (

    <article className="col-lg-4 col-md-6 mb-4">

      <div className="card tarjeta-producto">

        <div className="producto-imagen">

          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="imagen-consola"
          />

        </div>


        <div className="card-body">

          <span className="badge bg-dark mb-2">
            {producto.categoria}
          </span>


          <h3 className="card-title">
            {producto.nombre}
          </h3>


          <p className="card-text">
            {producto.descripcion}
          </p>


          <p>
            Plataforma:{" "}
            <strong>
              {producto.plataforma}
            </strong>
          </p>


          <p>
            Stock:{" "}
            <strong>
              {producto.stock}
            </strong>
          </p>


          <h4>
            {formatearPrecio(producto.precio)}
          </h4>


          <div className="d-grid gap-2">

            <NavLink
              to={`/productos/${producto.id}`}
              className="btn btn-outline-dark"
            >
              Ver detalle
            </NavLink>


            <button
              className="btn btn-warning"
              onClick={() =>
                agregarAlCarrito(producto)
              }
            >
              Añadir al carrito
            </button>

          </div>

        </div>

      </div>

    </article>

  );
}


export default ProductoCard;