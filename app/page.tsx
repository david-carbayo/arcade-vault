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

      <Revelar />
    </div>
  );
}
