import { useState } from "react";
import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

function Productos() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const productosFiltrados = productos.filter((producto) => {
    const textoBusqueda = busqueda.toLowerCase().trim();

    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(textoBusqueda) ||
      producto.descripcion.toLowerCase().includes(textoBusqueda) ||
      producto.categoria.toLowerCase().includes(textoBusqueda) ||
      producto.plataforma.toLowerCase().includes(textoBusqueda);

    const coincideCategoria =
      categoria === "Todos" ||
      producto.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <main>

      <section className="container py-5">

        <h1 className="text-center mb-3">
          Productos
        </h1>

        <p className="text-center mb-5">
          Encuentra consolas y accesorios gamer.
        </p>

        <div className="row mb-4">

          <div className="col-md-8 mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(evento) =>
                setBusqueda(evento.target.value)
              }
            />

          </div>

          <div className="col-md-4 mb-3">

            <select
              className="form-select"
              value={categoria}
              onChange={(evento) =>
                setCategoria(evento.target.value)
              }
            >

              <option value="Todos">
                Todos
              </option>

              <option value="Consolas">
                Consolas
              </option>

              <option value="Accesorios">
                Accesorios
              </option>

            </select>

          </div>

        </div>

        {productosFiltrados.length === 0 ? (

          <div className="alert alert-secondary text-center">
            No se encontraron productos.
          </div>

        ) : (

          <div className="row">

            {productosFiltrados.map((producto) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
              />
            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Productos;