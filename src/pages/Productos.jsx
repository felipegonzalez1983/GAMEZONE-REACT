import {
  useState
} from "react";

import ProductoCard
  from "../components/ProductoCard";

import {
  useProductos
} from "../context/ProductosContext";


function Productos() {

  const {
    productos
  } = useProductos();


  const [
    busqueda,
    setBusqueda
  ] = useState("");


  const [
    categoria,
    setCategoria
  ] = useState("Todos");


  const categorias =
    [
      "Todos",
      ...new Set(
        productos.map(
          (producto) =>
            producto.categoria
        )
      )
    ];


  const productosFiltrados =
    productos.filter(
      (producto) => {

        const textoBusqueda =
          busqueda
            .toLowerCase()
            .trim();


        const coincideBusqueda =

          producto.nombre
            .toLowerCase()
            .includes(
              textoBusqueda
            )

          ||

          producto.descripcion
            .toLowerCase()
            .includes(
              textoBusqueda
            )

          ||

          producto.categoria
            .toLowerCase()
            .includes(
              textoBusqueda
            )

          ||

          producto.plataforma
            .toLowerCase()
            .includes(
              textoBusqueda
            );


        const coincideCategoria =

          categoria === "Todos"

          ||

          producto.categoria ===
            categoria;


        return (
          coincideBusqueda &&
          coincideCategoria
        );

      }
    );


  return (

    <main>

      <section className="container py-5">

        <h1 className="text-center mb-3">
          Productos
        </h1>

        <p className="text-center mb-5">
          Encuentra consolas, videojuegos
          y accesorios gamer.
        </p>


        <div className="row mb-4">

          <div className="col-md-8 mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(evento) =>
                setBusqueda(
                  evento.target.value
                )
              }
            />

          </div>


          <div className="col-md-4 mb-3">

            <select
              className="form-select"
              value={categoria}
              onChange={(evento) =>
                setCategoria(
                  evento.target.value
                )
              }
            >

              {categorias.map(
                (categoriaActual) => (

                  <option
                    key={
                      categoriaActual
                    }
                    value={
                      categoriaActual
                    }
                  >
                    {categoriaActual}
                  </option>

                )
              )}

            </select>

          </div>

        </div>


        {productosFiltrados.length === 0 ? (

          <div className="alert alert-secondary text-center">

            No se encontraron productos.

          </div>

        ) : (

          <div className="row">

            {productosFiltrados.map(
              (producto) => (

                <ProductoCard
                  key={
                    producto.id
                  }
                  producto={
                    producto
                  }
                />

              )
            )}

          </div>

        )}

      </section>

    </main>

  );

}


export default Productos;