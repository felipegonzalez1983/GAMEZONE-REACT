
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach
} from "vitest";

import {
  render,
  screen,
  fireEvent,
  within
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import AdminUsuarios from "../src/pages/AdminUsuarios";

// Simular el usuario que inicia sesión
const mocks = vi.hoisted(() => ({
  usuario: null
}));

vi.mock("../src/context/UsuarioContext", () => ({
  useUsuario: () => ({
    usuario: mocks.usuario
  })
}));

// Mostrar la página
function mostrarPagina() {
  render(
    <MemoryRouter>
      <AdminUsuarios />
    </MemoryRouter>
  );
}

// Simular acceso de administrador
function usarAdministrador() {
  mocks.usuario = {
    nombre: "Administrador",
    correo: "admin@gmail.com",
    rol: "Administrador"
  };
}

// Crear usuarios de prueba
function guardarUsuarios() {
  const usuarios = [
    {
      rut: "12.345.678-5",
      nombre: "Pedro",
      apellidos: "Gonzalez",
      correo: "pedro@gmail.com",
      rol: "Cliente"
    },
    {
      rut: "11.222.333-4",
      nombre: "Maria",
      apellidos: "Lopez",
      correo: "maria@gmail.com",
      rol: "Cliente"
    }
  ];

  localStorage.setItem(
    "usuariosGameZone",
    JSON.stringify(usuarios)
  );
}

describe("Pruebas de AdminUsuarios Game Zone", () => {

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mocks.usuario = null;
    vi.stubGlobal("confirm", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // PRUEBA 1
  it("solicita iniciar sesion sin usuario", () => {
    mostrarPagina();

    expect(
      screen.getByText(
        "Debes iniciar sesión como administrador."
      )
    ).toBeInTheDocument();
  });

  // PRUEBA 2
  it("rechaza el acceso de un cliente", () => {
    mocks.usuario = {
      nombre: "Cliente",
      rol: "Cliente"
    };

    mostrarPagina();

    expect(
      screen.getByText("Acceso denegado")
    ).toBeInTheDocument();
  });

  // PRUEBA 3
  it("permite entrar al administrador", () => {
    usarAdministrador();
    mostrarPagina();

    expect(
      screen.getByRole("heading", {
        name: "Administrar usuarios"
      })
    ).toBeInTheDocument();
  });

  // PRUEBA 4
  it("muestra el administrador principal", () => {
    usarAdministrador();
    mostrarPagina();

    expect(
      screen.getByText("admin@gmail.com")
    ).toBeInTheDocument();
  });

  // PRUEBA 5
  it("muestra mensaje cuando no hay clientes", () => {
    usarAdministrador();
    mostrarPagina();

    expect(
      screen.getByText(
        "No hay usuarios registrados."
      )
    ).toBeInTheDocument();
  });

  // PRUEBA 6
  it("muestra los clientes registrados", () => {
    guardarUsuarios();
    usarAdministrador();
    mostrarPagina();

    expect(
      screen.getByText("Pedro Gonzalez")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Maria Lopez")
    ).toBeInTheDocument();
  });

  // PRUEBA 7
  it("muestra el correo del cliente", () => {
    guardarUsuarios();
    usarAdministrador();
    mostrarPagina();

    expect(
      screen.getByText("pedro@gmail.com")
    ).toBeInTheDocument();
  });

  // PRUEBA 8
  it("permite eliminar un cliente al confirmar", () => {
    guardarUsuarios();
    usarAdministrador();
    mostrarPagina();

    window.confirm.mockReturnValue(true);

    const filaPedro = screen
      .getByText("Pedro Gonzalez")
      .closest("tr");

    fireEvent.click(
      within(filaPedro).getByRole("button", {
        name: "Eliminar"
      })
    );

    expect(
      screen.queryByText("Pedro Gonzalez")
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Maria Lopez")
    ).toBeInTheDocument();

    const guardados = JSON.parse(
      localStorage.getItem("usuariosGameZone")
    );

    expect(guardados).toHaveLength(1);
  });

  // PRUEBA 9
  it("no elimina un cliente si cancela", () => {
    guardarUsuarios();
    usarAdministrador();
    mostrarPagina();

    window.confirm.mockReturnValue(false);

    const filaPedro = screen
      .getByText("Pedro Gonzalez")
      .closest("tr");

    fireEvent.click(
      within(filaPedro).getByRole("button", {
        name: "Eliminar"
      })
    );

    expect(
      screen.getByText("Pedro Gonzalez")
    ).toBeInTheDocument();

    const guardados = JSON.parse(
      localStorage.getItem("usuariosGameZone")
    );

    expect(guardados).toHaveLength(2);
  });

  // PRUEBA 10
  it("tiene enlace para agregar usuario", () => {
    usarAdministrador();
    mostrarPagina();

    expect(
      screen.getByRole("link", {
        name: "Nuevo usuario"
      })
    ).toHaveAttribute(
      "href",
      "/admin/usuarios/nuevo"
    );
  });

});
