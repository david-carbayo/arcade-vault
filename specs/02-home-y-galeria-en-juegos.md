# SPEC 02 — Home de Arcade Vault y galería en /juegos

> **Estado:** Implementado
> **Depende de:** SPEC 01
> **Fecha:** 2026-11-26
> **Objetivo:** Convertir `/` en la home de `references/templates/home-about/home.jsx` y mover la galería de juegos de `/` a `/juegos`, sin datos ni lógica nueva.

## Por qué existe esta spec

Hoy `/` es la galería de juegos.
La primera pantalla que ve un usuario nuevo debe explicar qué es Arcade Vault, así que la galería pasa a `/juegos`, junto a `/juegos/[slug]`, que ya existe.
La plantilla de `references/templates/home-about/` también trae una página «Acerca de»; esta spec la deja fuera a propósito.

## Alcance

**Dentro:**

- Nueva home en `/`, portada desde `references/templates/home-about/home.jsx`, con sus ocho bloques:
  1. Hero con siluetas pixeladas flotantes, «EXPLORAR JUEGOS» y «CREAR CUENTA».
  2. «¿POR QUÉ ARCADE VAULT?», con 4 tarjetas e iconos pixelados.
  3. «JUEGOS DISPONIBLES AHORA», con 6 mini tarjetas y «VER TODOS LOS JUEGOS».
  4. Franja de estadísticas.
  5. «ACTIVIDAD EN VIVO»: últimas puntuaciones y top de jugadores, con «VER SALÓN».
  6. «PRECIOS», con su tarjeta de plan y las preguntas frecuentes.
  7. Llamada final «¿LISTO PARA JUGAR?».
  8. Animación de aparición al hacer scroll (`reveal`).
- La galería actual se mueve de `/` a `/juegos` sin cambiar su contenido.
- La barra de navegación añade «Inicio» y «Biblioteca» pasa a apuntar a `/juegos`.
- Los enlaces de «volver» de las pantallas existentes pasan a `/juegos`.
- Los estilos de la home se añaden a `app/globals.css`: solo los bloques `HOME PAGE`, `ACTIVITY` y `PRICING` de `references/templates/home-about/styles.css`.
- La carpeta `references/templates/home-about/` entra en el repositorio como referencia, igual que el resto de `references/templates/`.

| Ruta | Antes | Después |
| --- | --- | --- |
| `/` | Galería | Home |
| `/juegos` | No existía (404) | Galería |
| `/juegos/[slug]` | Detalle | Sin cambios |
| `/juegos/[slug]/jugar` | Reproductor | Sin cambios |
| `/salon-de-la-fama` | Salón | Sin cambios |
| `/acceso` | Acceso | Sin cambios |

**Fuera de alcance (para futuras specs):**

- Página «Acerca de»: ni la ruta, ni `about.jsx`, ni el bloque `ABOUT PAGE` del CSS, ni el enlace «Acerca de» en la barra.
- Bloques `GAMEPAD` y `Theme variants` del CSS nuevo: no los usa la home.
- Datos reales en la home: estadísticas, actividad en vivo, ranking y precios siguen siendo relleno.
- Cambiar la cabecera de la galería en `/juegos`.
- Los ajustes heredados de la SPEC 01: botón ≡ cortado en móvil, textos superpuestos bajo la CRT y mayúsculas acentuadas de Press Start 2P.

## Modelo de datos

Esta feature no introduce estructuras de datos.
Como en la SPEC 01, el contenido de relleno se escribe como literales dentro de cada componente.
Las 6 mini tarjetas usan los 6 primeros juegos de la biblioteca: `bloque-buster`, `caida`, `serpentina`, `gloton`, `invasores` y `rocas`.

Convenciones (las de la SPEC 01):

- Componentes compartidos en `componentes/`, en español y PascalCase.
- Las clases CSS del prototipo se conservan sin renombrar.
- Los textos se copian literalmente de `home.jsx`, salvo «Arkanoid, Tetris, Snake y muchos más», que pasa a «Bloque Buster, Caída, Serpentina y muchos más».

Componentes nuevos:

- `componentes/SiluetasFlotantes.tsx`: los 8 SVG decorativos del hero (servidor, sin JS).
- `componentes/IconoCaracteristica.tsx`: los 4 iconos pixelados (`GAMEPAD`, `FREE`, `TROPHY`, `ROCKET`).
- `componentes/TarjetaMini.tsx`: mini tarjeta con portada CSS, título y categoría, enlazada a `/juegos/<slug>`.
- `componentes/Revelar.tsx`: componente cliente sin marcado que observa los elementos `.reveal` con `IntersectionObserver` y les añade la clase `in`, como el `useReveal` del prototipo.

