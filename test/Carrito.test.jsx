
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

// Simulamos el catálogo de productos
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

// Componente para probar el carrito real
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

      <p data-testid="cantidad">
        {cantidadCarrito}
      </p>

      <p data-testid="total">
        {totalCarrito}
      </p>

      <p data-testid="productos">
        {carrito.length}
      </p>

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

      <button onClick={() => agregarAlCarrito(producto, 9)}>
        Superar stock
      </button>

      <button onClick={() => agregarAlCarrito({
        ...producto,
        id: 999
      })}>
        Producto inexistente
      </button>

      <button onClick={() => cambiarCantidad(1, 0)}>
        Cantidad cero
      </button>

    </div>
  );
}

// Función para renderizar el carrito
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

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // PRUEBA 1
  it("inicia con el carrito vacio", () => {
    mostrarCarrito();

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("0");
  });

  // PRUEBA 2
  it("agrega un producto al carrito", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("1");
  });

  // PRUEBA 3
  it("calcula el total del carrito", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));

    expect(
      screen.getByTestId("total")
    ).toHaveTextContent("599990");
  });

  // PRUEBA 4
  it("permite cambiar la cantidad", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Cambiar cantidad"));

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("3");
  });

  // PRUEBA 5
  it("permite eliminar un producto", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Eliminar"));

    expect(
      screen.getByTestId("productos")
    ).toHaveTextContent("0");
  });

  // PRUEBA 6
  it("permite vaciar el carrito", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Vaciar"));

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("0");
  });

  // PRUEBA 7
  it("suma unidades del mismo producto", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Agregar"));

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("2");

    expect(
      screen.getByTestId("productos")
    ).toHaveTextContent("1");
  });

  // PRUEBA 8
  it("no permite superar el stock disponible", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Superar stock"));

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("0");

    expect(window.alert).toHaveBeenCalledWith(
      "Solo hay 8 unidades disponibles."
    );
  });

  // PRUEBA 9
  it("rechaza productos inexistentes", () => {
    mostrarCarrito();

    fireEvent.click(
      screen.getByText("Producto inexistente")
    );

    expect(
      screen.getByTestId("cantidad")
    ).toHaveTextContent("0");

    expect(window.alert).toHaveBeenCalledWith(
      "Este producto ya no está disponible."
    );
  });

  // PRUEBA 10
  it("elimina el producto si la cantidad es cero", () => {
    mostrarCarrito();

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Cantidad cero"));

    expect(
      screen.getByTestId("productos")
    ).toHaveTextContent("0");
  });

});
