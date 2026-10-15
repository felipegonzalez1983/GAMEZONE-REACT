import {
  Routes,
  Route
} from "react-router-dom";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Historial from "./pages/Historial";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Blogs from "./pages/Blogs";
import DetalleBlog from "./pages/DetalleBlog";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

import AdminInicio from "./pages/AdminInicio";
import Admin from "./pages/Admin";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminNuevoUsuario from "./pages/AdminNuevoUsuario";


function App() {

  return (

    <Routes>


      {/* TIENDA */}

      <Route element={<Layout />}>

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/productos/:id"
          element={<DetalleProducto />}
        />

        <Route
          path="/carrito"
          element={<Carrito />}
        />

        <Route
          path="/historial"
          element={<Historial />}
        />

        <Route
          path="/nosotros"
          element={<Nosotros />}
        />

        <Route
          path="/contacto"
          element={<Contacto />}
        />

        <Route
          path="/blogs"
          element={<Blogs />}
        />

        <Route
          path="/blogs/:id"
          element={<DetalleBlog />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Registro />}
        />

      </Route>


      {/* ADMINISTRACIÓN */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        <Route
          index
          element={<AdminInicio />}
        />

        <Route
          path="productos"
          element={<Admin />}
        />

        <Route
          path="usuarios"
          element={<AdminUsuarios />}
        />

        <Route
          path="usuarios/nuevo"
          element={<AdminNuevoUsuario />}
        />

      </Route>


    </Routes>

  );

}


export default App;