# SPEC 01 — MVP visual de las pantallas de Arcade Vault

> **Estado:** Aprobado
> **Depende de:** ninguna
> **Fecha:** 2026-11-26
> **Objetivo:** Portar a Next.js las cinco pantallas de `references/templates/` con su estilo, como maqueta navegable sin datos ni lógica de juego.

## Por qué existe esta spec

Las plantillas son un prototipo en un solo HTML con React por CDN, Babel en el navegador y navegación por `#hash`.
Esta spec las convierte en rutas reales del App Router para tener la base visual sobre la que irán las specs de datos, juegos y cuentas.
El prototipo mezcla español e inglés en nombres de archivos y componentes; aquí todo pasa a español.

## Alcance

**Dentro:**

- Estilo global: `references/templates/styles.css` portado tal cual a `app/globals.css`.
- Fuentes Press Start 2P, JetBrains Mono y Courier Prime cargadas con `next/font/google`.
- Layout común con barra de navegación (escritorio y menú móvil), fondo animado y pie.
- Cinco rutas, una por pantalla:

| Ruta | Pantalla | Plantilla de origen |
| --- | --- | --- |
| `/` | Biblioteca | `biblioteca.jsx` |
| `/juegos/[slug]` | Detalle del juego | `detalle.jsx` |
| `/juegos/[slug]/jugar` | Reproductor | `reproductor.jsx` |
| `/salon-de-la-fama` | Salón de la Fama | `salon.jsx` |
| `/acceso` | Iniciar sesión / Crear cuenta | `auth.jsx` |

- Contenido de relleno escrito en cada componente, copiado de `data.jsx` (títulos, textos, portadas y puntuaciones de ejemplo).
- Enlaces entre pantallas con `next/link`, igual que los botones de navegación del prototipo.
- Estado activo de la barra según la ruta: «Biblioteca» activo en `/`, `/juegos/*` y `/juegos/*/jugar`.
- Menú móvil que abre y cierra (único estado interactivo).
- Los botones, chips y campos sin función se ven y reaccionan al hover como en la plantilla, pero no hacen nada (sin `disabled`).
- Textos de la barra y el pie copiados tal cual, aunque sean inventados: «CRÉDITOS · 03» y «© 2026 ARCADE VAULT · HECHO CON PIXELES Y NEÓN · v2.6.0».
- Página 404 propia (`app/not-found.tsx`) con el estilo del Vault, para slugs desconocidos y cualquier ruta inexistente.

**Fuera de alcance (para futuras specs):**

- Capa de datos: tipos de juego, módulo compartido de juegos, base de datos o API.
- Juegos jugables, bucle de juego y puntuación real.
- Login, registro, sesión de usuario y contador de créditos real.
- Guardar puntuaciones y ranking real.
- Búsqueda y filtro por categoría en la biblioteca.
- Pestañas del Salón de la Fama y de la pantalla de acceso que cambien de contenido.
- Pausa, botón «FIN» y modal de fin de juego del reproductor.
- Efecto de inclinación 3D de las tarjetas al pasar el ratón.
- Tests automáticos.

## Modelo de datos

Esta feature no introduce estructuras de datos.
Cada página contiene su contenido de relleno como literales dentro del propio componente, sin módulo compartido, sin tipos de dominio y sin `fetch`.
La única constante compartida es la lista de los 8 slugs de ejemplo, en `componentes/slugs.ts`:

```ts
export const SLUGS_DE_EJEMPLO = [
  "bloque-buster", "caida", "serpentina", "gloton",
  "invasores", "rocas", "ranaria", "duelo-pixel",
] as const;
```

La usan `generateStaticParams` y la comprobación de 404 de `/juegos/[slug]` y `/juegos/[slug]/jugar`.
Un slug de esa lista muestra siempre el mismo juego de ejemplo (BLOQUE BUSTER); cualquier otro slug devuelve 404 con `notFound()`.

Convenciones:

- Componentes compartidos en `componentes/` en la raíz, importados con `@/componentes/...`.
- Nombres de componentes y archivos en español y PascalCase: `BarraNavegacion.tsx`, `PieDePagina.tsx`, `TarjetaJuego.tsx`.
- Las clases CSS del prototipo (`av-nav`, `card`, `btn`, `lb-row`…) se conservan sin renombrar, porque `styles.css` se porta tal cual.
- Números con formato `toLocaleString("es-ES")`, como en el prototipo.
- `lang="es"` en `<html>`.

## Plan de implementación

1. **Estilo y fuentes.**
   Sustituir `app/globals.css` por el contenido de `references/templates/styles.css`, sin `@import "tailwindcss"`.
   En `app/layout.tsx` cargar las tres fuentes con `next/font/google`, quitar Geist y mapear `--pixel` y `--mono` a las variables de `next/font`.
   Poner `lang="es"`, título «Arcade Vault» y el `<div className="av-bg">` del fondo.
   Comprobación: `npm run dev` muestra fondo oscuro con rejilla y la tipografía pixelada en un texto de prueba.