## Plan de implementación

1. **Estilos de la home.**
   Añadir al final de `app/globals.css` los bloques `HOME PAGE` (líneas 930–1070), `ACTIVITY` (1621–1671) y `PRICING` (1672–1744) de `references/templates/home-about/styles.css`, copiados tal cual.
   Comprobación: `npm run build` pasa y las pantallas actuales se ven igual que antes.

2. **Galería a `/juegos` y hero de la home.**
   Mover `app/page.tsx` a `app/juegos/page.tsx` sin cambiar su contenido.
   Crear un `app/page.tsx` nuevo con el bloque 1 (hero) y `componentes/SiluetasFlotantes.tsx`.
   «EXPLORAR JUEGOS» lleva a `/juegos` y «CREAR CUENTA» a `/acceso`.
   Cambiar a `/juegos` los enlaces «VOLVER AL VAULT» de `app/juegos/[slug]/page.tsx`, «VOLVER A LA BIBLIOTECA» de `app/salon-de-la-fama/page.tsx` y «JUGAR COMO INVITADO» de `app/acceso/page.tsx`.
   Comprobación: `/` muestra el hero, `/juegos` muestra la galería de 8 tarjetas y los tres enlaces llevan a `/juegos`.

3. **Barra de navegación.**
   En `componentes/BarraNavegacion.tsx`, añadir «Inicio» (a `/`) antes de «Biblioteca», en escritorio y en el menú móvil.
   «Biblioteca» pasa a `/juegos`.
   Activo: «Inicio» solo en `/`; «Biblioteca» en `/juegos` y en `/juegos/*`.
   El logo sigue llevando a `/`.
   Comprobación: el estado activo es correcto en las 5 pantallas y en la home.

4. **«¿POR QUÉ ARCADE VAULT?» y aparición al hacer scroll.**
   Crear `componentes/IconoCaracteristica.tsx` y `componentes/Revelar.tsx`, y añadir el bloque 2 a la home con la clase `reveal`.
   Comprobación: la sección aparece con su animación al bajar hasta ella.

5. **Juegos disponibles y estadísticas.**
   Crear `componentes/TarjetaMini.tsx` y añadir los bloques 3 y 4.
   «VER TODOS LOS JUEGOS» lleva a `/juegos`.
   Comprobación: hay 6 mini tarjetas y cada una abre su `/juegos/<slug>`.

6. **Actividad en vivo.**
   Añadir el bloque 5: 7 filas de últimas puntuaciones y 5 del top de jugadores.
   «VER SALÓN →» lleva a `/salon-de-la-fama`.
   Comprobación: ambas tarjetas se ven lado a lado en escritorio.

7. **Precios y llamada final.**
   Añadir los bloques 6 y 7.
   «EMPEZAR GRATIS →» lleva a `/acceso` e «INSERTAR MONEDA →» a `/juegos`.
   Comprobación: la home completa coincide con la plantilla de arriba abajo.

8. **Limpieza y documentación.**
   Añadir `references/templates/home-about/` al repositorio.
   Actualizar `CLAUDE.md` para indicar que `/` es la home, `/juegos` la galería, y que `home-about/` es la referencia de la home y del About pendiente.
   Comprobación: `npm run lint`, `npx next typegen && npx tsc --noEmit` y `npm run build` pasan.

## Criterios de aceptación

