
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductoCard from "../src/components/ProductoCard";

// Simulamos el carrito para probar el componente
const agregarAlCarrito = vi.fn();

vi.mock("../src/context/CarritoContext", () => ({
  useCarrito: () => ({
    agregarAlCarrito
  })
}));

// Producto de ejemplo
const producto = {
  id: 1,
  nombre: "PlayStation 5",
  descripcion: "Consola de videojuegos",
  categoria: "Consolas",
  plataforma: "PlayStation",
  precio: 599990,
  stock: 8,
  imagen: "/ps5.jpg"
};

describe("Pruebas de ProductoCard", () => {

  it("muestra el nombre del producto", () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={producto} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("PlayStation 5")
    ).toBeInTheDocument();
  });

  it("muestra el stock del producto", () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={producto} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("8")
    ).toBeInTheDocument();
  });

  it("permite agregar un producto al carrito", () => {
    agregarAlCarrito.mockClear();

    render(
      <MemoryRouter>
        <ProductoCard producto={producto} />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Añadir al carrito"
      })
    );

    expect(agregarAlCarrito).toHaveBeenCalledWith(producto);
  });

});
