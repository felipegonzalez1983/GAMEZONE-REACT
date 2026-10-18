
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Productos from "../src/pages/Productos";

// Simulamos los productos del catálogo
vi.mock("../src/context/ProductosContext", () => ({
  useProductos: () => ({
    productos: [
      {
        id: 1,
        nombre: "PlayStation 5",
        descripcion: "Consola Sony",
        categoria: "Consolas",
        plataforma: "PlayStation",
        precio: 599990,
        stock: 8,
        imagen: "/ps5.jpg"
      },
      {
        id: 2,
        nombre: "Teclado Gamer",
        descripcion: "Teclado mecanico",
        categoria: "Accesorios",
        plataforma: "PC",
        precio: 49990,
        stock: 10,
        imagen: "/teclado.jpg"
      }
    ]
  })
}));

// Simulamos las tarjetas para probar el catálogo
vi.mock("../src/components/ProductoCard", () => ({
  default: ({ producto }) => (
    <div data-testid="producto">
      {producto.nombre}
    </div>
  )
}));

describe("Pruebas de Productos", () => {

  it("muestra el titulo del catalogo", () => {
    render(<Productos />);

    expect(
      screen.getByText("Nuestros productos")
    ).toBeInTheDocument();
  });

  it("muestra los dos productos", () => {
    render(<Productos />);

    expect(
      screen.getAllByTestId("producto")
    ).toHaveLength(2);
  });

  it("busca un producto por nombre", () => {
    render(<Productos />);

    fireEvent.change(
      screen.getByPlaceholderText(
        "Ejemplo: PlayStation, Xbox o teclado"
      ),
      {
        target: { value: "PlayStation" }
      }
    );

    expect(
      screen.getByText("PlayStation 5")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Teclado Gamer")
    ).not.toBeInTheDocument();
  });

  it("filtra productos por categoria", () => {
    render(<Productos />);

    fireEvent.change(
      screen.getByLabelText("Categoría"),
      {
        target: { value: "Accesorios" }
      }
    );

    expect(
      screen.getByText("Teclado Gamer")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("PlayStation 5")
    ).not.toBeInTheDocument();
  });

});
