import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  useCarrito
} from "../context/CarritoContext";

import {
  useUsuario
} from "../context/UsuarioContext";

import {
  useProductos
} from "../context/ProductosContext";


function Carrito() {

  const navigate =
    useNavigate();


  const {
    carrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    totalCarrito
  } = useCarrito();


  const {
    usuario
  } = useUsuario();


  const {
    productos,
    descontarStock
  } = useProductos();


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


  function manejarVaciarCarrito() {

    const confirmar =
      window.confirm(
        "¿Quieres vaciar todo el carrito?"
      );


    if (confirmar) {

      vaciarCarrito();

    }

  }


  function finalizarCompra() {

    /* CARRITO VACÍO */

    if (
      carrito.length === 0
    ) {

      alert(
        "Debes agregar productos al carrito."
      );

      return;

    }


    /* VALIDAR SESIÓN */

    if (!usuario) {

      alert(
        "Debes iniciar sesión para finalizar la compra."
      );

      navigate("/login");

      return;

    }


    /* VALIDAR STOCK */

    for (
      const productoCarrito
      of carrito
    ) {

      const productoActual =
        productos.find(
          (producto) =>
            producto.id ===
            productoCarrito.id
        );


      if (!productoActual) {

        alert(
          `${productoCarrito.nombre} ya no está disponible.`
        );

        return;

      }


      if (
        productoCarrito.cantidad >
        productoActual.stock
      ) {

        alert(
          `Stock insuficiente para ${productoActual.nombre}. Disponible: ${productoActual.stock}.`
        );

        return;

      }

    }


    /* CONFIRMAR COMPRA */

    const confirmar =
      window.confirm(
        `¿Deseas finalizar tu compra por ${formatearPrecio(totalCarrito)}?`
      );


    if (!confirmar) {
      return;
    }


    /* CREAR COMPRA */

    const nuevaCompra = {

      id:
        `GZ-${Date.now()}`,

      correoUsuario:
        usuario.correo,

      nombreUsuario:
        usuario.nombre,

      fecha:
        new Date().toISOString(),

      productos:
        carrito.map(
          (producto) => ({
            ...producto
          })
        ),

      total:
        totalCarrito

    };


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


    /* GUARDAR COMPRA */

    localStorage.setItem(
      "comprasGameZone",
      JSON.stringify([
        ...comprasGuardadas,
        nuevaCompra
      ])
    );


    /* DESCONTAR STOCK */

    descontarStock(
      carrito
    );


    /* VACIAR CARRITO */

    vaciarCarrito();


    alert(
      "Compra realizada correctamente."
    );


    navigate(
      "/historial"
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
            Carrito de compras
          </h1>

          <p>
            Revisa tus productos antes
            de finalizar la compra.
          </p>

        </div>

      </section>


      {/* CARRITO */}

      <section className="container py-5">

        <div className="row g-4">


          {/* PRODUCTOS */}

          <div className="col-lg-8">

            <h2 className="mb-4">
              Productos seleccionados
            </h2>


            {carrito.length === 0 ? (

              <div className="alert alert-secondary text-center">

                Tu carrito está vacío.

                <br />

                <br />

                <NavLink
                  to="/productos"
                  className="btn btn-warning"
                >
                  Ver productos
                </NavLink>

              </div>

            ) : (

              carrito.map(
                (producto) => {

                  const subtotal =
                    producto.precio *
                    producto.cantidad;


                  return (

                    <article
                      key={
                        producto.id
                      }
                      className="card mb-3"
                    >

                      <div className="row g-0 align-items-center">


                        {/* IMAGEN */}

                        <div className="col-md-3">

                          <img
                            src={
                              producto.imagen
                            }
                            alt={
                              producto.nombre
                            }
                            className="img-fluid p-3"
                          />

                        </div>


                        {/* INFORMACIÓN */}

                        <div className="col-md-5">

                          <div className="card-body">

                            <h3 className="h5">

                              {producto.nombre}

                            </h3>


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

                        </div>


                        {/* CANTIDAD */}

                        <div className="col-md-2 p-3">

                          <label
                            htmlFor={
                              `cantidad-${producto.id}`
                            }
                            className="form-label"
                          >
                            Cantidad
                          </label>


                          <input
                            id={
                              `cantidad-${producto.id}`
                            }
                            type="number"
                            className="form-control"
                            min="1"
                            value={
                              producto.cantidad
                            }
                            onChange={(evento) =>
                              cambiarCantidad(
                                producto.id,
                                evento.target.value
                              )
                            }
                          />

                        </div>


                        {/* ELIMINAR */}

                        <div className="col-md-2 p-3">

                          <button
                            type="button"
                            className="btn btn-danger w-100"
                            onClick={() =>
                              eliminarDelCarrito(
                                producto.id
                              )
                            }
                          >
                            Eliminar
                          </button>

                        </div>


                      </div>

                    </article>

                  );

                }
              )

            )}

          </div>


          {/* RESUMEN */}

          <aside className="col-lg-4">

            <div className="card shadow-sm">

              <div className="card-body">

                <h2 className="h4 mb-4">
                  Resumen de la compra
                </h2>


                <div className="d-flex justify-content-between align-items-center mb-4">

                  <span className="fs-5">
                    Total:
                  </span>

                  <strong className="fs-4 text-danger">

                    {formatearPrecio(
                      totalCarrito
                    )}

                  </strong>

                </div>


                <div className="d-grid gap-3">


                  {/* FINALIZAR */}

                  <button
                    type="button"
                    className="btn btn-warning btn-lg"
                    onClick={
                      finalizarCompra
                    }
                  >
                    Finalizar compra
                  </button>


                  {/* VACIAR */}

                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={
                      manejarVaciarCarrito
                    }
                  >
                    Vaciar carrito
                  </button>


                  {/* SEGUIR COMPRANDO */}

                  <NavLink
                    to="/productos"
                    className="btn btn-outline-dark"
                  >
                    Seguir comprando
                  </NavLink>


                </div>

              </div>

            </div>

          </aside>


        </div>

      </section>


    </main>

  );

}


export default Carrito;