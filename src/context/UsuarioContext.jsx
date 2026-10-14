import {
  createContext,
  useContext,
  useState
} from "react";


const UsuarioContext = createContext();


export function UsuarioProvider({ children }) {

  const [usuario, setUsuario] =
    useState(() => {

      const correo =
        localStorage.getItem(
          "usuarioGameZone"
        );

      const nombre =
        localStorage.getItem(
          "nombreUsuarioGameZone"
        );

      const rol =
        localStorage.getItem(
          "rolGameZone"
        );


      if (!correo) {
        return null;
      }


      return {
        correo,
        nombre,
        rol
      };

    });


  function iniciarSesion(datosUsuario) {

    localStorage.setItem(
      "usuarioGameZone",
      datosUsuario.correo
    );

    localStorage.setItem(
      "nombreUsuarioGameZone",
      datosUsuario.nombre
    );

    localStorage.setItem(
      "rolGameZone",
      datosUsuario.rol
    );


    setUsuario({
      correo: datosUsuario.correo,
      nombre: datosUsuario.nombre,
      rol: datosUsuario.rol
    });

  }


  function cerrarSesion() {

    localStorage.removeItem(
      "usuarioGameZone"
    );

    localStorage.removeItem(
      "nombreUsuarioGameZone"
    );

    localStorage.removeItem(
      "rolGameZone"
    );


    setUsuario(null);

  }


  return (

    <UsuarioContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion
      }}
    >

      {children}

    </UsuarioContext.Provider>

  );

}


export function useUsuario() {

  return useContext(
    UsuarioContext
  );

}