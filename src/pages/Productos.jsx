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


  /*
    Las categorías se obtienen
    de los productos disponibles.
  */

  const categorias = [
    "Todos",

    ...new Set(
      productos.map(
        (producto) =>
          producto.categoria
      )
    )
  ];


  /*
    FILTRAR PRODUCTOS
  */

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
            Nuestros productos
          </h1>

          <p>
            Encuentra consolas y accesorios
            para mejorar tu experiencia gamer.
          </p>

        </div>

      </section>


      {/* BUSCADOR Y FILTROS */}

      <section className="container pt-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <form
              className="row g-3"
              onSubmit={(evento) =>
                evento.preventDefault()
              }
            >


              {/* BUSCADOR */}

              <div className="col-md-8">

                <label
                  htmlFor="buscador-productos"
                  className="form-label"
                >
                  Buscar un producto
                </label>


                <input
                  id="buscador-productos"
                  type="search"
                  className="form-control"
                  placeholder="Ejemplo: PlayStation, Xbox o teclado"
                  value={busqueda}
                  onChange={(evento) =>
                    setBusqueda(
                      evento.target.value
                    )
                  }
                />

              </div>


              {/* CATEGORÍA */}

              <div className="col-md-4">

                <label
                  htmlFor="filtro-categoria"
                  className="form-label"
                >
                  Categoría
                </label>


                <select
                  id="filtro-categoria"
                  className="form-select"
                  value={categoria}
                  onChange={(evento) =>
                    setCategoria(
                      evento.target.value
                    )
                  }
                >

                  {categorias.map(
                    (
                      categoriaActual
                    ) => (

                      <option
                        key={
                          categoriaActual
                        }
                        value={
                          categoriaActual
                        }
                      >
                        {
                          categoriaActual
                        }
                      </option>

                    )
                  )}

                </select>

              </div>


            </form>

          </div>

        </div>

      </section>


      {/* PRODUCTOS */}

      <section className="container py-5">

        {productosFiltrados.length === 0 ? (

          <div className="alert alert-warning text-center">

            No encontramos productos
            con esa búsqueda.

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