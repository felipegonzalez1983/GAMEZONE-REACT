import { NavLink } from "react-router-dom";

import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";


function Inicio() {

  const productosDestacados =
    productos.slice(0, 3);


  return (

    <main>

      {/* PORTADA */}

      <section className="hero">

        <div className="container text-center">

          <h1>
            Bienvenido a Game Zone
          </h1>

          <p>
            Videojuegos, consolas y accesorios
            en un solo lugar.
          </p>

          <NavLink
            to="/productos"
            className="btn btn-warning btn-lg"
          >
            Ver productos
          </NavLink>

        </div>

      </section>


      {/* BENEFICIOS */}

      <section className="beneficios py-5">

        <div className="container">

          <div className="row text-center">


            <article className="col-lg-4 col-md-6 mb-4">

              <div className="beneficio">

                <div className="beneficio-icono">
                  🚚
                </div>

                <h2 className="h4">
                  Envíos a todo Chile
                </h2>

                <p>
                  Recibe tus productos directamente
                  en tu domicilio.
                </p>

              </div>

            </article>


            <article className="col-lg-4 col-md-6 mb-4">

              <div className="beneficio">

                <div className="beneficio-icono">
                  🔒
                </div>

                <h2 className="h4">
                  Compra segura
                </h2>

                <p>
                  Tus datos se mantienen protegidos
                  durante la compra.
                </p>

              </div>

            </article>


            <article className="col-lg-4 col-md-6 mb-4">

              <div className="beneficio">

                <div className="beneficio-icono">
                  🎮
                </div>

                <h2 className="h4">
                  Productos gamer
                </h2>

                <p>
                  Consolas, videojuegos y accesorios
                  para todos los jugadores.
                </p>

              </div>

            </article>


          </div>

        </div>

      </section>


      {/* PRODUCTOS DESTACADOS */}

      <section className="productos-destacados container py-5">

        <h2 className="text-center mb-2">
          Productos destacados
        </h2>

        <p className="text-center text-secondary mb-5">
          Conoce algunos de nuestros productos gamer.
        </p>


        <div className="row justify-content-center">

          {productosDestacados.map(
            (producto) => (

              <ProductoCard
                key={producto.id}
                producto={producto}
              />

            )
          )}

        </div>


        <div className="text-center mt-4">

          <NavLink
            to="/productos"
            className="btn btn-dark btn-lg"
          >
            Ver catálogo completo
          </NavLink>

        </div>

      </section>


      {/* VIDEO */}

      <section className="seccion-video py-5">

        <div className="container">

          <h2 className="text-center mb-4">
            Conoce el mundo de Game Zone
          </h2>


          <div className="ratio ratio-16x9 video-game-zone">

            <iframe
              src="https://www.youtube.com/embed/1mk6ODzVTXg"
              title="Video relacionado con videojuegos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
            </iframe>

          </div>

        </div>

      </section>


      {/* INVITACIÓN A REGISTRARSE */}

      <section className="registro-invitacion py-5">

        <div className="container text-center">

          <h2>
            Únete a Game Zone
          </h2>

          <p>
            Regístrate para comprar productos
            y revisar tu historial de pedidos.
          </p>


          <NavLink
            to="/registro"
            className="btn btn-warning btn-lg"
          >
            Crear una cuenta
          </NavLink>

        </div>

      </section>

    </main>

  );

}


export default Inicio;