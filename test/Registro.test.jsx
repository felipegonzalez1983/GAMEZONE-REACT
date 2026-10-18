
import {
  describe,
  it,
  expect,
  beforeEach
} from "vitest";

import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Registro from "../src/pages/Registro";

// Mostrar el formulario
function mostrarRegistro() {
  render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>
  );
}

// Escribir en un campo
function escribir(campo, valor) {
  fireEvent.change(
    screen.getByLabelText(campo),
    { target: { value: valor } }
  );
}

// Presionar el botón de registro
function enviarFormulario() {
  fireEvent.click(
    screen.getByRole("button", {
      name: "Registrarme"
    })
  );
}

// Completar datos válidos de prueba
function completarFormulario() {
  escribir("RUN", "19011022K");
  escribir("Nombre", "Usuario");
  escribir("Apellidos", "Prueba");
  escribir("Correo electrónico", "prueba@gmail.com");

  escribir("Región", "0");
  escribir("Comuna", "La Florida");

  escribir("Dirección", "Calle Prueba 123");
  escribir("Contraseña", "123456");
  escribir("Repetir contraseña", "123456");
}

describe("Pruebas del Registro Game Zone", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  // PRUEBA 1
  it("muestra el formulario de registro", () => {
    mostrarRegistro();

    expect(
      screen.getByText("Registro de usuario")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Registrarme"
      })
    ).toBeInTheDocument();
  });

  // PRUEBA 2
  it("valida que el nombre sea obligatorio", () => {
    mostrarRegistro();
    enviarFormulario();

    expect(
      screen.getByText("El nombre es obligatorio.")
    ).toBeInTheDocument();
  });

  // PRUEBA 3
  it("rechaza un RUN incorrecto", () => {
    mostrarRegistro();

    escribir("RUN", "123");
    enviarFormulario();

    expect(
      screen.getByText(
        "Escribe el RUN sin puntos ni guion."
      )
    ).toBeInTheDocument();
  });

  // PRUEBA 4
  it("rechaza un correo invalido", () => {
    mostrarRegistro();

    escribir("Correo electrónico", "correo@hotmail.com");
    enviarFormulario();

    expect(
      screen.getByText(
        "Utiliza un correo Duoc o Gmail."
      )
    ).toBeInTheDocument();
  });

  // PRUEBA 5
  it("rechaza contraseñas diferentes", () => {
    mostrarRegistro();

    escribir("Contraseña", "123456");
    escribir("Repetir contraseña", "654321");
    enviarFormulario();

    expect(
      screen.getByText(
        "Las contraseñas no coinciden."
      )
    ).toBeInTheDocument();
  });

  // PRUEBA 6
  it("habilita las comunas al elegir una region", () => {
    mostrarRegistro();

    expect(
      screen.getByLabelText("Comuna")
    ).toBeDisabled();

    escribir("Región", "0");

    expect(
      screen.getByLabelText("Comuna")
    ).not.toBeDisabled();

    expect(
      screen.getByRole("option", {
        name: "La Florida"
      })
    ).toBeInTheDocument();
  });

  // PRUEBA 7
  it("registra correctamente un usuario", () => {
    mostrarRegistro();
    completarFormulario();
    enviarFormulario();

    expect(
      screen.getByText(
        "Usuario registrado correctamente."
      )
    ).toBeInTheDocument();

    const usuarios = JSON.parse(
      localStorage.getItem("usuariosGameZone")
    );

    expect(usuarios).toHaveLength(1);
    expect(usuarios[0].correo).toBe("prueba@gmail.com");
    expect(usuarios[0].rol).toBe("Cliente");
  });

  // PRUEBA 8
  it("impide registrar un correo duplicado", () => {
    localStorage.setItem(
      "usuariosGameZone",
      JSON.stringify([
        {
          correo: "prueba@gmail.com",
          nombre: "Usuario Existente"
        }
      ])
    );

    mostrarRegistro();
    completarFormulario();
    enviarFormulario();

    expect(
      screen.getByText(
        "Este correo ya está registrado."
      )
    ).toBeInTheDocument();

    const usuarios = JSON.parse(
      localStorage.getItem("usuariosGameZone")
    );

    expect(usuarios).toHaveLength(1);
  });

});
