
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
import Admin from "../src/pages/Admin";

// Datos simulados para las pruebas
const mocks = vi.hoisted(() => ({
  usuario: null,
  productos: [],
  agregarProducto: vi.fn(),
  editarProducto: vi.fn(),
  eliminarProducto: vi.fn()
}));

// Simulamos el usuario
vi.mock("../src/context/UsuarioContext", () => ({
  useUsuario: () => ({
    usuario: mocks.usuario
  })
}));

// Simulamos los productos
vi.mock("../src/context/ProductosContext", () => ({
  useProductos: () => ({
    productos: mocks.productos,
    agregarProducto: mocks.agregarProducto,
    editarProducto: mocks.editarProducto,
    eliminarProducto: mocks.eliminarProducto
  })
}));

// Mostrar el panel de administración
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

// Abrir formulario de productos
function abrirFormulario() {
  fireEvent.click(
    screen.getByRole("button", {
      name: "+ Agregar producto"
    })
  );
}

// Guardar un producto nuevo
function guardarFormulario() {
  fireEvent.click(
    screen.getByRole("button", {
      name: "Agregar producto",
      exact: true
    })
  );
}

// Completar los datos del producto
function completarProducto() {
  const datos = {
    Código: "TEST002",
    Nombre: "Control Gamer Pro",
    Categoría: "Accesorios",
    Plataforma: "PC",
    Precio: "20000",
    Stock: "15",
    Imagen: "/control-pro.jpg",
    Descripción: "Control gamer para PC"
  };

  Object.entries(datos).forEach(([campo, valor]) => {
    fireEvent.change(
      screen.getByLabelText(campo),
      { target: { value: valor } }
    );
  });
}

describe("Pruebas del panel de administracion Game Zone", () => {

  beforeEach(() => {
    vi.clearAllMocks();

    mocks.usuario = null;

    mocks.productos = [
      {
        id: 1,
        codigo: "TEST001",
        nombre: "Control Gamer",
        categoria: "Accesorios",
        plataforma: "PC",
        precio: 15000,
        stock: 10,
        imagen: "/control.jpg",
        descripcion: "Control para videojuegos"
      }
    ];

    vi.stubGlobal("alert", vi.fn());
    vi.stubGlobal("confirm", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
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
      codigo: "TEST002",
      nombre: "Control Gamer Pro",
      categoria: "Accesorios",
      plataforma: "PC",
      precio: 20000,
      stock: 15,
      imagen: "/control-pro.jpg",
      descripcion: "Control gamer para PC"
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Producto agregado correctamente."
    );
  });

  // PRUEBA 8
  it("permite editar un producto", () => {
    usarAdministrador();
    mostrarAdmin();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Editar"
      })
    );

    fireEvent.change(
      screen.getByLabelText("Nombre"),
      {
        target: {
          value: "Control Gamer Editado"
        }
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Guardar cambios"
      })
    );

    expect(
      mocks.editarProducto
    ).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        nombre: "Control Gamer Editado",
        precio: 15000,
        stock: 10
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Producto actualizado correctamente."
    );
  });

  // PRUEBA 9
  it("elimina un producto cuando confirma", () => {
    usarAdministrador();
    mostrarAdmin();

    window.confirm.mockReturnValue(true);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Eliminar"
      })
    );

    expect(
      mocks.eliminarProducto
    ).toHaveBeenCalledWith(1);

    expect(window.alert).toHaveBeenCalledWith(
      "Producto eliminado correctamente."
    );
  });

  // PRUEBA 10
  it("no elimina un producto si cancela", () => {
    usarAdministrador();
    mostrarAdmin();

    window.confirm.mockReturnValue(false);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Eliminar"
      })
    );

    expect(
      mocks.eliminarProducto
    ).not.toHaveBeenCalled();
  });

});
