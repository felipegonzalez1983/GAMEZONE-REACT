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

*Resultados del reporte generado el 20 de octubre de 2026. La cobertura no es del 100 %; quedan áreas por ampliar.*

![Reporte de cobertura de Game Zone](documentacion/Cobertura_GameZone.png)

## 📚 Documentos de evaluación

| Documento | Descripción |
|---|---|
| 📘 [ERS actualizado — versión 2.0](documentacion/ERS_GameZone_Actualizado_React.docx) | Requisitos, reglas de negocio, casos de uso y arquitectura |
| 📊 [Informe de cobertura de testing](documentacion/Informe_Cobertura_Testing_GameZone.docx) | Alcance de las pruebas, resultados y análisis |
| 🖼️ [Captura de cobertura](documentacion/Cobertura_GameZone.png) | Evidencia visual del reporte de Vitest |

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
---

### 1. 🎮 Demostración funcional (máximo 5 minutos)

| Orden | Qué hacer en la aplicación | Qué demuestra |
|---|---|---|
| 1 | Entrar a **Productos** y escribir un término de búsqueda | Catálogo y filtrado |
| 2 | Presionar **Añadir al carrito** en un producto con stock | Interacción entre componente y contexto |
| 3 | Abrir **Carrito**, modificar una cantidad y revisar el total | Estado compartido y reglas de stock |
| 4 | Si hay tiempo y los datos de prueba están preparados, confirmar una compra simulada | Flujo de compra sin pasarela de pagos |

**Frase de apoyo:** «En vez de pasar por todas las páginas, vamos a mostrar un flujo de compra en Game Zone, desde el catálogo hasta el carrito. Así podemos explicar cómo se comunican los componentes y cómo cambia el estado».

### 2. ⚛️ React, arquitectura y rutas — primer criterio

**Código para mostrar:** [`src/App.jsx`](src/App.jsx), [`src/components/Layout.jsx`](src/components/Layout.jsx), [`src/pages/Productos.jsx`](src/pages/Productos.jsx).

La versión antigua usaba documentos HTML con JavaScript. La versión nueva utiliza **React con Vite**, separa la aplicación en **páginas**, **componentes reutilizables** y **contextos**. `App.jsx` centraliza rutas con React Router: `/productos` abre el catálogo, `/productos/:id` muestra un producto y `/carrito` presenta el carrito.

**Fragmento real resumido de `App.jsx`:**

```jsx
<Routes>
  <Route element={<Layout />}>
    <Route path="/productos" element={<Productos />} />
    <Route path="/productos/:id" element={<DetalleProducto />} />
    <Route path="/carrito" element={<Carrito />} />
  </Route>
</Routes>
```

**Para explicar:** `Route` relaciona una dirección con un componente. `Layout` permite compartir la estructura de la tienda y evitar repetir el menú en cada página.

### 3. 🧩 Componentes, props, estados y diseño responsivo — segundo criterio

**Código para mostrar:** [`src/components/ProductoCard.jsx`](src/components/ProductoCard.jsx), [`src/context/CarritoContext.jsx`](src/context/CarritoContext.jsx).

En `ProductoCard.jsx`, el componente recibe las props `producto` y `destacado`:

```jsx
function ProductoCard({ producto, destacado = false }) {
  const { agregarAlCarrito } = useCarrito();
  // ...
}
```

- **Props:** son datos recibidos desde otro componente. `producto` permite mostrar nombre, precio, stock e imagen; `destacado` cambia parte de la presentación.
- **Estado:** en `CarritoContext.jsx`, `useState` guarda los productos del carrito y `setCarrito` actualiza ese valor.
- **Context API:** `CarritoProvider` comparte funciones como `agregarAlCarrito`, `cambiarCantidad` y `eliminarDelCarrito` sin enviarlas manualmente por muchas capas de props.
- **useEffect:** guarda los cambios del carrito en `localStorage` cuando cambia el estado.
- **Diseño responsivo:** la tarjeta usa clases de rejilla como `col-lg-4` y `col-md-6`; durante la defensa debemos **demostrar** el resultado al cambiar el tamaño del navegador.

**Ejemplo real del contexto:**

```jsx
const [carrito, setCarrito] = useState(() => {
  const carritoGuardado = localStorage.getItem("carritoGameZone");
  if (!carritoGuardado) return [];
  try { return JSON.parse(carritoGuardado); }
  catch { return []; }
});

useEffect(() => {
  localStorage.setItem("carritoGameZone", JSON.stringify(carrito));
}, [carrito]);
```

**Frase de apoyo:** «Las props entregan información a las tarjetas. El contexto mantiene el estado compartido del carrito y hace que las cantidades y el total se actualicen cuando agregamos productos».

### 4. 🧪 Mostrar una prueba unitaria — tercer criterio

**Código para mostrar:** [`test/ProductoCard.test.jsx`](test/ProductoCard.test.jsx), [`test/Login.test.jsx`](test/Login.test.jsx).

Ejemplo real del test de la tarjeta de productos, reducido a su parte esencial:

```jsx
it("permite agregar un producto al carrito", () => {
  agregarAlCarrito.mockClear();
  render(
    <MemoryRouter>
      <ProductoCard producto={producto} />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", {
    name: "Añadir al carrito"
  }));

  expect(agregarAlCarrito).toHaveBeenCalledWith(producto);
});
```

