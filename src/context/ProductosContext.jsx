import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  productos as productosIniciales
} from "../data/productos";


const ProductosContext =
  createContext();


export function ProductosProvider({
  children
}) {

  const [
    productos,
    setProductos
  ] = useState(() => {

    const productosGuardados =
      localStorage.getItem(
        "productosGameZone"
      );


    if (!productosGuardados) {

      return productosIniciales;

    }


    try {

      return JSON.parse(
        productosGuardados
      );

    } catch {

      return productosIniciales;

    }

  });


  /* GUARDAR PRODUCTOS */

  useEffect(() => {

    localStorage.setItem(
      "productosGameZone",
      JSON.stringify(productos)
    );

  }, [productos]);


  /* AGREGAR PRODUCTO */

  function agregarProducto(
    nuevoProducto
  ) {

    const nuevoId =
      productos.length > 0
        ? Math.max(
            ...productos.map(
              (producto) =>
                producto.id
            )
          ) + 1
        : 1;


    const productoCompleto = {

      ...nuevoProducto,

      id: nuevoId,

      precio:
        Number(
          nuevoProducto.precio
        ),

      stock:
        Number(
          nuevoProducto.stock
        )

    };


    setProductos(
      (productosActuales) => [
        ...productosActuales,
        productoCompleto
      ]
    );

  }


  /* EDITAR PRODUCTO */

  function editarProducto(
    idProducto,
    datosActualizados
  ) {

    setProductos(
      (productosActuales) =>

        productosActuales.map(
          (producto) =>

            producto.id === idProducto

              ? {
                  ...producto,
                  ...datosActualizados,

                  precio:
                    Number(
                      datosActualizados.precio
                    ),

                  stock:
                    Number(
                      datosActualizados.stock
                    )
                }

              : producto

        )

    );

  }


  /* ELIMINAR PRODUCTO */

  function eliminarProducto(
    idProducto
  ) {

    setProductos(
      (productosActuales) =>

        productosActuales.filter(
          (producto) =>
            producto.id !==
            idProducto
        )

    );

  }


  return (

    <ProductosContext.Provider
      value={{
        productos,
        agregarProducto,
        editarProducto,
        eliminarProducto
      }}
    >

      {children}

    </ProductosContext.Provider>

  );

}


export function useProductos() {

  return useContext(
    ProductosContext
  );

}