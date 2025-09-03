# Tenpo Challenge

## ¿Qué es este proyecto?

Este proyecto es una aplicación web desarrollada como parte de un challenge técnico para Tenpo y Tekton Labs. Permite la gestión y visualización de personas, autenticación de usuarios y manejo de sesiones, implementando buenas prácticas de arquitectura y desarrollo frontend moderno.

Para la obtención de datos, elegí la API pública de [randomuser](https://randomuser.me/) ya que cumplía con el requisito de poder mandar +2000 registros.

## Tecnologías principales

- **Next.js** (App Router)
- **React** (componentes funcionales, hooks)
- **TypeScript** (tipado estático)
- **Zustand** (manejo de estado global)
- **Axios** (peticiones HTTP)
- **ESLint** (linter)
- **PostCSS** (procesamiento de CSS)
- **Tailwindcss** (framework de CSS)
- **pnpm** (gestor de paquetes)

## Estructura del proyecto

- `/src/` — Páginas y layouts de la aplicación (estructura App Router de Next.js)
- `/src/components` — Componentes reutilizables UI y de negocio
- `/src/services` — Lógica de acceso a APIs y manejo de errores
- `/src/schemas` — Esquemas de validación y tipado
- `/src/store` — Estado global (Zustand)
- `/src/context` — Contextos globales (ej: autenticación, tema)
- `/public` — Recursos estáticos (imágenes, íconos)
- `package.json`, `tsconfig.json`, `eslint.config.mjs` — Configuración de dependencias y herramientas

## Patrones y arquitectura

- **Separación de responsabilidades**: UI, lógica de negocio, servicios y estado están desacoplados.
- **Patrón Container/Presentational**: Componentes de negocio y UI diferenciados.
- **Manejo centralizado de errores**: Clases de error personalizadas para cada servicio.
- **Hooks personalizados**: Para acceso a contexto y estado global.
- **Context API**: Para temas globales como autenticación y tema visual.
- **Persistencia de estado**: Uso de localStorage y persistencia con Zustand.

## Cómo levantar el proyecto

1. Instalar dependencias:
   ```sh
   pnpm install
   ```
2. Iniciar el servidor de desarrollo:
   ```sh
   pnpm dev
   ```
3. Acceder a la app en `http://localhost:3000`

## Variables de entorno

El proyecto requiere 3 variables de entorno para ejecutarse correctamente.
Puedes encontrarlas en el archivo `.env.example` en la raíz del proyecto. Solo debes crear un archivo `.env` y copiarlas allí.

## Notas adicionales

- El proyecto utiliza rutas públicas y privadas. Las privadas requieren autenticación (token en localStorage).
- El tema visual (light/dark/system) se gestiona y persiste automáticamente.
- El código está tipado y validado con TypeScript y ESLint.
- Se agregó como adicional tests para el componente Login los mismos se pueden ejecutar corriendo el comando `pnpm jest`

## Contacto

Para dudas técnicas, contactarme [Gabriel Pereyra](https://www.linkedin.com/in/gabi-pereyra/)
