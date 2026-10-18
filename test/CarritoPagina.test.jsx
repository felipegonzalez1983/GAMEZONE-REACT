
import {
  describe, it, expect, vi, beforeEach, afterEach
} from "vitest";

import {
  render, screen, fireEvent
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Carrito from "../src/pages/Carrito";

// Simulaciones para no modificar datos reales
const mocks = vi.hoisted(() => ({
  carrito: [],
  usuario: null,
  productos: [],
  totalCarrito: 0,
  eliminarDelCarrito: vi.fn(),
  cambiarCantidad: vi.fn(),
  vaciarCarrito: vi.fn(),
  descontarStock: vi.fn()
}));

vi.mock("../src/context/CarritoContext", () => ({
  useCarrito: () => ({
    carrito: mocks.carrito,
    totalCarrito: mocks.totalCarrito,
    eliminarDelCarrito: mocks.eliminarDelCarrito,
    cambiarCantidad: mocks.cambiarCantidad,
    vaciarCarrito: mocks.vaciarCarrito
  })
}));

vi.mock("../src/context/UsuarioContext", () => ({
  useUsuario: () => ({
    usuario: mocks.usuario
  })
}));

vi.mock("../src/context/ProductosContext", () => ({
  useProductos: () => ({
    productos: mocks.productos,
    descontarStock: mocks.descontarStock
  })
}));

function mostrarCarrito() {
  render(
    <MemoryRouter>
      <Carrito />
    </MemoryRouter>
  );
}

function prepararProducto() {
  const producto = {
    id: 1,
    nombre: "Control Gamer",
    precio: 15000,
    cantidad: 2,
    imagen: "/control.jpg"
  };

  mocks.carrito = [producto];
  mocks.totalCarrito = 30000;
  mocks.productos = [{
    ...producto,
    stock: 10
  }];
}

describe("Pruebas de la pagina Carrito", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    mocks.carrito = [];
    mocks.usuario = null;
    mocks.productos = [];
    mocks.totalCarrito = 0;

    vi.stubGlobal("alert", vi.fn());
    vi.stubGlobal("confirm", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // PRUEBA 1
  it("muestra el carrito vacio", () => {
    mostrarCarrito();

    expect(
      screen.getByText("Tu carrito está vacío.")
    ).toBeInTheDocument();
  });

  // PRUEBA 2
  it("muestra el producto agregado", () => {
    prepararProducto();
    mostrarCarrito();

    expect(
      screen.getByText("Control Gamer")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Cantidad")
    ).toHaveValue(2);
  });

  // PRUEBA 3
  it("permite cambiar la cantidad", () => {
    prepararProducto();
    mostrarCarrito();

    fireEvent.change(
      screen.getByLabelText("Cantidad"),
      { target: { value: "3" } }
    );

    expect(
      mocks.cambiarCantidad
    ).toHaveBeenCalledWith(1, "3");
  });

  // PRUEBA 4
  it("permite eliminar un producto", () => {
    prepararProducto();
    mostrarCarrito();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Eliminar"
      })
    );

    expect(
      mocks.eliminarDelCarrito
    ).toHaveBeenCalledWith(1);
  });

  // PRUEBA 5
  it("vacia el carrito al confirmar", () => {
    prepararProducto();
    mostrarCarrito();

    window.confirm.mockReturnValue(true);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Vaciar carrito"
      })
    );

    expect(
      mocks.vaciarCarrito
    ).toHaveBeenCalledOnce();
  });

  // PRUEBA 6
  it("no vacia el carrito si cancela", () => {
    prepararProducto();
    mostrarCarrito();

    window.confirm.mockReturnValue(false);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Vaciar carrito"
      })
    );

    expect(
      mocks.vaciarCarrito
    ).not.toHaveBeenCalled();
  });

  // PRUEBA 7
  it("avisa cuando intenta comprar sin productos", () => {
    mostrarCarrito();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Finalizar compra"
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Debes agregar productos al carrito."
    );
  });

  // PRUEBA 8
  it("exige iniciar sesion para comprar", () => {
    prepararProducto();
    mostrarCarrito();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Finalizar compra"
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Debes iniciar sesión para finalizar la compra."
    );
  });

  // PRUEBA 9
  it("rechaza comprar mas unidades que el stock", () => {
    prepararProducto();

    mocks.usuario = {
      nombre: "Cliente",
      correo: "cliente@gmail.com"
    };

    mocks.productos[0].stock = 1;

    mostrarCarrito();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Finalizar compra"
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Stock insuficiente para Control Gamer. Disponible: 1."
    );

    expect(
      mocks.descontarStock
    ).not.toHaveBeenCalled();
  });

  // PRUEBA 10
  it("realiza una compra confirmada", () => {
    prepararProducto();

    mocks.usuario = {
      nombre: "Cliente Prueba",
      correo: "cliente@gmail.com"
    };

    window.confirm = vi.fn(() => true);

    mostrarCarrito();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Finalizar compra"
      })
    );

    expect(
      mocks.descontarStock
    ).toHaveBeenCalledWith(mocks.carrito);

    expect(
      mocks.vaciarCarrito
    ).toHaveBeenCalledOnce();

    const compras = JSON.parse(
      localStorage.getItem("comprasGameZone")
    );

    expect(compras).toHaveLength(1);
    expect(compras[0].total).toBe(30000);
    expect(compras[0].correoUsuario)
      .toBe("cliente@gmail.com");
  });

});
