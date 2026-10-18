
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import {
  CarritoProvider,
  useCarrito
} from "../src/context/CarritoContext";

// Producto de prueba
const producto = {
  id: 1,
  nombre: "PlayStation 5",
  precio: 599990,
  stock: 8,
  imagen: "/ps5.jpg"
};

// Simulamos el catálogo, no el carrito
vi.mock("../src/context/ProductosContext", () => ({
  useProductos: () => ({
    productos: [
      {
        id: 1,
        nombre: "PlayStation 5",
        precio: 599990,
        stock: 8,
        imagen: "/ps5.jpg"
      }
    ]
  })
}));

// Componente auxiliar para probar el carrito real
function CarritoPrueba() {
  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    cantidadCarrito,
    totalCarrito
  } = useCarrito();

  return (
    <div>
      <p data-testid="cantidad">{cantidadCarrito}</p>
      <p data-testid="total">{totalCarrito}</p>
      <p data-testid="productos">{carrito.length}</p>

      <button onClick={() => agregarAlCarrito(producto)}>
        Agregar
      </button>

      <button onClick={() => eliminarDelCarrito(1)}>
        Eliminar
      </button>

      <button onClick={() => cambiarCantidad(1, 3)}>
        Cambiar cantidad
      </button>

      <button onClick={vaciarCarrito}>
        Vaciar
      </button>
    </div>
  );
}

function mostrarCarrito() {
  render(
    <CarritoProvider>
      <CarritoPrueba />
    </CarritoProvider>
  );
}

describe("Pruebas del carrito Game Zone", () => {

  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal("alert", vi.fn());
  });

  it("inicia con el carrito vacio", () => {
    mostrarCarrito();

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("0");
  });

  it("agrega un producto al carrito", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("1");
  });

  it("calcula el total del carrito", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));

    expect(
      screen.getByTestId("total")
    ).toHaveTextContent("599990");
  });

  it("permite cambiar la cantidad", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Cambiar cantidad"));

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("3");
  });

  it("permite eliminar un producto", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Eliminar"));

    expect(
      screen.getByTestId("productos")
    ).toHaveTextContent("0");
  });

  it("permite vaciar el carrito", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Vaciar"));

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("0");
  });

});
