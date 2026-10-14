import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { CarritoProvider } from "./context/CarritoContext";
import { UsuarioProvider } from "./context/UsuarioContext";

import "./style.css";
import App from "./App.jsx";


createRoot(
  document.getElementById("root")
).render(
  
  <StrictMode>

    <BrowserRouter>

      <UsuarioProvider>

        <CarritoProvider>

          <App />

        </CarritoProvider>

      </UsuarioProvider>

    </BrowserRouter>

  </StrictMode>

);