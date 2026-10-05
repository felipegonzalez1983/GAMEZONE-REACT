import { NavLink } from "react-router-dom";

function Inicio() {
  return (
    <>
      <section className="hero">
        <div>
          <h1>GAME ZONE</h1>

          <p>Tu mundo gamer comienza aquí</p>

          <NavLink to="/productos" className="btn btn-warning">
            Ver productos
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default Inicio;