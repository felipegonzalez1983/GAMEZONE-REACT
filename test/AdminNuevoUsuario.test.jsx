
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
import AdminNuevoUsuario from "../src/pages/AdminNuevoUsuario";

// Simulamos el usuario y la navegación
const mocks = vi.hoisted(() => ({
  usuario: null,
  navegar: vi.fn()
}));

vi.mock("../src/context/UsuarioContext", () => ({
  useUsuario: () => ({
    usuario: mocks.usuario
  })
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal();

  return {
    ...original,
    useNavigate: () => mocks.navegar
  };
});

function mostrarPagina() {
  render(
    <MemoryRouter>
      <AdminNuevoUsuario />
    </MemoryRouter>
  );
}

function usarAdministrador() {
  mocks.usuario = {
    nombre: "Administrador",
    correo: "admin@gmail.com",
    rol: "Administrador"
  };
}

function guardarFormulario() {
  fireEvent.click(
    screen.getByRole("button", {
      name: "Guardar usuario"
    })
  );
}

function completarFormulario() {
  fireEvent.change(
    screen.getByLabelText("RUT"),
    { target: { value: "12.345.678-5" } }
  );

  fireEvent.change(
    screen.getByLabelText("Nombre completo"),
    { target: { value: "Pedro Gonzalez" } }
  );

  fireEvent.change(
    screen.getByLabelText("Correo electrónico"),
    { target: { value: "PEDRO@GMAIL.COM" } }
  );

  fireEvent.change(
    screen.getByLabelText("Contraseña"),
    { target: { value: "123456" } }
  );

  fireEvent.change(
    screen.getByLabelText("Rol"),
    { target: { value: "Cliente" } }
  );
}

describe("Pruebas de AdminNuevoUsuario Game Zone", () => {

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mocks.usuario = null;
    vi.stubGlobal("alert", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // PRUEBA 1
  it("rechaza el acceso sin iniciar sesion", () => {
    mostrarPagina();

    expect(
      screen.getByText("Acceso denegado")
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
      screen.getByText(
        "Esta sección es solo para administradores."
      )
    ).toBeInTheDocument();
  });

  // PRUEBA 3
  it("permite ver el formulario al administrador", () => {
    usarAdministrador();
    mostrarPagina();

    expect(
      screen.getByRole("heading", {
        name: "Nuevo usuario"
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("RUT")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Correo electrónico")
    ).toBeInTheDocument();
  });

  // PRUEBA 4
  it("valida que el RUT sea obligatorio", () => {
    usarAdministrador();
    mostrarPagina();

    guardarFormulario();

    expect(
      screen.getByText("El RUT es obligatorio.")
    ).toBeInTheDocument();
  });

  // PRUEBA 5
  it("valida que el nombre sea obligatorio", () => {
    usarAdministrador();
    mostrarPagina();

    guardarFormulario();

    expect(
      screen.getByText("El nombre es obligatorio.")
    ).toBeInTheDocument();
  });

  // PRUEBA 6
  it("rechaza un correo invalido", () => {
    usarAdministrador();
    mostrarPagina();

    fireEvent.change(
      screen.getByLabelText("Correo electrónico"),
      { target: { value: "correo-invalido" } }
    );

    guardarFormulario();

    expect(
      screen.getByText("Ingresa un correo válido.")
    ).toBeInTheDocument();
  });

  // PRUEBA 7
  it("rechaza una contraseña corta", () => {
    usarAdministrador();
    mostrarPagina();

    fireEvent.change(
      screen.getByLabelText("Contraseña"),
      { target: { value: "12" } }
    );

    guardarFormulario();

    expect(
      screen.getByText(
        "La contraseña debe tener entre 4 y 10 caracteres."
      )
    ).toBeInTheDocument();
  });

  // PRUEBA 8
  it("exige seleccionar un rol", () => {
    usarAdministrador();
    mostrarPagina();

    guardarFormulario();

    expect(
      screen.getByText("Selecciona un rol.")
    ).toBeInTheDocument();
  });

  // PRUEBA 9
  it("registra correctamente un usuario", () => {
    usarAdministrador();
    mostrarPagina();

    completarFormulario();
    guardarFormulario();

    const usuarios = JSON.parse(
      localStorage.getItem("usuariosGameZone")
    );

    expect(usuarios).toHaveLength(1);

    expect(usuarios[0]).toEqual({
      rut: "12.345.678-5",
      nombre: "Pedro Gonzalez",
      correo: "pedro@gmail.com",
      contrasena: "123456",
      rol: "Cliente"
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Usuario guardado correctamente."
    );

    expect(mocks.navegar).toHaveBeenCalledWith(
      "/admin/usuarios"
    );
  });

  // PRUEBA 10
  it("conserva los usuarios registrados anteriormente", () => {
    localStorage.setItem(
      "usuariosGameZone",
      JSON.stringify([
        {
          rut: "11.111.111-1",
          nombre: "Maria",
          correo: "maria@gmail.com",
          contrasena: "1234",
          rol: "Cliente"
        }
      ])
    );

    usarAdministrador();
    mostrarPagina();

    completarFormulario();
    guardarFormulario();

    const usuarios = JSON.parse(
      localStorage.getItem("usuariosGameZone")
    );

    expect(usuarios).toHaveLength(2);

    expect(usuarios[0].nombre).toBe("Maria");
    expect(usuarios[1].nombre).toBe("Pedro Gonzalez");
  });

});