- [ ] `npm run lint`, `npx next typegen && npx tsc --noEmit` y `npm run build` terminan sin errores.
- [ ] El check `ci` del pull request pasa.
- [ ] En `npm run dev`, `/`, `/juegos`, `/juegos/bloque-buster`, `/juegos/bloque-buster/jugar`, `/salon-de-la-fama` y `/acceso` responden 200, y `/juegos/xyz` y `/acerca-de` responden 404.
- [ ] El log de `npm run dev` no muestra errores al recorrer esas rutas.
- [ ] Ninguna de esas rutas muestra errores en la consola del navegador.
- [ ] `/` muestra los 7 bloques visibles de la home en el orden de la plantilla; tras bajar hasta el final, ninguna sección `.reveal` queda invisible.
- [ ] Las capturas de la home a 1440 px y 375 px, junto a las de `references/templates/home-about/arcade-vault-standalone.html`, no muestran diferencias de color, tipografía ni disposición, salvo las decididas en esta spec.
- [ ] `/juegos` muestra la misma galería de 8 tarjetas que había en `/` al final de la SPEC 01.
- [ ] «EXPLORAR JUEGOS», «VER TODOS LOS JUEGOS» e «INSERTAR MONEDA →» llevan a `/juegos`; «CREAR CUENTA» y «EMPEZAR GRATIS →» a `/acceso`; «VER SALÓN →» a `/salon-de-la-fama`.
- [ ] Cada una de las 6 mini tarjetas lleva a su `/juegos/<slug>`.
- [ ] «VOLVER AL VAULT» del detalle, «VOLVER A LA BIBLIOTECA» del Salón y «JUGAR COMO INVITADO» llevan a `/juegos`; el logo y la 404 llevan a `/`.
- [ ] La barra muestra «Inicio», «Biblioteca» y «Salón de la Fama», en escritorio y en el menú móvil, y no muestra «Acerca de».
- [ ] «Inicio» está activo solo en `/`; «Biblioteca» en `/juegos`, `/juegos/<slug>` y `/juegos/<slug>/jugar`.
- [ ] A 375 px, la home no tiene scroll horizontal. **Excepción aceptada:** todas las páginas miden 402 px a 375 por el botón ≡ de la barra, heredado de la SPEC 01 y fuera de alcance (la plantilla también desborda). El contenido de la home no desborda.
- [ ] Ningún archivo de `app/` ni de `componentes/` contiene «about», «acerca» ni clases del bloque `ABOUT PAGE`, y `globals.css` no contiene los bloques `ABOUT PAGE`, `GAMEPAD` ni `Theme variants`.

## Decisiones

- **Sí:** mergear la SPEC 01 antes de escribir esta. Esta spec mueve lo que la 01 creó.
- **Sí:** la galería en `/juegos`, no en `/games` como en el curso. La SPEC 01 eligió rutas en español y así encaja con `/juegos/[slug]`.
- **Sí:** About fuera de la spec, sin enlace en la barra. Un enlace a una página inexistente daría 404; se añade con la spec del About.
- **No:** enlace «Acerca de» hacia la 404 o sin destino. Visible pero roto o confuso.
- **Sí:** los «volver» de las pantallas de juego van a `/juegos`. Vuelven a donde está la galería, que es lo que hacían antes.
- **Sí:** el logo, «Inicio» y la 404 van a `/`. Son la entrada a la aplicación.
- **Sí:** animación de aparición y siluetas flotantes. Son parte del diseño; el reveal necesita un componente cliente pequeño y las siluetas son solo SVG y CSS.
- **Sí:** añadir solo `HOME PAGE`, `ACTIVITY` y `PRICING` al CSS. Mantiene el About y el gamepad fuera.
- **No:** sustituir `globals.css` por el archivo entero. Metería los estilos del About en esta spec.
- **Sí:** textos literales salvo la frase con «Arkanoid, Tetris, Snake», que usa nuestros juegos. Coherente con la biblioteca.
- **Sí:** las mini tarjetas enlazan a su detalle. Como en el prototipo.
- **Sí:** `/juegos` mantiene su cabecera actual. Mover sin rediseñar.
- **Sí (en verificación):** cerrar la spec con una excepción en el criterio de scroll horizontal. El desborde viene solo del botón ≡ de la barra, que esta spec deja fuera de alcance; su arreglo va en la spec de ajustes de móvil.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Las secciones `.reveal` empiezan con `opacity: 0`; si `Revelar` no se ejecuta, la home queda en blanco bajo el hero. | Criterio específico: tras bajar hasta el final, ninguna sección queda invisible. |
| Otro enlace a `/` que se nos pase seguiría llevando a la home en vez de a la galería. | Criterio con la lista cerrada de enlaces; buscar `href="/"` en `app/` y `componentes/` en el paso 2. |
| El servidor de desarrollo no detecta la carpeta nueva `app/juegos/page.tsx`, como pasó con `app/juegos` en la SPEC 01. | Reiniciar `npm run dev` antes de verificar. |
| Las líneas del CSS no coinciden si el archivo de la plantilla cambia. | Copiar por los comentarios de cabecera de cada bloque (`/* ===== HOME PAGE ===== */`…), no solo por número de línea. |

## Lo que **no** entra en esta spec

- Página «Acerca de» y su enlace.
- Estilos del gamepad y sus variantes de tema.
- Datos reales en la home.
- Rediseño de la cabecera de `/juegos`.
- Ajustes de móvil y tipografía heredados de la SPEC 01.

Cada uno, si llega, va en su propia spec.
