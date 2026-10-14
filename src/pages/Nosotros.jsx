function Nosotros() {

  return (

    <main>

      {/* ENCABEZADO */}

      <section className="encabezado-pagina text-white text-center py-5">

        <div className="container">

          <h1>
            Nosotros
          </h1>

          <p className="lead mb-0">
            Conoce más sobre Game Zone
          </p>

        </div>

      </section>


      {/* INFORMACIÓN DE GAME ZONE */}

      <section className="py-5">

        <div className="container">

          <div className="row align-items-center g-5">


            {/* TEXTO */}

            <div className="col-lg-6">

              <h2 className="fw-bold mb-4">
                ¿Qué es Game Zone?
              </h2>

              <p>
                Game Zone es una tienda online dedicada
                al mundo de los videojuegos, ofreciendo
                consolas, accesorios y productos para
                todos los amantes de los videojuegos.
              </p>

              <p>
                Nuestro objetivo es entregar una
                experiencia de compra sencilla,
                cómoda y accesible, donde nuestros
                clientes puedan encontrar diferentes
                productos gamer en un solo lugar.
              </p>

              <p>
                Buscamos crear una comunidad donde los
                videojuegos no solo sean una forma de
                entretenimiento, sino también una manera
                de compartir experiencias y disfrutar
                de nuestros títulos favoritos.
              </p>

            </div>


            {/* IMAGEN */}

            <div className="col-lg-6">

              <img
                src="/fondo-game-zone.jpeg"
                alt="Videojuegos y productos de Game Zone"
                className="img-fluid rounded shadow"
              />

            </div>


          </div>

        </div>

      </section>


      {/* MISIÓN Y VISIÓN */}

      <section className="beneficios py-5">

        <div className="container">

          <div className="row g-4">


            {/* MISIÓN */}

            <div className="col-md-6">

              <article className="beneficio">

                <div className="beneficio-icono">
                  🎯
                </div>

                <h2 className="h3">
                  Nuestra misión
                </h2>

                <p>
                  Ofrecer productos gamer de manera
                  sencilla y accesible, brindando una
                  experiencia agradable a nuestros
                  clientes y facilitando el acceso a
                  consolas, videojuegos y accesorios.
                </p>

              </article>

            </div>


            {/* VISIÓN */}

            <div className="col-md-6">

              <article className="beneficio">

                <div className="beneficio-icono">
                  🚀
                </div>

                <h2 className="h3">
                  Nuestra visión
                </h2>

                <p>
                  Convertirnos en una tienda reconocida
                  dentro de la comunidad gamer,
                  destacándonos por nuestra variedad
                  de productos, atención y experiencia
                  de compra.
                </p>

              </article>

            </div>


          </div>

        </div>

      </section>


      {/* EQUIPO */}

      <section className="py-5">

        <div className="container">

          <h2 className="text-center fw-bold mb-3">
            Nuestro equipo
          </h2>

          <p className="text-center text-secondary mb-5">
            Conoce a los desarrolladores de Game Zone.
          </p>


          <div className="row justify-content-center g-4">


            {/* DESARROLLADORES */}

            <div className="col-md-6 col-lg-4">

              <article className="card text-center">

                <div className="card-body p-4">

                  <div className="desarrollador-icono">
                    👨‍💻
                  </div>

                  <h3 className="card-title">
                    Vicente V. y Felipe G.
                  </h3>

                  <p className="text-secondary">
                    Desarrollo Frontend
                  </p>

                  <p className="card-text">
                    Encargados del desarrollo de la
                    interfaz y funcionalidades de
                    la tienda web.
                  </p>

                </div>

              </article>

            </div>


            <div className="col-md-6 col-lg-4">

              <article className="card text-center">

                <div className="card-body p-4">

                  <div className="desarrollador-icono">
                    👨‍💻
                  </div>

                  <h3 className="card-title">
                    Equipo Game Zone
                  </h3>

                  <p className="text-secondary">
                    Desarrollo y diseño
                  </p>

                  <p className="card-text">
                    Participación en el diseño,
                    organización y desarrollo
                    del proyecto.
                  </p>

                </div>

              </article>

            </div>


          </div>

        </div>

      </section>

    </main>

  );

}


export default Nosotros;