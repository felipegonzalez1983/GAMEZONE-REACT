<div align="center">

<img src="public/logo-game-zone.jpeg" alt="Logo de Game Zone" width="210" />

# 🎮 GAME ZONE

### Tu tienda online de videojuegos y accesorios

**DUOC UC · Desarrollo Fullstack II (DSY1104) · Evaluación Parcial N.º 2**

![React](https://img.shields.io/badge/React-Frontend-149ECA?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?logo=vitest&logoColor=white) ![Estado](https://img.shields.io/badge/Proyecto-Académico-555555)

**Integrantes:** Felipe González Henríquez · Vicente Valenzuela León

</div>

---

## 🕹️ Sobre el proyecto

**Game Zone** es una tienda web académica de videojuegos y accesorios. Comenzó como un proyecto con **HTML, CSS y JavaScript**, y en esta segunda etapa se migró a **React + Vite**, utilizando componentes reutilizables, rutas y contextos para compartir estados.

![Imagen de portada de Game Zone](src/assets/hero.png)

## ✨ Funcionalidades

| Área | Funcionalidades |
|---|---|
| 🛍️ Catálogo | Listado de productos, búsqueda, filtros y detalle de cada producto |
| 👤 Usuarios | Registro, validaciones e inicio de sesión |
| 🛒 Carrito | Agregar productos, modificar cantidades y eliminar artículos |
| 💳 Compras | Confirmación de compra **simulada** e historial local |
| 🛠️ Administración | Gestión de productos y usuarios |
| 📱 Navegación | Páginas informativas, blogs e interfaz adaptada al proyecto |

> **Alcance académico:** el proyecto utiliza información local y `localStorage`. No incluye pagos reales, backend productivo ni autenticación segura de producción.

## 🧰 Tecnologías

**Frontend:** React, Vite, JavaScript, HTML, CSS y React Router.

**Estado y persistencia:** React Context API y `localStorage`.

**Pruebas:** Vitest, React Testing Library, jsdom y cobertura V8.

## 🚀 Instalación y ejecución

Necesitas **Node.js y npm** instalados.

```bash
# 1. Clonar el proyecto
git clone https://github.com/felipegonzalez1983/GAMEZONE-REACT.git

# 2. Entrar a la carpeta
cd GAMEZONE-REACT

# 3. Instalar dependencias
npm install

# 4. Ejecutar la tienda
npm run dev
```

Abre en tu navegador la dirección que muestre Vite en la terminal (habitualmente `http://localhost:5173`).

## 🧪 Pruebas y cobertura

El proyecto dispone de **11 archivos de pruebas** y registra **85 pruebas aprobadas** en la ejecución documentada.

```bash
npm test       # Ejecutar las pruebas
npm run cov    # Ejecutar pruebas y generar informe de cobertura
```

| Métrica | Resultado |
|---|---:|
| Sentencias | **72,48 %** |
| Ramas | **66,05 %** |
| Funciones | **71,32 %** |
| Líneas | **72,37 %** |


<img width="754" height="588" alt="image" src="https://github.com/user-attachments/assets/ab2a81ab-0443-4fff-8b18-d0892d4acbba" />


*Resultados del reporte generado el 20 de octubre de 2026. La cobertura no es del 100 %; quedan áreas por ampliar.*

![Reporte de cobertura de Game Zone]

<img width="1300" height="357" alt="image" src="https://github.com/user-attachments/assets/bb1c936c-a109-4fce-b0bf-2b3a80362b37" />






## 📚 Documentos de evaluación

## 📘 Especificación de Requisitos del Software (ERS) — Versión 2.0

A continuación se presenta la documentación completa de requisitos del proyecto.

Versión 2.0 | Actualización del proyecto HTML/CSS/JavaScript a React + Vite | 20 de octubre de 2026

| **Integrantes**                                                | **Proyecto   / entrega**                                                                |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Felipe González Henríquez y Vicente Valenzuela León** | Evaluación   Parcial N.º 2                                                              |
| **Versión   revisada**                                         | Código   contenido en GAMEZONE-REACT-main.zip                                           |
| **Repositorios   de referencia**                               | github.com/felipegonzalez1983/GAMEZONE   y github.com/felipegonzalez1983/GAMEZONE-REACT |




### 1. Introducción

Este documento presenta los requisitos funcionales y no funcionales de Game Zone, una tienda web académica orientada a mostrar videojuegos y accesorios, permitir que los clientes consulten productos y realicen una compra simulada, y ofrecer funciones básicas de administración. La versión inicial estaba desarrollada con HTML, CSS y JavaScript; la segunda versión reorganiza la solución mediante React y Vite.

### 2. Objetivo y alcance

El objetivo es entregar un frontend navegable y responsivo que utilice componentes, estados, rutas y formularios con validaciones. El sistema funciona como un prototipo de tienda: la información se administra principalmente en el navegador usando localStorage y datos locales; no se identifica en los archivos revisados un backend de producción, pasarela de pago real ni base de datos remota.

### 3. Usuarios del sistema

| **Actor**                | **Responsabilidades   principales**                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Visitante**            | Explorar   la página, catálogo, información y blogs; acceder al registro e inicio de   sesión.                          |
| **Cliente   registrado** | Iniciar   sesión, usar el carrito, realizar compra simulada y consultar el historial   según la información almacenada. |
| **Administrador**        | Gestionar   registros de productos y usuarios mediante las pantallas de administración.                                 |



### 4. Requisitos funcionales (versión React)

#### RF-01 · Navegación general

Mostrar inicio, catálogo, carrito, historial, nosotros, contacto, blogs, login y registro a través de rutas React.

Evidencia en código: src/App.jsx; Layout.jsx

#### RF-02 · Catálogo de productos

Mostrar los productos disponibles con información necesaria para su consulta.

Evidencia en código: pages/Productos.jsx; data/productos.js

#### RF-03 · Búsqueda y categorías

Filtrar productos por texto de búsqueda y categoría desde el catálogo.

Evidencia en código: pages/Productos.jsx

#### RF-04 · Detalle de producto

Acceder al detalle de un artículo mediante una ruta con identificador.

Evidencia en código: pages/DetalleProducto.jsx; /productos/:id

#### RF-05 · Registro de clientes

Capturar los datos solicitados, validar campos y registrar usuarios localmente.

Evidencia en código: pages/Registro.jsx

#### RF-06 · Validación de registro

Exigir nombre, apellidos, dirección, región y comuna; validar formato de RUN, dominio de correo admitido y longitud de contraseña.

Evidencia en código: pages/Registro.jsx

#### RF-07 · Inicio de sesión

Validar credenciales; mostrar error cuando no coincidan; iniciar sesión de cliente o administrador.

Evidencia en código: pages/Login.jsx; context/UsuarioContext.jsx

#### RF-08 · Gestión de carrito

Agregar productos, consultar su contenido, modificar cantidades y eliminar productos respetando controles de stock.

Evidencia en código: context/CarritoContext.jsx; pages/Carrito.jsx

#### RF-09 · Compra simulada

Revisar condiciones del carrito y confirmar la compra; almacenar la operación localmente y descontar stock según lógica implementada.

Evidencia en código: pages/Carrito.jsx; context/ProductosContext.jsx

#### RF-10 · Historial

Mostrar compras asociadas a la información local registrada por el sistema.

Evidencia en código: pages/Historial.jsx

#### RF-11 · Administración de productos

Permitir agregar, editar y eliminar productos desde el panel de administración, con validaciones de formulario.

Evidencia en código: pages/Admin.jsx; context/ProductosContext.jsx

#### RF-12 · Administración de usuarios

Consultar y eliminar usuarios; permitir agregar usuarios desde formulario del administrador.

Evidencia en código: pages/AdminUsuarios.jsx; pages/AdminNuevoUsuario.jsx

#### RF-13 · Información institucional y blogs

Mostrar secciones de nosotros, contacto, publicaciones y detalle de publicaciones.

Evidencia en código: pages/Nosotros.jsx; Contacto.jsx; Blogs.jsx; DetalleBlog.jsx

#### RF-14 · Persistencia local

Conservar productos, usuarios, sesión y carrito según las operaciones implementadas con localStorage.

Evidencia en código: context/*.jsx; pages/Registro.jsx; pages/Carrito.jsx

### 5. Requisitos no funcionales

| **ID**     | **Atributo**                   | **Requisito**                                                                                                                                                                                   |
| ---------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RNF-01** | Tecnologías                    | Utilizar   React con Vite y JavaScript modular, siguiendo la estructura de componentes,   contextos y páginas.                                                                                  |
| **RNF-02** | Adaptación   visual            | Presentar una   interfaz que pueda utilizarse en tamaños de pantalla diferentes a través de   sus hojas de estilos. Se debe demostrar su resultado durante la defensa.                          |
| **RNF-03** | Usabilidad                     | Identificar   acciones y formularios mediante controles y mensajes de validación   comprensibles.                                                                                               |
| **RNF-04** | Mantenibilidad                 | Separar   componentes reutilizables, páginas, datos y lógica compartida por contextos.                                                                                                          |
| **RNF-05** | Pruebas                        | Configurar   Vitest con React Testing Library, ejecutar pruebas con npm test y obtener   cobertura con npm run cov.                                                                             |
| **RNF-06** | Persistencia   de demostración | Guardar la   información en el almacenamiento local del navegador; no prometer   sincronización entre equipos ni garantía de respaldo.                                                          |
| **RNF-07** | Seguridad   pendiente          | Por   tratarse de un prototipo académico, no considerar localStorage con   contraseñas como una solución apta para producción. Falta autenticación y   almacenamiento seguro del lado servidor. |



### 6. Reglas de negocio y validaciones observadas

RN-01. En el registro el RUN se ingresa sin puntos ni guion. El código comprueba su formato mediante expresión regular; no se afirma validación del dígito verificador por módulo 11.

RN-02. El correo de registro se restringe a los dominios duocuc.cl, duoc.cl, profesor.duoc.cl y gmail.com según la implementación revisada.

RN-03. La contraseña de registro debe tener entre 4 y 10 caracteres.

RN-04. La sesión administrativa de demostración contempla credenciales definidas directamente en el código; no es un sistema de autorización de producción.

RN-05. Las operaciones de carrito y compra aplican reglas de cantidad y stock implementadas por los contextos y páginas; la compra es simulada y no procesa un pago bancario.

### 7. Casos de uso resumidos

| **Caso**  | **Actor**     | **Flujo   principal**                                  | **Resultado   esperado**                          |
| --------- | ------------- | ------------------------------------------------------ | ------------------------------------------------- |
| **CU-01** | Visitante     | Entrar   a Productos y usar búsqueda/categoría.        | Catálogo   filtrado.                              |
| **CU-02** | Visitante     | Completar   registro y corregir errores indicados.     | Cuenta local   creada cuando cumple validaciones. |
| **CU-03** | Cliente       | Ingresar   con correo y contraseña registrados.        | Sesión   iniciada o mensaje de error.             |
| **CU-04** | Cliente       | Agregar   producto al carrito y modificar cantidades.  | Carrito y   total actualizados.                   |
| **CU-05** | Cliente       | Confirmar   una compra de prueba con stock disponible. | Compra   guardada en historial local.             |
| **CU-06** | Administrador | Entrar al   panel y modificar el catálogo.             | Productos   actualizados en el estado local.      |
| **CU-07** | Administrador | Revisar   listado y agregar/eliminar usuario.          | Listado   de usuarios actualizado.                |



### 8. Arquitectura y trazabilidad técnica

Interfaz: componentes Navbar, Footer, Layout, ProductoCard y AdminLayout. Enrutamiento: React Router en src/App.jsx. Estados globales: CarritoContext, ProductosContext y UsuarioContext. Páginas: src/pages. Almacenamiento: datos de ejemplo y localStorage. Pruebas: carpeta test y configuración en vite.config.js.

La versión anterior contenía páginas HTML y scripts en JS/; la versión actual reemplaza el esquema de múltiples páginas HTML por navegación React con componentes y rutas.

### 9. Verificación mediante pruebas

El proyecto incluye 11 archivos de pruebas automatizadas en la carpeta test. Según la ejecución compartida por el equipo, aprobaron 85 pruebas. El informe de cobertura generado el 20-10-2026 informa 72,48 % de sentencias, 66,05 % de ramas, 71,32 % de funciones y 72,37 % de líneas. Estas cifras corresponden a la ejecución informada, no sustituyen una nueva comprobación sobre cualquier ZIP posterior.

| **Área**                  | **Evidencia   de prueba / archivo**                                                  |
| ------------------------- | ------------------------------------------------------------------------------------ |
| **Login   y registro**    | test/Login.test.jsx   y test/Registro.test.jsx                                       |
| **Productos   y tarjeta** | test/Productos.test.jsx   y test/ProductoCard.test.jsx                               |
| **Carrito   y contexto**  | test/Carrito.test.jsx   y test/CarritoPagina.test.jsx                                |
| **Usuarios   y estados**  | test/UsuarioContext.test.jsx   y test/ProductosContext.test.jsx                      |
| **Administración**        | test/Admin.test.jsx,   test/AdminUsuarios.test.jsx y test/AdminNuevoUsuario.test.jsx |



### 10. Restricciones y mejoras pendientes

No se ha identificado una API de backend, pago real ni base de datos centralizada. La autenticación y datos de usuarios almacenados localmente no son adecuados para producción. La cobertura tampoco es completa, por lo que siguen pendientes pruebas sobre algunas páginas y componentes. Estas restricciones deben explicarse como límites del alcance académico, no presentarse como funciones terminadas.

### 11. Control de versiones y conclusión

Versión 1.0: tienda frontend con HTML, CSS y JavaScript (GAMEZONE-main.zip). Versión 2.0: migración a React + Vite, rutas, contextos, gestión de formularios y pruebas Vitest (GAMEZONE-REACT-main.zip).

En síntesis, Game Zone cumple el propósito de integrar los contenidos del curso en un frontend de comercio electrónico académico. La migración a React permitió organizar mejor la interfaz y gestionar estados compartidos. El siguiente avance natural sería conectar servicios seguros de backend y ampliar la cobertura de pruebas.


## 🗂️ Organización principal

```text
GAMEZONE-REACT/
├── public/           # Recursos públicos y logo
├── src/
│   ├── assets/       # Recursos visuales
│   ├── components/   # Componentes reutilizables
│   ├── context/      # Estados compartidos
│   ├── data/         # Datos del catálogo
│   └── pages/        # Páginas de la aplicación
├── test/             # Pruebas automatizadas
├── documentacion/    # ERS, informe y evidencias
├── package.json
├── vite.config.js
└── README.md
```

---

<div align="center">

**🎓 Proyecto académico — DUOC UC · 2026**

Desarrollado por **Felipe González Henríquez y Vicente Valenzuela León**.

</div>
