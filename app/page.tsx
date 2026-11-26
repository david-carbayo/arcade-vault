import Link from "next/link";
import IconoCaracteristica, { type TipoIcono } from "@/componentes/IconoCaracteristica";
import Revelar from "@/componentes/Revelar";
import SiluetasFlotantes from "@/componentes/SiluetasFlotantes";
import TarjetaMini from "@/componentes/TarjetaMini";

const JUEGOS_DESTACADOS = [
  { slug: "bloque-buster", titulo: "BLOQUE BUSTER", categoria: "ARCADE", portada: "cover-bricks" },
  { slug: "caida", titulo: "CAÍDA", categoria: "PUZZLE", portada: "cover-tetro" },
  { slug: "serpentina", titulo: "SERPENTINA", categoria: "ARCADE", portada: "cover-snake" },
  { slug: "gloton", titulo: "GLOTÓN", categoria: "ARCADE", portada: "cover-glot" },
  { slug: "invasores", titulo: "INVASORES", categoria: "SHOOTER", portada: "cover-invaders" },
  { slug: "rocas", titulo: "ROCAS", categoria: "SHOOTER", portada: "cover-rocas" },
];

const ULTIMAS_PUNTUACIONES = [
  { jugador: "NEONFOX", juego: "Caída", puntos: 184220, hace: "hace 2 min", color: "magenta" },
  { jugador: "PX_KAI", juego: "Glotón", puntos: 96400, hace: "hace 5 min", color: "yellow" },
  { jugador: "Z3R0COOL", juego: "Invasores", puntos: 54190, hace: "hace 8 min", color: "green" },
  { jugador: "VAULT_07", juego: "Rocas", puntos: 41200, hace: "hace 12 min", color: "cyan" },
  { jugador: "GLITCHA", juego: "Bloque Buster", puntos: 28450, hace: "hace 18 min", color: "cyan" },
  { jugador: "ARKADYA", juego: "Serpentina", puntos: 7820, hace: "hace 24 min", color: "green" },
  { jugador: "CYBER_LU", juego: "Ranaria", puntos: 18900, hace: "hace 31 min", color: "yellow" },
];

const TOP_JUGADORES = [
  { jugador: "NEONFOX", puntos: 312840 },
  { jugador: "PX_KAI", puntos: 248110 },
  { jugador: "M00NRYU", puntos: 196720 },
  { jugador: "VAULT_07", puntos: 154300 },
  { jugador: "GLITCHA", puntos: 138900 },
];

const CLASE_PODIO = [" top1", " top2", " top3"];

const PREGUNTAS = [
  {
    pregunta: "¿REALMENTE ES GRATIS?",
    respuesta:
      'Sí. Arcade Vault es un proyecto sin fines de lucro hecho por amor a los clásicos. No hay versión "premium" escondida.',
  },
  {
    pregunta: "¿NECESITO CREAR CUENTA?",
    respuesta:
      "No. Puedes jugar como invitado. Si quieres guardar tu puntuación y aparecer en el ranking, regístrate en 10 segundos.",
  },
  {
    pregunta: "¿CÓMO SOBREVIVEN SIN COBRAR?",
    respuesta:
      "Es un proyecto comunitario. Si te gusta, compártelo. Esa es toda la moneda que aceptamos.",
  },
];

const ESTADISTICAS = [
  { numero: "12+", unidad: "JUEGOS", subtitulo: "Y CONTANDO" },
  { numero: "MILES", unidad: "DE PARTIDAS", subtitulo: "JUGADAS CADA DÍA" },
  { numero: "GLOBAL", unidad: "RANKING", subtitulo: "COMPITE CON EL MUNDO" },
];

const CARACTERISTICAS: { icono: TipoIcono; titulo: string; descripcion: string; color: string }[] = [
  {
    icono: "GAMEPAD",
    titulo: "JUEGOS CLÁSICOS",
    descripcion:
      "Bloque Buster, Caída, Serpentina y muchos más. Los mejores arcades de todos los tiempos en un solo lugar.",
    color: "cyan",
  },
  {
    icono: "FREE",
    titulo: "100% GRATIS",
    descripcion: "Sin suscripciones, sin pagos ocultos. Todos los juegos disponibles de forma gratuita.",
    color: "yellow",
  },
  {
    icono: "TROPHY",
    titulo: "LADDER BOARDS",
    descripcion:
      "Compite con jugadores de todo el mundo. Escala el ranking y demuestra quién es el mejor.",
    color: "magenta",
  },
  {
    icono: "ROCKET",
    titulo: "SIEMPRE CRECIENDO",
    descripcion:
      "Agregamos nuevos juegos constantemente. Vuelve seguido, siempre habrá algo nuevo que jugar.",
    color: "green",
  },
];

