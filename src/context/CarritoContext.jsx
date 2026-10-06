import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { productos } from "../data/productos";


const CarritoContext = createContext();


export function CarritoProvider({ children }) {

  const [carrito, setCarrito] = useState(() => {

    const carritoGuardado =
      localStorage.getItem("carritoGameZone");

    if (!carritoGuardado) {
      return [];
    }

    try {
      return JSON.parse(carritoGuardado);
    } catch {
      return [];
    }

  });


  useEffect(() => {

    localStorage.setItem(
      "carritoGameZone",
      JSON.stringify(carrito)
    );

  }, [carrito]);


  function agregarAlCarrito(producto, cantidad = 1) {

    setCarrito((carritoActual) => {

      const productoExistente =
        carritoActual.find(
          (item) => item.id === producto.id
        );


      if (productoExistente) {

        const nuevaCantidad =
          productoExistente.cantidad + cantidad;


        if (nuevaCantidad > producto.stock) {

          alert(
            `Solo hay ${producto.stock} unidades disponibles.`
          );

          return carritoActual;
        }


        alert(
          `${producto.nombre} fue añadido al carrito.`
        );


        return carritoActual.map((item) =>

          item.id === producto.id

            ? {
                ...item,
                cantidad: nuevaCantidad
              }

            : item

        );

      }


      if (cantidad > producto.stock) {

        alert(
          `Solo hay ${producto.stock} unidades disponibles.`
        );

        return carritoActual;
      }


      alert(
        `${producto.nombre} fue añadido al carrito.`
      );


      return [
        ...carritoActual,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: cantidad
        }
      ];

    });

  }


  function eliminarDelCarrito(idProducto) {

    setCarrito((carritoActual) =>
      carritoActual.filter(
        (producto) =>
          producto.id !== idProducto
      )
    );

  }


  function cambiarCantidad(
    idProducto,
    nuevaCantidad
  ) {

    const cantidad = Number(nuevaCantidad);


    if (cantidad <= 0) {

      eliminarDelCarrito(idProducto);

      return;

    }


    const productoOriginal =
      productos.find(
        (producto) =>
          producto.id === idProducto
      );


    if (!productoOriginal) {
      return;
    }


    if (cantidad > productoOriginal.stock) {

      alert(
        `Solo hay ${productoOriginal.stock} unidades disponibles.`
      );

      return;
    }


    setCarrito((carritoActual) =>

      carritoActual.map((producto) =>

        producto.id === idProducto

          ? {
              ...producto,
              cantidad: cantidad
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
      (total, producto) =>
        total + producto.cantidad,
      0
    );


  const totalCarrito =
    carrito.reduce(
      (total, producto) =>
        total +
        producto.precio * producto.cantidad,
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

  return useContext(CarritoContext);

}