2. **Barra de navegación y pie.**
   Crear `componentes/BarraNavegacion.tsx` (componente cliente: usa `usePathname` y el estado del menú móvil) y `componentes/PieDePagina.tsx`.
   Montarlos en `app/layout.tsx` alrededor de `<main className="av-main">`.
   Comprobación: la barra se ve en escritorio y, por debajo de 840 px, el botón ≡ abre y cierra el panel.

3. **Biblioteca en `/`.**
   Crear `componentes/TarjetaJuego.tsx` y reescribir `app/page.tsx` con el hero, la barra de búsqueda y los chips (estáticos, «TODOS» activo) y la rejilla de 8 tarjetas.
   Cada tarjeta enlaza a `/juegos/<slug>`.
   Comprobación: las 8 portadas CSS se ven y al pulsar una se navega a su detalle.

4. **Detalle en `/juegos/[slug]`.**
   Crear `app/juegos/[slug]/page.tsx` con portada, etiquetas, descripción, franja de estadísticas, botones «JUGAR AHORA» (a `/juegos/<slug>/jugar`) y «VOLVER AL VAULT» (a `/`), y la tabla de 10 mejores puntuaciones.
   Crear `componentes/slugs.ts`, definir `generateStaticParams` con `SLUGS_DE_EJEMPLO` y llamar a `notFound()` si el slug no está en la lista.
   Crear `app/not-found.tsx`: título pixelado «GAME OVER · 404», una línea de texto y botón «VOLVER AL VAULT» a `/`, solo con clases existentes de `globals.css`.
   Comprobación: `/juegos/caida` y `/juegos/bloque-buster` muestran el mismo detalle de ejemplo, y `/juegos/xyz` muestra la 404 del Vault.

5. **Reproductor en `/juegos/[slug]/jugar`.**
   Crear `app/juegos/[slug]/jugar/page.tsx`, con el mismo `generateStaticParams` y la misma comprobación de 404, y con el HUD (valores fijos), la pantalla CRT con la arena animada y la barra inferior.
   «PAUSA» y «FIN» se muestran pero no hacen nada; «SALIR» enlaza al detalle.
   Comprobación: la arena CRT se anima y «SALIR» vuelve al detalle.

6. **Salón de la Fama en `/salon-de-la-fama`.**
   Crear `app/salon-de-la-fama/page.tsx` con cabecera, chips de juegos (el primero activo), podio de 3 puestos, tabla de 12 filas y botón «VOLVER A LA BIBLIOTECA».
   No se muestra la fila «TU MEJOR MARCA», porque no hay usuario.
   Comprobación: el podio se ve con oro, plata y bronce, y en menos de 720 px pasa a una columna.

7. **Acceso en `/acceso`.**
   Crear `app/acceso/page.tsx` con la tarjeta de acceso en la pestaña «INICIAR SESIÓN»: campos de usuario y contraseña, botones «ENTRAR AL VAULT», «JUGAR COMO INVITADO», Google y GitHub.
   El formulario no envía nada; los botones no hacen nada salvo «JUGAR COMO INVITADO», que enlaza a `/`.
   Comprobación: la pantalla se ve centrada y el botón «Iniciar Sesión» de la barra lleva aquí.

8. **Limpieza.**
   Borrar los SVG de la plantilla de Next en `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`).
   Actualizar la sección de estilo visual de `CLAUDE.md` para decir que el estilo ya vive en `app/globals.css`.
   Comprobación: `npm run lint`, `npx next typegen && npx tsc --noEmit` y `npm run build` pasan.

## Criterios de aceptación