export default function Inicio() {
  return (
    <div className="home fade-in">
      <section className="home-hero">
        <SiluetasFlotantes />
        <div className="home-hero-inner">
          <div className="hero-eyebrow pixel neon-yellow">
            ▸ INSERTA UNA MONEDA<span className="blink">_</span>
          </div>
          <h1 className="home-title">
            <span className="line-1">EL ARCADE</span>
            <span className="line-2">CLÁSICO ESTÁ</span>
            <span className="line-3">DE VUELTA</span>
          </h1>
          <p className="home-sub">
            Juega los mejores clásicos directamente en tu navegador.
            <br />
            Sin descargas. Sin costo. Solo diversión.
          </p>
          <div className="home-ctas">
            <Link href="/juegos" className="btn xl pulse">
              ▶  EXPLORAR JUEGOS
            </Link>
            <Link href="/acceso" className="btn xl magenta">
              ✦  CREAR CUENTA
            </Link>
          </div>
          <div className="hero-scroll" aria-hidden="true">
            <span>DESLIZA</span>
            <span className="arrow">▼</span>
          </div>
        </div>
      </section>

      <section className="home-section reveal">
        <div className="section-head">
          <div className="kicker pixel neon-magenta">{"// 01"}</div>
          <h2 className="section-title">¿POR QUÉ ARCADE VAULT?</h2>
          <div className="section-rule"></div>
        </div>
        <div className="feature-grid">
          {CARACTERISTICAS.map((f, i) => (
            <div
              key={f.titulo}
              className={"feature-card " + f.color}
              style={{ transitionDelay: i * 80 + "ms" }}
            >
              <IconoCaracteristica tipo={f.icono} />
              <div className="ft-title pixel">{f.titulo}</div>
              <div className="ft-desc">{f.descripcion}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section reveal">
        <div className="section-head">
          <div className="kicker pixel neon-cyan">{"// 02"}</div>
          <h2 className="section-title">JUEGOS DISPONIBLES AHORA</h2>
          <div className="section-rule"></div>
        </div>
        <div className="mini-rail">
          {JUEGOS_DESTACADOS.map((j) => (
            <TarjetaMini key={j.slug} {...j} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/juegos" className="btn lg">
            VER TODOS LOS JUEGOS →
          </Link>
        </div>
      </section>

      <section className="home-stats reveal">
        <div className="stats-inner">
          {ESTADISTICAS.map((st, i) => (
            <div key={st.numero} className="stat-block" style={{ transitionDelay: i * 90 + "ms" }}>
              <div className="stat-n neon-yellow">{st.numero}</div>
              <div className="stat-u pixel">{st.unidad}</div>
              <div className="stat-s">{st.subtitulo}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section reveal">
        <div className="section-head">
          <div className="kicker pixel neon-yellow">{"// 03"}</div>
          <h2 className="section-title">ACTIVIDAD EN VIVO</h2>
          <div className="section-rule"></div>
        </div>
        <div className="activity-grid">
          <div className="activity-card">
            <div className="ac-head">
              <div className="ac-title pixel">▸ ÚLTIMAS PUNTUACIONES</div>
            </div>
            <div className="ticker">
              {ULTIMAS_PUNTUACIONES.map((r, i) => (
                <div key={r.jugador} className="tick-row" style={{ animationDelay: i * 60 + "ms" }}>
                  <span className={"tk-p neon-" + r.color}>{r.jugador}</span>
                  <span className="tk-mid">▸ {r.juego}</span>
                  <span className="tk-s">+{r.puntos.toLocaleString("es-ES")}</span>
                  <span className="tk-t">{r.hace}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-card">
            <div className="ac-head">
              <div className="ac-title pixel neon-magenta">▸ TOP JUGADORES · HOY</div>
              <Link href="/salon-de-la-fama" className="lb-link">
                VER SALÓN →
              </Link>
            </div>
            <div className="top-list">
              {TOP_JUGADORES.map((r, i) => (
                <div key={r.jugador} className={"top-row" + (CLASE_PODIO[i] ?? "")}>
                  <span className="tp-rk">#{String(i + 1).padStart(2, "0")}</span>
                  <span className="tp-bar">
                    <span className="tp-fill" style={{ width: 100 - i * 16 + "%" }}></span>
                  </span>
                  <span className="tp-p">{r.jugador}</span>
                  <span className="tp-s">{r.puntos.toLocaleString("es-ES")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section reveal">
        <div className="section-head">
          <div className="kicker pixel neon-green">{"// 04"}</div>
          <h2 className="section-title">PRECIOS</h2>
          <div className="section-rule"></div>
        </div>
        <div className="pricing-grid">
          <div className="price-card">
            <div className="pc-label pixel">PLAN ÚNICO</div>
            <div className="pc-name pixel">JUGADOR VAULT</div>
            <div className="pc-amount">
              <span className="pc-amount-n">$0</span>
              <span className="pc-amount-u">/ SIEMPRE</span>
            </div>
            <div className="pc-tag">SIN TRUCOS · SIN LETRA PEQUEÑA</div>
            <ul className="pc-list">
              <li>✔ Acceso a todos los juegos</li>
              <li>✔ Ranking global y salón de la fama</li>
              <li>✔ Sin anuncios entre partidas</li>
              <li>✔ Guarda tus puntuaciones</li>
              <li>✔ Nuevos juegos cada mes</li>
              <li>✔ Funciona en cualquier navegador</li>
            </ul>
            <Link href="/acceso" className="btn xl pulse" style={{ width: "100%" }}>
              EMPEZAR GRATIS →
            </Link>
            <div className="pc-foot">No pedimos tarjeta. Nunca lo haremos.</div>
            <div className="pc-stamp pixel">
              FREE
              <br />
              PLAY
            </div>
          </div>

          <div className="pricing-faq">
            {PREGUNTAS.map((p) => (
              <div key={p.pregunta} className="faq-item">
                <div className="faq-q pixel">{p.pregunta}</div>
                <div className="faq-a">{p.respuesta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-final reveal">
        <h2 className="final-title pixel">¿LISTO PARA JUGAR?</h2>
        <Link href="/juegos" className="btn xl pulse final-cta">
          INSERTAR MONEDA →
        </Link>
        <div className="final-tag">Gratis. Sin registro obligatorio. Empieza en segundos.</div>
      </section>

      <Revelar />
    </div>
  );
}
