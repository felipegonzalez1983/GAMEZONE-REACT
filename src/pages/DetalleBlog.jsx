import {
  NavLink,
  useParams
} from "react-router-dom";


const blogs = [
  {
    id: 1,

    titulo:
      "¿Por qué los videojuegos son tan populares?",

    subtitulo:
      "Descubre por qué los videojuegos se han convertido en una de las formas de entretenimiento más importantes.",

    imagen:
      "/ps5.jpg",

    alt:
      "PlayStation 5",

    parrafos: [
      "Durante los últimos años, los videojuegos han experimentado un enorme crecimiento y se han convertido en una de las principales formas de entretenimiento para personas de diferentes edades.",

      "Una de las principales razones de su popularidad es la posibilidad de vivir diferentes experiencias a través de un videojuego. Los jugadores pueden explorar mundos virtuales, participar en historias, competir con otras personas y superar diferentes desafíos.",

      "Además, actualmente los videojuegos permiten jugar con amigos y familiares sin importar la distancia. Los sistemas online han permitido crear comunidades de jugadores que comparten intereses, estrategias y experiencias.",

      "Otro factor importante es la evolución tecnológica. Las nuevas consolas y computadores permiten disfrutar de gráficos cada vez más detallados, experiencias inmersivas y sistemas de juego más completos.",

      "En Game Zone creemos que los videojuegos no son solamente una forma de entretenimiento, sino también una manera de compartir, competir y disfrutar de nuevas experiencias."
    ]
  },

  {
    id: 2,

    titulo:
      "La importancia de los accesorios gamer",

    subtitulo:
      "Descubre cómo los accesorios pueden mejorar tu experiencia de juego.",

    imagen:
      "/control.jpg",

    alt:
      "Control gamer",

    parrafos: [
      "Cuando pensamos en videojuegos, normalmente imaginamos la consola, el computador o nuestro juego favorito. Sin embargo, los accesorios también cumplen un papel importante dentro de la experiencia de juego.",

      "Un buen control puede entregar una mayor precisión y comodidad durante las partidas. Lo mismo ocurre con otros accesorios como teclados, mouse y audífonos, que pueden ayudar a mejorar la interacción del jugador.",

      "Los audífonos, por ejemplo, permiten escuchar con mayor claridad los sonidos del videojuego. Esto puede hacer que una partida sea mucho más inmersiva y entretenida.",

      "Otro aspecto importante es la comodidad. Cuando una persona pasa varias horas jugando, contar con accesorios adecuados puede hacer que la experiencia sea mucho más cómoda y agradable.",

      "En Game Zone sabemos que cada jugador tiene necesidades diferentes. Por eso, elegir correctamente los accesorios puede ser tan importante como elegir el videojuego o la consola."
    ]
  }
];


function DetalleBlog() {

  const { id } = useParams();


  const blog = blogs.find(
    (blog) =>
      blog.id === Number(id)
  );


  if (!blog) {

    return (

      <main className="container py-5 text-center">

        <h1>
          Blog no encontrado
        </h1>

        <p>
          El artículo que buscas no existe.
        </p>


        <NavLink
          to="/blogs"
          className="btn btn-warning"
        >
          Volver a los blogs
        </NavLink>

      </main>

    );

  }


  return (

    <main>

      {/* ENCABEZADO */}

      <section className="encabezado-pagina text-white text-center py-5">

        <div className="container">

          <h1>
            {blog.titulo}
          </h1>

          <p>
            {blog.subtitulo}
          </p>

        </div>

      </section>


      {/* DETALLE */}

      <section className="detalle-blog py-5">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-lg-9">

              <article className="tarjeta-detalle-blog">


                <img
                  src={blog.imagen}
                  alt={blog.alt}
                  className="imagen-detalle-blog"
                />


                <div className="contenido-detalle-blog">

                  <h2>
                    {blog.titulo}
                  </h2>


                  {blog.parrafos.map(
                    (parrafo, indice) => (

                      <p key={indice}>
                        {parrafo}
                      </p>

                    )
                  )}


                  <div className="mt-4">

                    <NavLink
                      to="/blogs"
                      className="btn btn-warning me-2"
                    >
                      ← Volver a los blogs
                    </NavLink>


                    <NavLink
                      to="/productos"
                      className="btn btn-dark"
                    >
                      Ver productos
                    </NavLink>

                  </div>

                </div>

              </article>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}


export default DetalleBlog;