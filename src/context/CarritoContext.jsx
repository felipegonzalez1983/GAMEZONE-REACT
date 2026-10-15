import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  useProductos
} from "./ProductosContext";


const CarritoContext =
  createContext();


export function CarritoProvider({
  children
}) {

  const {
    productos
  } = useProductos();


  const [
    carrito,
    setCarrito
  ] = useState(() => {

    const carritoGuardado =
      localStorage.getItem(
        "carritoGameZone"
      );


    if (!carritoGuardado) {
      return [];
    }


    try {

      return JSON.parse(
        carritoGuardado
      );

    } catch {

      return [];

    }

  });


  useEffect(() => {

    localStorage.setItem(
      "carritoGameZone",
      JSON.stringify(
        carrito
      )
    );

  }, [carrito]);


  function agregarAlCarrito(
    producto,
    cantidad = 1
  ) {

    const productoActual =
      productos.find(
        (item) =>
          item.id ===
          producto.id
      );


    if (!productoActual) {

      alert(
        "Este producto ya no está disponible."
      );

      return;

    }


    if (
      productoActual.stock <= 0
    ) {

      alert(
        "Este producto no tiene stock disponible."
      );

      return;

    }


    setCarrito(
      (carritoActual) => {

        const productoExistente =
          carritoActual.find(
            (item) =>
              item.id ===
              productoActual.id
          );


        if (productoExistente) {

          const nuevaCantidad =
            productoExistente.cantidad +
            cantidad;


          if (
            nuevaCantidad >
            productoActual.stock
          ) {

            alert(
              `Solo hay ${productoActual.stock} unidades disponibles.`
            );

            return carritoActual;

          }


          alert(
            `${productoActual.nombre} fue añadido al carrito.`
          );


          return carritoActual.map(
            (item) =>

              item.id ===
              productoActual.id

                ? {
                    ...item,

                    nombre:
                      productoActual.nombre,

                    precio:
                      productoActual.precio,

                    imagen:
                      productoActual.imagen,

                    cantidad:
                      nuevaCantidad
                  }

                : item

          );

        }


        if (
          cantidad >
          productoActual.stock
        ) {

          alert(
            `Solo hay ${productoActual.stock} unidades disponibles.`
          );

          return carritoActual;

        }


        alert(
          `${productoActual.nombre} fue añadido al carrito.`
        );


        return [
          ...carritoActual,

          {
            id:
              productoActual.id,

            nombre:
              productoActual.nombre,

            precio:
              productoActual.precio,

            imagen:
              productoActual.imagen,

            cantidad:
              cantidad
          }
        ];

      }
    );

  }


  function eliminarDelCarrito(
    idProducto
  ) {

    setCarrito(
      (carritoActual) =>

        carritoActual.filter(
          (producto) =>
            producto.id !==
            idProducto
        )

    );

  }


  function cambiarCantidad(
    idProducto,
    nuevaCantidad
  ) {

    const cantidad =
      Number(
        nuevaCantidad
      );


    if (
      cantidad <= 0
    ) {

      eliminarDelCarrito(
        idProducto
      );

      return;

    }


    const productoOriginal =
      productos.find(
        (producto) =>
          producto.id ===
          idProducto
      );


    if (!productoOriginal) {

      alert(
        "Este producto ya no está disponible."
      );

      eliminarDelCarrito(
        idProducto
      );

      return;

    }


    if (
      cantidad >
      productoOriginal.stock
    ) {

      alert(
        `Solo hay ${productoOriginal.stock} unidades disponibles.`
      );

      return;

    }


    setCarrito(
      (carritoActual) =>

        carritoActual.map(
          (producto) =>

            producto.id ===
            idProducto

              ? {
                  ...producto,

                  nombre:
                    productoOriginal.nombre,

                  precio:
                    productoOriginal.precio,

                  imagen:
                    productoOriginal.imagen,

                  cantidad:
                    cantidad
                }

              : producto

        )

    );

  }


  function vaciarCarrito() {

    setCarrito([]);

  }


  const cantidadCarrito =
    carrito.reduce(
      (
        total,
        producto
      ) =>
        total +
        producto.cantidad,
      0
    );


  const totalCarrito =
    carrito.reduce(
      (
        total,
        producto
      ) =>
        total +
        producto.precio *
        producto.cantidad,
      0
    );


  return (

    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        cantidadCarrito,
        totalCarrito
      }}
    >

      {children}

    </CarritoContext.Provider>

  );

}


export function useCarrito() {

  return useContext(
    CarritoContext
  );

}