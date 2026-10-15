import {
  useState
} from "react";

import {
  NavLink
} from "react-router-dom";

import {
  useUsuario
} from "../context/UsuarioContext";

import {
  useProductos
} from "../context/ProductosContext";


function Admin() {

  const {
    usuario
  } = useUsuario();


  const {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto
  } = useProductos();


  const [
    mostrarFormulario,
    setMostrarFormulario
  ] = useState(false);


  const [
    productoEditando,
    setProductoEditando
  ] = useState(null);


  const [
    errores,
    setErrores
  ] = useState({});


  const [
    formulario,
    setFormulario
  ] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    plataforma: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: ""
  });


  function formatearPrecio(precio) {

    return Number(precio).toLocaleString(
      "es-CL",
      {
        style: "currency",
        currency: "CLP"
      }
    );

  }


  function limpiarFormulario() {

    setFormulario({
      codigo: "",
      nombre: "",
      categoria: "",
      plataforma: "",
      precio: "",
      stock: "",
      imagen: "",
      descripcion: ""
    });

    setProductoEditando(null);

    setErrores({});

    setMostrarFormulario(false);

  }


  function manejarCambio(evento) {

    const {
      name,
      value
    } = evento.target;


    setFormulario(
      (formularioActual) => ({
        ...formularioActual,
        [name]: value
      })
    );


    setErrores(
      (erroresActuales) => ({
        ...erroresActuales,
        [name]: ""
      })
    );

  }


  function abrirFormularioNuevo() {

    setProductoEditando(null);

    setFormulario({
      codigo: "",
      nombre: "",
      categoria: "",
      plataforma: "",
      precio: "",
      stock: "",
      imagen: "",
      descripcion: ""
    });

    setErrores({});

    setMostrarFormulario(true);

  }


  function abrirFormularioEditar(
    producto
  ) {

    setProductoEditando(
      producto.id
    );


    setFormulario({
      codigo:
        producto.codigo,

      nombre:
        producto.nombre,

      categoria:
        producto.categoria,

      plataforma:
        producto.plataforma,

      precio:
        producto.precio,

      stock:
        producto.stock,

      imagen:
        producto.imagen,

      descripcion:
        producto.descripcion
    });


    setErrores({});

    setMostrarFormulario(true);

  }


  function validarFormulario() {

    const nuevosErrores = {};


    if (
      formulario.codigo
        .trim() === ""
    ) {

      nuevosErrores.codigo =
        "El código es obligatorio.";

    }


    if (
      formulario.nombre
        .trim() === ""
    ) {

      nuevosErrores.nombre =
        "El nombre es obligatorio.";

    }


    if (
      formulario.categoria
        .trim() === ""
    ) {

      nuevosErrores.categoria =
        "La categoría es obligatoria.";

    }


    if (
      formulario.plataforma
        .trim() === ""
    ) {

      nuevosErrores.plataforma =
        "La plataforma es obligatoria.";

    }


    if (
      formulario.precio === "" ||
      Number(formulario.precio) <= 0
    ) {

      nuevosErrores.precio =
        "Ingresa un precio válido.";

    }


    if (
      formulario.stock === "" ||
      Number(formulario.stock) < 0
    ) {

      nuevosErrores.stock =
        "Ingresa un stock válido.";

    }


    if (
      formulario.imagen
        .trim() === ""
    ) {

      nuevosErrores.imagen =
        "La imagen es obligatoria.";

    }


    if (
      formulario.descripcion
        .trim() === ""
    ) {

      nuevosErrores.descripcion =
        "La descripción es obligatoria.";

    }


    /* VALIDAR CÓDIGO REPETIDO */

    const codigoRepetido =
      productos.some(
        (producto) =>

          producto.codigo
            .toLowerCase() ===
          formulario.codigo
            .trim()
            .toLowerCase()

          &&

          producto.id !==
            productoEditando
      );


    if (codigoRepetido) {

      nuevosErrores.codigo =
        "Ya existe un producto con este código.";

    }


    setErrores(
      nuevosErrores
    );


    return (
      Object.keys(
        nuevosErrores
      ).length === 0
    );

  }


  function manejarSubmit(evento) {

    evento.preventDefault();


    if (!validarFormulario()) {
      return;
    }


    const datosProducto = {

      codigo:
        formulario.codigo
          .trim(),

      nombre:
        formulario.nombre
          .trim(),

      categoria:
        formulario.categoria
          .trim(),

      plataforma:
        formulario.plataforma
          .trim(),

      precio:
        Number(
          formulario.precio
        ),

      stock:
        Number(
          formulario.stock
        ),

      imagen:
        formulario.imagen
          .trim(),

      descripcion:
        formulario.descripcion
          .trim()

    };


    if (productoEditando !== null) {

      editarProducto(
        productoEditando,
        datosProducto
      );

      alert(
        "Producto actualizado correctamente."
      );

    } else {

      agregarProducto(
        datosProducto
      );

      alert(
        "Producto agregado correctamente."
      );

    }


    limpiarFormulario();

  }


  function manejarEliminar(
    producto
  ) {

    const confirmar =
      window.confirm(
        `¿Deseas eliminar ${producto.nombre}?`
      );


    if (!confirmar) {
      return;
    }


    eliminarProducto(
      producto.id
    );


    alert(
      "Producto eliminado correctamente."
    );

  }


  /* SIN SESIÓN */

  if (!usuario) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Panel de administración
        </h1>

        <div className="alert alert-warning mt-4">

          Debes iniciar sesión como
          administrador para acceder.

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


  /* NO ES ADMINISTRADOR */

  if (
    usuario.rol !==
    "Administrador"
  ) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Acceso denegado
        </h1>

        <div className="alert alert-danger mt-4">

          No tienes permisos para
          acceder a esta sección.

        </div>

        <NavLink
          to="/"
          className="btn btn-dark"
        >
          Volver al inicio
        </NavLink>

      </main>

    );

  }


  return (

    <main className="container py-5">


      {/* ENCABEZADO */}

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <div>

          <h1>
            Panel de administración
          </h1>

          <p className="text-secondary mb-0">
            Gestión de productos de Game Zone.
          </p>

        </div>


        <button
          className="btn btn-warning"
          onClick={
            abrirFormularioNuevo
          }
        >
          + Agregar producto
        </button>

      </div>


      {/* RESUMEN */}

      <div className="row g-3 mb-5">

        <div className="col-md-4">

          <div className="card text-center">

            <div className="card-body">

              <h2 className="h5">
                Productos
              </h2>

              <p className="display-6 mb-0">
                {productos.length}
              </p>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card text-center">

            <div className="card-body">

              <h2 className="h5">
                Stock total
              </h2>

              <p className="display-6 mb-0">

                {
                  productos.reduce(
                    (
                      total,
                      producto
                    ) =>
                      total +
                      producto.stock,
                    0
                  )
                }

              </p>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card text-center">

            <div className="card-body">

              <h2 className="h5">
                Categorías
              </h2>

              <p className="display-6 mb-0">

                {
                  new Set(
                    productos.map(
                      (producto) =>
                        producto.categoria
                    )
                  ).size
                }

              </p>

            </div>

          </div>

        </div>

      </div>


      {/* FORMULARIO */}

      {mostrarFormulario && (

        <section className="card mb-5">

          <div className="card-body">

            <h2 className="h4 mb-4">

              {
                productoEditando !== null
                  ? "Editar producto"
                  : "Agregar producto"
              }

            </h2>


            <form
              onSubmit={
                manejarSubmit
              }
              noValidate
            >

              <div className="row g-3">


                {/* CÓDIGO */}

                <div className="col-md-4">

                  <label
                    className="form-label"
                    htmlFor="codigo"
                  >
                    Código
                  </label>

                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    className="form-control"
                    value={
                      formulario.codigo
                    }
                    onChange={
                      manejarCambio
                    }
                  />

                  <small className="text-danger">
                    {errores.codigo}
                  </small>

                </div>


                {/* NOMBRE */}

                <div className="col-md-8">

                  <label
                    className="form-label"
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>

                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    value={
                      formulario.nombre
                    }
                    onChange={
                      manejarCambio
                    }
                  />

                  <small className="text-danger">
                    {errores.nombre}
                  </small>

                </div>


                {/* CATEGORÍA */}

                <div className="col-md-4">

                  <label
                    className="form-label"
                    htmlFor="categoria"
                  >
                    Categoría
                  </label>

                  <select
                    id="categoria"
                    name="categoria"
                    className="form-select"
                    value={
                      formulario.categoria
                    }
                    onChange={
                      manejarCambio
                    }
                  >

                    <option value="">
                      Seleccionar
                    </option>

                    <option value="Consolas">
                      Consolas
                    </option>

                    <option value="Accesorios">
                      Accesorios
                    </option>

                    <option value="Videojuegos">
                      Videojuegos
                    </option>

                  </select>

                  <small className="text-danger">
                    {errores.categoria}
                  </small>

                </div>


                {/* PLATAFORMA */}

                <div className="col-md-4">

                  <label
                    className="form-label"
                    htmlFor="plataforma"
                  >
                    Plataforma
                  </label>

                  <input
                    type="text"
                    id="plataforma"
                    name="plataforma"
                    className="form-control"
                    placeholder="Ej: PlayStation"
                    value={
                      formulario.plataforma
                    }
                    onChange={
                      manejarCambio
                    }
                  />

                  <small className="text-danger">
                    {errores.plataforma}
                  </small>

                </div>


                {/* PRECIO */}

                <div className="col-md-4">

                  <label
                    className="form-label"
                    htmlFor="precio"
                  >
                    Precio
                  </label>

                  <input
                    type="number"
                    id="precio"
                    name="precio"
                    min="1"
                    className="form-control"
                    value={
                      formulario.precio
                    }
                    onChange={
                      manejarCambio
                    }
                  />

                  <small className="text-danger">
                    {errores.precio}
                  </small>

                </div>


                {/* STOCK */}

                <div className="col-md-4">

                  <label
                    className="form-label"
                    htmlFor="stock"
                  >
                    Stock
                  </label>

                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    min="0"
                    className="form-control"
                    value={
                      formulario.stock
                    }
                    onChange={
                      manejarCambio
                    }
                  />

                  <small className="text-danger">
                    {errores.stock}
                  </small>

                </div>


                {/* IMAGEN */}

                <div className="col-md-8">

                  <label
                    className="form-label"
                    htmlFor="imagen"
                  >
                    Imagen
                  </label>

                  <input
                    type="text"
                    id="imagen"
                    name="imagen"
                    className="form-control"
                    placeholder="/ps5.jpg"
                    value={
                      formulario.imagen
                    }
                    onChange={
                      manejarCambio
                    }
                  />

                  <small className="text-danger">
                    {errores.imagen}
                  </small>

                </div>


                {/* DESCRIPCIÓN */}

                <div className="col-12">

                  <label
                    className="form-label"
                    htmlFor="descripcion"
                  >
                    Descripción
                  </label>

                  <textarea
                    id="descripcion"
                    name="descripcion"
                    className="form-control"
                    rows="3"
                    value={
                      formulario.descripcion
                    }
                    onChange={
                      manejarCambio
                    }
                  />

                  <small className="text-danger">
                    {errores.descripcion}
                  </small>

                </div>


              </div>


              {/* BOTONES */}

              <div className="mt-4">

                <button
                  type="submit"
                  className="btn btn-warning me-2"
                >

                  {
                    productoEditando !== null
                      ? "Guardar cambios"
                      : "Agregar producto"
                  }

                </button>


                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={
                    limpiarFormulario
                  }
                >
                  Cancelar
                </button>

              </div>

            </form>

          </div>

        </section>

      )}


      {/* TABLA */}

      <div className="table-responsive">

        <table className="table table-striped table-hover align-middle">

          <thead className="table-dark">

            <tr>

              <th>Imagen</th>

              <th>Código</th>

              <th>Producto</th>

              <th>Categoría</th>

              <th>Precio</th>

              <th>Stock</th>

              <th>Acciones</th>

            </tr>

          </thead>


          <tbody>

            {productos.map(
              (producto) => (

                <tr
                  key={
                    producto.id
                  }
                >

                  <td>

                    <img
                      src={
                        producto.imagen
                      }
                      alt={
                        producto.nombre
                      }
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit:
                          "contain"
                      }}
                    />

                  </td>


                  <td>
                    {producto.codigo}
                  </td>


                  <td>
                    {producto.nombre}
                  </td>


                  <td>
                    {producto.categoria}
                  </td>


                  <td>

                    {formatearPrecio(
                      producto.precio
                    )}

                  </td>


                  <td>

                    <span
                      className={
                        producto.stock <= 5
                          ? "badge bg-danger"
                          : "badge bg-success"
                      }
                    >
                      {producto.stock}
                    </span>

                  </td>


                  <td>

                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() =>
                        abrirFormularioEditar(
                          producto
                        )
                      }
                    >
                      Editar
                    </button>


                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        manejarEliminar(
                          producto
                        )
                      }
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </main>

  );

}


export default Admin;