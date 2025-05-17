# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Configuración de Vite para tu Proyecto

Este tutorial te guiará a través del proceso de configuración de Vite, una herramienta moderna de desarrollo rápido para proyectos de JavaScript y TypeScript, en tu proyecto. Sigue estos pasos simples para comenzar:

### Paso 1: Instalar Vite

Primero, necesitas instalar Vite en tu proyecto. Puedes hacerlo ejecutando el siguiente comando en tu terminal:

```bash
npm create vite@latest
```

Este comando instalará Vite en tu proyecto y configurará una estructura de proyecto inicial.

### Paso 2: Ejecutar Vite

Una vez que hayas instalado Vite, necesitarás ejecutarlo para comenzar a desarrollar tu proyecto. Ejecuta los siguientes comandos en tu terminal:

```bash
npm install
npm run dev
```

Estos comandos instalarán las dependencias del proyecto y luego iniciarán el servidor de desarrollo de Vite. Una vez que el servidor esté en funcionamiento, podrás acceder a tu aplicación en tu navegador web.

### Paso 3: Configurar el Comando Start

Para configurar tu proyecto para que el comando `npm start` ejecute Vite, sigue estos pasos:

1. Modifica el script `start` en tu archivo `package.json`. Debería verse así:

```json
"scripts": {
  "start": "vite",
}
```

Con esta configuración, ejecutar `npm start` iniciará el servidor de desarrollo de Vite para tu proyecto.

¡Y eso es todo! Ahora estás listo para comenzar a desarrollar tu proyecto con Vite de una manera rápida y eficiente. ¡Feliz codificación! 🚀

---