- [ ] `npm run lint`, `npx next typegen && npx tsc --noEmit` y `npm run build` terminan sin errores.
- [ ] El check `ci` del pull request pasa.
- [ ] `/`, `/juegos/bloque-buster`, `/juegos/bloque-buster/jugar`, `/salon-de-la-fama` y `/acceso` responden 200 en `npm run dev`.
- [ ] Ninguna de esas rutas muestra errores en la consola del navegador.
- [ ] Las capturas de cada pantalla, hechas en el navegador integrado a 1440 px y a 375 px junto a las de `references/templates/Arcade Vault.html`, no muestran diferencias de color, tipografía ni disposición salvo las decididas en esta spec.
- [ ] `/juegos/xyz` y `/juegos/xyz/jugar` devuelven 404 y muestran la página de error del Vault.
- [ ] Pulsar PAUSA, FIN, ENTRAR AL VAULT, GOOGLE, GITHUB, un chip o escribir en el buscador no navega ni cambia nada de la pantalla.
- [ ] Los títulos usan Press Start 2P y el texto usa JetBrains Mono, servidas por `next/font` (sin peticiones a `fonts.googleapis.com`).
- [ ] La biblioteca muestra 8 tarjetas y cada una enlaza a `/juegos/<slug>`.
- [ ] «JUGAR AHORA» lleva a `/juegos/<slug>/jugar` y «SALIR» vuelve a `/juegos/<slug>`.
- [ ] «Biblioteca» está activo en la barra en `/`, en `/juegos/<slug>` y en `/juegos/<slug>/jugar`; «Salón de la Fama» está activo solo en `/salon-de-la-fama`.
- [ ] A 375 px de ancho no hay scroll horizontal y el menú ≡ abre y cierra el panel móvil.
- [ ] El botón Atrás del navegador vuelve a la pantalla anterior.
- [ ] No queda ninguna referencia a Geist ni a los SVG de la plantilla de Next.

## Decisiones

- **Sí:** portar `styles.css` tal cual. Es lo más rápido y lo más fiel al diseño.
- **No:** convertirlo a utilidades de Tailwind. Mucho trabajo para un MVP y riesgo de perder detalles.
- **Sí:** quitar `@import "tailwindcss"` de `globals.css`. El preflight de Tailwind podría pisar estilos del prototipo. Las dependencias se quedan instaladas para usarlas más adelante si hace falta.
- **Sí:** rutas reales del App Router en lugar del `#hash` del prototipo. Funciona Atrás, se pueden compartir enlaces y cada pantalla tiene su título.
- **Sí:** rutas en español (`/juegos`, `/salon-de-la-fama`, `/acceso`) y `slug` en vez de id. URLs legibles que no cambian cuando haya base de datos.
- **Sí:** jugar cuelga del juego (`/juegos/[slug]/jugar`). Mantiene «Biblioteca» activo, igual que el prototipo.
- **Sí:** contenido de relleno dentro de cada componente. El usuario pidió «sin datos»; la capa de datos va en otra spec.
- **No:** portar `data.jsx` como módulo tipado. Sería ya una capa de datos.
- **No:** página estática `/juegos/ejemplo`. Obligaría a cambiar rutas cuando lleguen los datos.
- **Sí:** 404 con `notFound()` para slugs fuera de los 8 de ejemplo, con página de error propia. Es lo que hará la app real.
- **No:** mostrar el juego de ejemplo con cualquier slug. Dejaría URLs basura que parecen válidas.
- **Sí:** detalle y reproductor fijos en BLOQUE BUSTER. Mostrar el juego del slug exigiría una lista compartida de juegos, que es ya capa de datos.
- **Sí:** botones sin función visibles y sin `disabled`. Respeta el aspecto de la plantilla.
- **Sí:** copiar «CRÉDITOS · 03» y la versión del pie tal cual. Se cambian cuando haya créditos y versión reales.
- **Sí:** un commit por paso (`AutoCommitSteps: true`), con mensaje `spec-01-step-NN`.
- **Sí:** verificar el parecido con capturas lado a lado a 1440 px y 375 px, en lugar de «a simple vista».
- **Sí:** solo es interactivo el menú móvil. El resto de estados (búsqueda, chips, pestañas, pausa, modal) se muestran en su estado inicial.
- **Sí:** nombres de componentes y archivos en español. El prototipo mezcla idiomas («biblioteca» y `Library`) y el usuario eligió español.
- **Sí:** conservar los nombres de clases CSS del prototipo. Renombrarlos obligaría a reescribir `styles.css`.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Con `cacheComponents` activo, leer `params` en `/juegos/[slug]` hace la ruta dinámica y puede exigir `<Suspense>`. | `generateStaticParams` con los 8 slugs. Consultar `node_modules/next/dist/docs/` antes de escribir las páginas. |
| `next/font` genera nombres de familia propios y `styles.css` usa `"Press Start 2P"` y `"JetBrains Mono"` por nombre. | Redefinir `--pixel` y `--mono` con las variables CSS de `next/font` en el layout. |
| Selectores globales del prototipo (`html, body, #root`, `a`, `button`) chocan con el layout de Next. | Se portan tal cual; `#root` no existe y no afecta. Revisar a simple vista en el paso 1. |
| Las portadas son CSS puro y dependen de clases como `cover-bricks`. | Copiar las clases exactas de `data.jsx` en el relleno de cada tarjeta. |

## Lo que **no** entra en esta spec

- Capa de datos y tipos de juego.
- Juegos jugables.
- Login, registro y sesión.
- Guardar puntuaciones y ranking real.
- Búsqueda, filtros, pestañas y modales funcionales.
- Tests automáticos.

Cada uno, si llega, va en su propia spec.
