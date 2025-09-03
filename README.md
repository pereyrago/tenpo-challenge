# Tenpo Challenge

Aplicación web (Next.js App Router) desarrollada como parte de un challenge técnico para Tenpo y Tekton Labs. Permite autenticación básica, listado y filtrado de personas y manejo de sesión en cliente.

## Tecnologías

- Next.js 15 (App Router) y React 19
- TypeScript, Zod (validación)
- Zustand (estado global, persistencia en localStorage)
- Axios (HTTP), Tailwind CSS 4
- Jest + Testing Library (tests)
- ESLint (flat config) + Prettier

## Scripts

- `pnpm install`: instala dependencias
- `pnpm dev`: entorno de desarrollo
- `pnpm build`: build de producción
- `pnpm start`: sirve el build
- `pnpm lint`: ejecuta ESLint sobre el repo
- `pnpm test`: corre los tests

## Variables de entorno

Definir en `.env` (ver `.env.example`):

- `SESSION_SECRET`: clave para firmar/verificar JWT del login API.
- `EXTERNAL_API_URL`: URL base del proveedor de personas (p.ej. `https://randomuser.me/`).
- `REQUEST_SEED`: seed usado para resultados deterministas en la API externa.

## Estructura

- `src/app`: páginas, layouts, API routes (`/api/*`) y `not-found.tsx`.
- `src/components`: UI reusables y componentes de negocio.
- `src/context`: `AuthWrapper` (privadas), `GuestWrapper` (bloquea Home/Login a usuarios autenticados) y `ThemeProvider`.
- `src/services`: capa de acceso HTTP (`api.ts`, `log-in.ts`, `persons.ts`).
- `src/store`: estado global de sesión y datos (`session.ts`).
- `src/schemas`: tipos/validaciones (Zod, TS).
- `src/constants`: rutas públicas/privadas y paths de API.

## Arquitectura y decisiones

- Separación de capas (UI/negocio/servicios/estado).
- Persistencia de sesión en `localStorage` bajo `session-store`.
- Interceptor Axios añade `Authorization` si hay token (solo en cliente).
- Guards de sesión:
  - `AuthWrapper` redirige a Login si no hay sesión.
  - `GuestWrapper` redirige a lista si ya hay sesión.
- Manejo de errores tipado por servicio (`LoginError`, `PersonsError`).
- Logout automático si un servicio devuelve `498` (expiración) al consultar personas.

## Cómo correr

1) `pnpm install`
2) `pnpm dev`
3) Abrir `http://localhost:3000`

## Accesibilidad

- Formularios con `aria-label` y región de estado con `aria-live` para errores.
- Botones icónicos incluyen `aria-label` en controles de paginación.

## Mejoras ya aplicadas

- Página 404 (`src/app/not-found.tsx`).
- ESLint unificado a flat config (`eslint.config.mjs`).
- Navegación desde componentes (no desde el store) y guards de sesión.
- Manejo de `response.ok` en API interna de `persons` y robustez SSR/cliente en `axios`.

## Propuesta de mejora (teórica) para hacer más eficientes las llamadas al backend

Objetivo: reducir ancho de banda, latencia percibida y carga en backend sin cambiar UX.

- Paginación real en servidor: responder solo 20–50 ítems por página (ideal con cursores) en lugar de 2000.
- Cache HTTP + revalidación: usar `Cache-Control: s-maxage` y `stale-while-revalidate` en `src/app/api/persons/route.ts` para cache en edge y revalidación en segundo plano.
- ETag/If-None-Match: devolver `304 Not Modified` cuando corresponda para ahorrar transferencia.
- Búsqueda/filtrado en servidor: exponer `?q=` para filtrar en backend y enviar menos datos cuando se busca por email.
- Selección mínima de campos: mantener `inc=` con solo los campos usados por la UI.
- Centralizar expiración de sesión: manejar status `498` en un interceptor global de respuestas de Axios y ejecutar `logout` una sola vez.
- Retries con backoff y circuit breaker: reintentos exponenciales para fallas transitorias y protección ante errores persistentes.

