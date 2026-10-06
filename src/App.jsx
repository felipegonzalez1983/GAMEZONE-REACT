import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import DetalleProducto from "./pages/DetalleProducto";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;