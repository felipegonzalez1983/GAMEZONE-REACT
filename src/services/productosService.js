import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/productos";

export async function obtenerProductosAPI() {
  const respuesta = await axios.get(API_URL);

  return respuesta.data.map((producto) => ({
    ...producto,
    id: producto._id
  }));
}
