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

<!-- Esta imagen se verá cuando el archivo exista en documentacion/ en esta rama. -->
![Reporte de cobertura de Game Zone](documentacion/Cobertura_GameZone.png)


## 🎓 Defensa técnica — martes 27 de octubre de 2026

**Formato acordado según explicación del profesor:** demostración breve de la aplicación, seguida de preguntas sobre **React** y **testing**. No se exige PowerPoint ni una presentación formal. La demostración debe durar **hasta 5 minutos**. La evaluación es individual: ambos integrantes deben poder explicar el código. Llevaremos nuestro notebook con VS Code y la aplicación funcionando.

> Este README es una **guía visual**, no un guion para leer palabra por palabra. Presentaremos archivos de código reales para justificar cada respuesta.

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

---
