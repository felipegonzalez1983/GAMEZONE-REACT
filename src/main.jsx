import {
  StrictMode
} from "react";

import {
  createRoot
} from "react-dom/client";

import {
  BrowserRouter
} from "react-router-dom";


import {
  UsuarioProvider
} from "./context/UsuarioContext";

import {
  ProductosProvider
} from "./context/ProductosContext";

import {
  CarritoProvider
} from "./context/CarritoContext";


import "./style.css";

import App from "./App.jsx";


createRoot(
  document.getElementById(
    "root"
  )
).render(

  <StrictMode>

    <BrowserRouter>

      <UsuarioProvider>

        <ProductosProvider>

          <CarritoProvider>

            <App />

          </CarritoProvider>

        </ProductosProvider>

      </UsuarioProvider>

    </BrowserRouter>

  </StrictMode>

);