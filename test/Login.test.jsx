
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
  fireEvent
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Login from "../src/pages/Login";

// Simulamos el inicio de sesión
const mocks = vi.hoisted(() => ({
  iniciarSesion: vi.fn(),
  navigate: vi.fn()
}));

// Simulamos el contexto de usuario
vi.mock("../src/context/UsuarioContext", () => ({
  useUsuario: () => ({
    iniciarSesion: mocks.iniciarSesion
  })
}));

// Simulamos la navegación
vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal();

  return {
    ...original,
    useNavigate: () => mocks.navigate
  };
});

// Función para mostrar el Login
function mostrarLogin() {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
}

// Función para escribir en el formulario
function llenarFormulario(correo, contrasena) {
  fireEvent.change(
    screen.getByLabelText("Correo electrónico"),
    {
      target: { value: correo }
    }
  );

  fireEvent.change(
    screen.getByLabelText("Contraseña"),
    {
      target: { value: contrasena }
    }
  );
}

// Función para presionar Ingresar
function enviarFormulario() {
  fireEvent.click(
    screen.getByRole("button", {
      name: "Ingresar"
    })
  );
}

describe("Pruebas del Login Game Zone", () => {

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.stubGlobal("alert", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // PRUEBA 1
  it("muestra los campos del formulario", () => {
    mostrarLogin();

    expect(
      screen.getByLabelText("Correo electrónico")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Contraseña")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Ingresar"
      })
    ).toBeInTheDocument();
  });

  // PRUEBA 2
  it("permite escribir correo y contraseña", () => {
    mostrarLogin();

    llenarFormulario("cliente@gmail.com", "12345");

    expect(
      screen.getByLabelText("Correo electrónico")
    ).toHaveValue("cliente@gmail.com");

    expect(
      screen.getByLabelText("Contraseña")
    ).toHaveValue("12345");
  });

  // PRUEBA 3
  it("rechaza un correo incorrecto", () => {
    mostrarLogin();

    llenarFormulario("correo-invalido", "12345");
    enviarFormulario();

    expect(
      screen.getByText("Ingresa un correo Duoc o Gmail.")
    ).toBeInTheDocument();

    expect(mocks.iniciarSesion).not.toHaveBeenCalled();
  });

  // PRUEBA 4
  it("rechaza contraseñas muy cortas", () => {
    mostrarLogin();

    llenarFormulario("cliente@gmail.com", "12");
    enviarFormulario();

    expect(
      screen.getByText(
        "La contraseña debe tener entre 4 y 10 caracteres."
      )
    ).toBeInTheDocument();

    expect(mocks.iniciarSesion).not.toHaveBeenCalled();
  });

  // PRUEBA 5
  it("muestra error con datos incorrectos", () => {
    mostrarLogin();

    llenarFormulario("cliente@gmail.com", "12345");
    enviarFormulario();

    expect(
      screen.getByText("Correo o contraseña incorrectos.")
    ).toBeInTheDocument();

    expect(mocks.iniciarSesion).not.toHaveBeenCalled();
  });

  // PRUEBA 6
  it("permite ingresar al administrador", () => {
    mostrarLogin();

    llenarFormulario("admin@gmail.com", "1234");
    enviarFormulario();

    expect(mocks.iniciarSesion).toHaveBeenCalledWith({
      correo: "admin@gmail.com",
      nombre: "Administrador",
      rol: "Administrador"
    });

    expect(mocks.navigate).toHaveBeenCalledWith(
      "/admin"
    );
  });

  // PRUEBA 7
  it("permite ingresar a un cliente registrado", () => {

    // Creamos un cliente de prueba
    localStorage.setItem(
      "usuariosGameZone",
      JSON.stringify([
        {
          correo: "cliente@gmail.com",
          contrasena: "12345",
          nombre: "Cliente Prueba",
          rol: "Cliente"
        }
      ])
    );

    mostrarLogin();

    llenarFormulario("cliente@gmail.com", "12345");
    enviarFormulario();

    expect(mocks.iniciarSesion).toHaveBeenCalledWith({
      correo: "cliente@gmail.com",
      nombre: "Cliente Prueba",
      rol: "Cliente"
    });

    expect(mocks.navigate).toHaveBeenCalledWith("/");
  });

});
