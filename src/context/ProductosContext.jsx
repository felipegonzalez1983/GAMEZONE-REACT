import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  productos as productosIniciales
} from "../data/productos";

import {
  obtenerProductosAPI
} from "../services/productosService";

const ProductosContext = createContext();

export function ProductosProvider({ children }) {

  // Productos de GAMEZONE
  const [productos, setProductos] = useState(() => {
    const productosGuardados =
      localStorage.getItem("productosGameZone");

    if (!productosGuardados) {
      return productosIniciales;
    }

    try {
      return JSON.parse(productosGuardados);
    } catch {
      return productosIniciales;
    }
  });

  // Estado de conexión con la API
  const [cargando, setCargando] = useState(true);
  const [errorAPI, setErrorAPI] = useState(null);

  // CARGAR PRODUCTOS DESDE MONGODB ATLAS
  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        const productosMongoDB = await obtenerProductosAPI();

        if (!activo) return;

        setProductos(productosMongoDB);
        setErrorAPI(null);

        console.log(
          "✅ Productos cargados desde MongoDB:",
          productosMongoDB
        );

      } catch (error) {
        if (!activo) return;

        console.error(
          "❌ Error al conectar con Express:",
          error
        );

        setErrorAPI(
          "No se pudieron cargar los productos desde MongoDB"
        );

      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  // GUARDAR PRODUCTOS LOCALMENTE
  useEffect(() => {
    if (cargando) return;

    localStorage.setItem(
      "productosGameZone",
      JSON.stringify(productos)
    );
  }, [productos, cargando]);

  // AGREGAR PRODUCTO
  function agregarProducto(nuevoProducto) {

    const nuevoId =
      productos.reduce((maximo, producto) => {
        const idNumerico = Number(producto.id);
        return Number.isFinite(idNumerico)
          ? Math.max(maximo, idNumerico)
          : maximo;
      }, 0) + 1;

    const productoCompleto = {
      ...nuevoProducto,
      id: nuevoId,
      precio: Number(nuevoProducto.precio),
      stock: Number(nuevoProducto.stock)
    };

    setProductos((productosActuales) => [
      ...productosActuales,
      productoCompleto
    ]);
  }

  // EDITAR PRODUCTO
  function editarProducto(idProducto, datosActualizados) {

    setProductos((productosActuales) =>
      productosActuales.map((producto) =>
        String(producto.id) === String(idProducto)
          ? {
              ...producto,
              ...datosActualizados,
              precio: Number(datosActualizados.precio),
              stock: Number(datosActualizados.stock)
            }
          : producto
      )
    );
  }

  // ELIMINAR PRODUCTO
  function eliminarProducto(idProducto) {

    setProductos((productosActuales) =>
      productosActuales.filter(
        (producto) =>
          String(producto.id) !== String(idProducto)
      )
    );
  }

  // DESCONTAR STOCK AL COMPRAR
  function descontarStock(productosComprados) {

    setProductos((productosActuales) =>
      productosActuales.map((producto) => {

        const productoComprado =
          productosComprados.find(
            (item) =>
              String(item.id) === String(producto.id)
          );

        if (!productoComprado) {
          return producto;
        }

        const nuevoStock =
          producto.stock - productoComprado.cantidad;

        return {
          ...producto,
          stock: Math.max(0, nuevoStock)
        };
      })
    );
  }

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        errorAPI,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        descontarStock
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}
