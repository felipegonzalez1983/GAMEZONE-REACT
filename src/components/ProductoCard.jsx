import {
  NavLink
} from "react-router-dom";

import {
  useCarrito
} from "../context/CarritoContext";


function ProductoCard({
  producto,
  destacado = false
}) {

  const {
    agregarAlCarrito
  } = useCarrito();


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


  return (

    <article className="col-lg-4 col-md-6 mb-4">

      <div className="card tarjeta-producto">


        {/* IMAGEN */}

        <div className="producto-imagen">

          <img
            src={
              producto.imagen
            }
            alt={
              producto.nombre
            }
            className="imagen-consola"
          />

        </div>


        <div className="card-body">


          {/* ETIQUETA */}

          <span className="badge bg-dark mb-2">

            {
              destacado
                ? producto.plataforma
                : producto.categoria
            }

          </span>


          {/* NOMBRE */}

          <h3 className="card-title">

            {producto.nombre}

          </h3>


          {/* DESCRIPCIÓN */}

          <p className="card-text">

            {producto.descripcion}

          </p>


          {/* PLATAFORMA */}

          {!destacado && (

            <p>

              Plataforma:{" "}

              <strong>
                {producto.plataforma}
              </strong>

            </p>

          )}


          {/* STOCK */}

          <p>

            {
              destacado
                ? "Stock disponible: "
                : "Stock: "
            }

            <strong>
              {producto.stock}
            </strong>

          </p>


          {/* PRECIO */}

          <h4>

            {formatearPrecio(
              producto.precio
            )}

          </h4>


          {/* BOTONES */}

          <div className="d-grid gap-2">

            <NavLink
              to={
                `/productos/${producto.id}`
              }
              className="btn btn-outline-dark"
            >
              Ver detalle
            </NavLink>


            <button
              type="button"
              className="btn btn-warning"
              onClick={() =>
                agregarAlCarrito(
                  producto
                )
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