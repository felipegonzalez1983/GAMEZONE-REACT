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

---

<div align="center">

**🎓 Proyecto académico — DUOC UC · 2026**

Desarrollado por **Felipe González Henríquez y Vicente Valenzuela León**.

</div>
