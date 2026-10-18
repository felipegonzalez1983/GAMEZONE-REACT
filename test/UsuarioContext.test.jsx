
import {
  describe,
  it,
  expect,
  beforeEach
} from "vitest";

import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";

import {
  UsuarioProvider,
  useUsuario
} from "../src/context/UsuarioContext";

// Componente auxiliar para probar el contexto
function UsuarioPrueba() {

  const {
    usuario,
    iniciarSesion,
    cerrarSesion
  } = useUsuario();

  function ingresar() {
    iniciarSesion({
      correo: "cliente@gmail.com",
      nombre: "Cliente Prueba",
      rol: "Cliente"
    });
  }

  function ingresarAdmin() {
    iniciarSesion({
      correo: "admin@gmail.com",
      nombre: "Administrador",
      rol: "Administrador"
    });
  }

  return (
    <div>
      <p data-testid="nombre">
        {usuario?.nombre || "Sin usuario"}
      </p>

      <p data-testid="correo">
        {usuario?.correo || "Sin correo"}
      </p>

      <p data-testid="rol">
        {usuario?.rol || "Sin rol"}
      </p>

      <button onClick={ingresar}>
        Iniciar sesión
      </button>

      <button onClick={ingresarAdmin}>
        Ingresar administrador
      </button>

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  );
}

function mostrarUsuario() {
  render(
    <UsuarioProvider>
      <UsuarioPrueba />
    </UsuarioProvider>
  );
}

describe("Pruebas de UsuarioContext", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  // PRUEBA 1
  it("inicia sin usuario", () => {
    mostrarUsuario();

    expect(
      screen.getByTestId("nombre")
    ).toHaveTextContent("Sin usuario");
  });

  // PRUEBA 2
  it("permite iniciar sesión", () => {
    mostrarUsuario();

    fireEvent.click(
      screen.getByText("Iniciar sesión")
    );

    expect(
      screen.getByTestId("nombre")
    ).toHaveTextContent("Cliente Prueba");
  });

  // PRUEBA 3
  it("guarda el correo en localStorage", () => {
    mostrarUsuario();

    fireEvent.click(
      screen.getByText("Iniciar sesión")
    );

    expect(
      localStorage.getItem("usuarioGameZone")
    ).toBe("cliente@gmail.com");
  });

  // PRUEBA 4
  it("reconoce al administrador", () => {
    mostrarUsuario();

    fireEvent.click(
      screen.getByText("Ingresar administrador")
    );

    expect(
      screen.getByTestId("rol")
    ).toHaveTextContent("Administrador");
  });

  // PRUEBA 5
  it("permite cerrar sesión", () => {
    mostrarUsuario();

    fireEvent.click(
      screen.getByText("Iniciar sesión")
    );

    fireEvent.click(
      screen.getByText("Cerrar sesión")
    );

    expect(
      screen.getByTestId("nombre")
    ).toHaveTextContent("Sin usuario");
  });

  // PRUEBA 6
  it("elimina los datos al cerrar sesión", () => {
    mostrarUsuario();

    fireEvent.click(
      screen.getByText("Iniciar sesión")
    );

    fireEvent.click(
      screen.getByText("Cerrar sesión")
    );

    expect(
      localStorage.getItem("usuarioGameZone")
    ).toBeNull();

    expect(
      localStorage.getItem("rolGameZone")
    ).toBeNull();
  });

  // PRUEBA 7
  it("recupera una sesión guardada", () => {

    localStorage.setItem(
      "usuarioGameZone",
      "cliente@gmail.com"
    );

    localStorage.setItem(
      "nombreUsuarioGameZone",
      "Cliente Guardado"
    );

    localStorage.setItem(
      "rolGameZone",
      "Cliente"
    );

    mostrarUsuario();

    expect(
      screen.getByTestId("nombre")
    ).toHaveTextContent("Cliente Guardado");

    expect(
      screen.getByTestId("rol")
    ).toHaveTextContent("Cliente");
  });

});
