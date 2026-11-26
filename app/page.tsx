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

      <Revelar />
    </div>
  );
}
