
import {
  describe,
  it,
  expect,
  vi,
  beforeEach
} from "vitest";

import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Admin from "../src/pages/Admin";

// Simulamos el usuario y las funciones de productos
const mocks = vi.hoisted(() => ({
  usuario: null,
  agregarProducto: vi.fn(),
  editarProducto: vi.fn(),
  eliminarProducto: vi.fn()
}));

// Simular el contexto de usuario
vi.mock("../src/context/UsuarioContext", () => ({
  useUsuario: () => ({
    usuario: mocks.usuario
  })
}));

// Simular el catálogo de productos
vi.mock("../src/context/ProductosContext", () => ({
  useProductos: () => ({
    productos: [],
    agregarProducto: mocks.agregarProducto,
    editarProducto: mocks.editarProducto,
    eliminarProducto: mocks.eliminarProducto
  })
}));

// Mostrar el componente de administración
function mostrarAdmin() {
  render(
    <MemoryRouter>
      <Admin />
    </MemoryRouter>
  );
}

// Iniciar como administrador de prueba
function usarAdministrador() {
  mocks.usuario = {
    nombre: "Administrador",
    correo: "admin@gmail.com",
    rol: "Administrador"
  };
}

// Abrir el formulario
function abrirFormulario() {
  fireEvent.click(
    screen.getByRole("button", {
      name: "+ Agregar producto"
    })
  );
}

// Guardar formulario
function guardarFormulario() {
  fireEvent.click(
    screen.getByRole("button", {
      name: "Agregar producto",
      exact: true
    })
  );
}

// Completar un producto de prueba
function completarProducto() {
  const datos = {
    Código: "TEST001",
    Nombre: "Control Gamer",
    Categoría: "Accesorios",
    Plataforma: "PC",
    Precio: "15000",
    Stock: "10",
    Imagen: "/control.jpg",
    Descripción: "Control para videojuegos"
  };

  Object.entries(datos).forEach(([campo, valor]) => {
    fireEvent.change(
      screen.getByLabelText(campo),
      { target: { value: valor } }
    );
  });
}

describe("Pruebas de Administracion Game Zone", () => {

  beforeEach(() => {
    mocks.usuario = null;
    vi.clearAllMocks();
    vi.stubGlobal("alert", vi.fn());
  });

  // PRUEBA 1
  it("solicita iniciar sesion si no hay usuario", () => {
    mostrarAdmin();

    expect(
      screen.getByText(
        /Debes iniciar sesión como administrador/
      )
    ).toBeInTheDocument();
  });

  // PRUEBA 2
  it("rechaza el acceso de un cliente", () => {
    mocks.usuario = {
      nombre: "Cliente",
      rol: "Cliente"
    };

    mostrarAdmin();

    expect(
      screen.getByText("Acceso denegado")
    ).toBeInTheDocument();
  });

  // PRUEBA 3
  it("permite ver el panel al administrador", () => {
    usarAdministrador();
    mostrarAdmin();

    expect(
      screen.getByRole("heading", {
        name: "Panel de administración"
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Gestión de productos de Game Zone.")
    ).toBeInTheDocument();
  });

  // PRUEBA 4
  it("abre el formulario para agregar productos", () => {
    usarAdministrador();
    mostrarAdmin();

    abrirFormulario();

    expect(
      screen.getByRole("heading", {
        name: "Agregar producto"
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Código")
    ).toBeInTheDocument();
  });

  // PRUEBA 5
  it("valida que el codigo sea obligatorio", () => {
    usarAdministrador();
    mostrarAdmin();

    abrirFormulario();
    guardarFormulario();

    expect(
      screen.getByText("El código es obligatorio.")
    ).toBeInTheDocument();

    expect(
      mocks.agregarProducto
    ).not.toHaveBeenCalled();
  });

  // PRUEBA 6
  it("rechaza un precio invalido", () => {
    usarAdministrador();
    mostrarAdmin();

    abrirFormulario();

    fireEvent.change(
      screen.getByLabelText("Precio"),
      { target: { value: "0" } }
    );

    guardarFormulario();

    expect(
      screen.getByText("Ingresa un precio válido.")
    ).toBeInTheDocument();
  });

  // PRUEBA 7
  it("permite agregar un producto correcto", () => {
    usarAdministrador();
    mostrarAdmin();

    abrirFormulario();
    completarProducto();
    guardarFormulario();

    expect(
      mocks.agregarProducto
    ).toHaveBeenCalledWith({
      codigo: "TEST001",
      nombre: "Control Gamer",
      categoria: "Accesorios",
      plataforma: "PC",
      precio: 15000,
      stock: 10,
      imagen: "/control.jpg",
      descripcion: "Control para videojuegos"
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Producto agregado correctamente."
    );
  });

});
