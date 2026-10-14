import { NavLink } from "react-router-dom";


function Blogs() {

  return (

    <main>

      {/* ENCABEZADO */}

      <section className="encabezado-pagina text-white text-center py-5">

        <div className="container">

          <h1>
            Blogs de Game Zone
          </h1>

          <p>
            Noticias, curiosidades y novedades del mundo gamer.
          </p>

        </div>

      </section>


      {/* BLOGS */}

      <section className="blogs py-5">

        <div className="container">

          <h2 className="text-center mb-2">
            Últimos artículos
          </h2>

          <p className="text-center text-secondary mb-5">
            Conoce nuestras noticias y curiosidades sobre videojuegos.
          </p>


          <div className="row g-4">

            {/* BLOG 1 */}

            <article className="col-lg-6">

              <div className="tarjeta-blog">

                <div className="blog-imagen">

                  <img
                    src="/ps5.jpg"
                    alt="PlayStation 5"
                  />

                </div>


                <div className="blog-contenido">

                  <h3>
                    ¿Por qué los videojuegos son tan populares?
                  </h3>

                  <p>
                    Los videojuegos se han convertido en una
                    de las principales formas de entretenimiento
                    y reúnen a millones de jugadores alrededor
                    del mundo.
                  </p>


                  <NavLink
                    to="/blogs/1"
                    className="btn btn-warning"
                  >
                    Leer más
                  </NavLink>

                </div>

              </div>

            </article>


            {/* BLOG 2 */}

            <article className="col-lg-6">

              <div className="tarjeta-blog">

                <div className="blog-imagen">

                  <img
                    src="/control.jpg"
                    alt="Control gamer"
                  />

                </div>


                <div className="blog-contenido">

                  <h3>
                    La importancia de los accesorios gamer
                  </h3>

                  <p>
                    Los accesorios gamer pueden mejorar
                    nuestra experiencia de juego y permitirnos
                    disfrutar mucho más de nuestros videojuegos
                    favoritos.
                  </p>


                  <NavLink
                    to="/blogs/2"
                    className="btn btn-warning"
                  >
                    Leer más
                  </NavLink>

                </div>

              </div>

            </article>

          </div>

        </div>

      </section>


      {/* INVITACIÓN */}

      <section className="registro-invitacion py-5">

        <div className="container text-center">

          <h2>
            Sigue descubriendo el mundo gamer
          </h2>

          <p>
            Revisa nuestro catálogo y encuentra tus videojuegos,
            consolas y accesorios favoritos.
          </p>


          <NavLink
            to="/productos"
            className="btn btn-warning btn-lg"
          >
            Ver productos
          </NavLink>

        </div>

      </section>

    </main>

  );

}


export default Blogs;