
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import {
  ProductosProvider,
  useProductos
} from "../src/context/ProductosContext";

// Componente auxiliar para probar el contexto real
function ProductosPrueba() {
  const {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    descontarStock
  } = useProductos();

  const productoPrueba = {
    codigo: "TEST001",
    nombre: "Producto de prueba",
    categoria: "Accesorios",
    plataforma: "PC",
    precio: 15000,
    stock: 10,
    imagen: "/teclado.jpg",
    descripcion: "Producto para testing"
  };

  function agregar() {
    agregarProducto(productoPrueba);
  }

  function editar() {
    editarProducto(1, {
      ...productos[0],
      nombre: "Producto editado",
      precio: 20000,
      stock: 15
    });
  }

  function eliminar() {
    eliminarProducto(1);
  }

  function descontar() {
    descontarStock([
      { id: 1, cantidad: 2 }
    ]);
  }

  return (
    <div>
      <p data-testid="cantidad">{productos.length}</p>

      <p data-testid="primer-nombre">
        {productos[0]?.nombre || "Sin productos"}
      </p>

      <p data-testid="primer-stock">
        {productos[0]?.stock ?? 0}
      </p>

      <button onClick={agregar}>Agregar</button>
      <button onClick={editar}>Editar</button>
      <button onClick={eliminar}>Eliminar</button>
      <button onClick={descontar}>Descontar</button>
    </div>
  );
}

function mostrarProductos() {
  render(
    <ProductosProvider>
      <ProductosPrueba />
    </ProductosProvider>
  );
}

describe("Pruebas de ProductosContext Game Zone", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("carga los productos iniciales", () => {
    mostrarProductos();

    expect(
      Number(screen.getByTestId("cantidad").textContent)
    ).toBeGreaterThan(0);
  });

  it("agrega un producto nuevo", () => {
    mostrarProductos();

    const cantidadInicial = Number(
      screen.getByTestId("cantidad").textContent
    );

    fireEvent.click(screen.getByText("Agregar"));

    expect(
      Number(screen.getByTestId("cantidad").textContent)
    ).toBe(cantidadInicial + 1);
  });

  it("edita el nombre de un producto", () => {
    mostrarProductos();

    fireEvent.click(screen.getByText("Editar"));

    expect(
      screen.getByTestId("primer-nombre")
    ).toHaveTextContent("Producto editado");
  });

  it("elimina un producto", () => {
    mostrarProductos();

    const cantidadInicial = Number(
      screen.getByTestId("cantidad").textContent
    );

    fireEvent.click(screen.getByText("Eliminar"));

    expect(
      Number(screen.getByTestId("cantidad").textContent)
    ).toBe(cantidadInicial - 1);
  });

  it("descuenta el stock después de una compra", () => {
    mostrarProductos();

    const stockInicial = Number(
      screen.getByTestId("primer-stock").textContent
    );

    fireEvent.click(screen.getByText("Descontar"));

    expect(
      Number(screen.getByTestId("primer-stock").textContent)
    ).toBe(stockInicial - 2);
  });

  it("guarda productos en localStorage", () => {
    mostrarProductos();

    fireEvent.click(screen.getByText("Agregar"));

    const guardados = JSON.parse(
      localStorage.getItem("productosGameZone")
    );

    expect(guardados).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nombre: "Producto de prueba"
        })
      ])
    );
  });

});