**Cómo explicarlo al profesor:**

- `describe`: agrupa pruebas relacionadas.
- `it` o `test`: declara el comportamiento que se quiere comprobar.
- `render`: monta el componente en el entorno simulado de prueba.
- `screen`: busca elementos visibles o accesibles del componente.
- `fireEvent.click`: simula el clic del usuario.
- `expect`: comprueba el resultado esperado.
- `vi.fn()`: crea una función simulada (mock), útil para verificar llamadas sin utilizar el carrito real.

**Qué valida el ejemplo:** al pulsar **Añadir al carrito**, `ProductoCard` llama a `agregarAlCarrito` con el producto correspondiente.

### 5. ⚙️ Configuración, mocks y cobertura — cuarto criterio

**Código para mostrar:** [`vite.config.js`](vite.config.js), [`package.json`](package.json), [`test/setup.js`](test/setup.js).

`vite.config.js` usa `jsdom` para simular el entorno del navegador, `test/setup.js` como preparación de pruebas y `@vitest/coverage-v8` para la cobertura. Los reportes se generan en texto y HTML.

```bash
npm test       # Ejecuta las pruebas
npm run cov    # Ejecuta las pruebas y genera la carpeta coverage
```

En `package.json`, el script `cov` ejecuta `vitest run --coverage`.

**Ejemplo de mock:** en `test/Login.test.jsx`, `vi.mock` simula el contexto de usuario y la navegación, de modo que se puede verificar el inicio de sesión sin depender de una aplicación completa o de una API externa.

**Resultados registrados el 20-10-2026:** 85 pruebas aprobadas en 11 archivos; cobertura de líneas **72,37 %**, sentencias **72,48 %**, ramas **66,05 %** y funciones **71,32 %**. El profesor **no exige alcanzar el 80 %**; en esta evaluación destacó el mínimo de **10 pruebas** y la capacidad de explicarlas.

**Entrega del reporte:** la carpeta `coverage/` completa se comprime como `coverage.zip` y se sube a AVA **por separado**. No se debe versionar `coverage/` ni `node_modules/` en GitHub. La imagen que aparece más arriba es solo apoyo visual.

### 6. 💬 Preguntas breves para ensayar

<details>
<summary><strong>¿Qué ganamos al migrar desde HTML/JS a React?</strong></summary>

Separamos páginas y elementos reutilizables, administramos estados con hooks/contextos y navegamos mediante rutas sin repetir estructuras en cada página.
</details>

<details>
<summary><strong>¿Qué diferencia hay entre props y estado?</strong></summary>

Las **props** llegan al componente como parámetros; el **estado** es información que React mantiene y actualiza. En Game Zone, `ProductoCard` recibe el producto por props y `CarritoContext` administra el carrito con estado.
</details>

<details>
<summary><strong>¿Qué es un mock y para qué lo usamos?</strong></summary>

Es una sustitución controlada de una dependencia. En el test de `ProductoCard`, `agregarAlCarrito` se simula con `vi.fn()` para comprobar que se llama correctamente cuando el usuario presiona el botón.
</details>

<details>
<summary><strong>¿Cómo sé que las pruebas están funcionando?</strong></summary>

Ejecuto `npm test` y muestro los resultados. Luego ejecuto `npm run cov` para generar las métricas y abrir `coverage/index.html` en el navegador.
</details>

### 7. 📦 Entrega del profesor y preparación del notebook

| Entrega / preparación | Acción |
|---|---|
| Repositorio público | Compartir la URL de este repositorio en AVA y comprobar acceso sin iniciar sesión |
| Proyecto ZIP | En GitHub: **Code → Download ZIP**, de la rama definitiva que evaluarán |
| Cobertura ZIP | Entregar **`coverage.zip`** separado en AVA; debe contener el reporte HTML generado |
| ERS e informe de testing | Mantener disponibles los documentos por lo exigido en la pauta escrita |
| Notebook | Abrir el proyecto en VS Code, correr `npm run dev`, comprobar catálogo y carrito y tener `npm test` listo |

**Distribución sugerida para ensayar (pueden intercambiar papeles):** Felipe inicia el recorrido de la tienda y explica props/carrito; Vicente muestra rutas, tests y configuración. **Los dos deben prepararse para responder preguntas individuales de React y testing.**

---

## 📚 Documentos de evaluación

> **Importante:** los enlaces siguientes funcionan una vez que los tres archivos estén subidos a `documentacion/` en esta misma rama. La carpeta `coverage/` generada por Vitest **no** se agrega al repositorio; se entrega como ZIP separado por AVA.

| Documento | Descripción |
|---|---|
| 📘 [ERS actualizado — versión 2.0](documentacion/ERS_GameZone_Actualizado_React.docx) | Requisitos, reglas de negocio, casos de uso y arquitectura |
| 📊 [Informe de cobertura de testing](documentacion/Informe_Cobertura_Testing_GameZone.docx) | Alcance de las pruebas, resultados y análisis |
| 🖼️ [Captura de cobertura](documentacion/Cobertura_GameZone.png) | Evidencia visual del reporte de Vitest |



<div align="center">

**🎓 Proyecto académico — DUOC UC · 2026**

Desarrollado por **Felipe González Henríquez y Vicente Valenzuela León**.

</div>
