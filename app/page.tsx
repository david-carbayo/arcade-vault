import type { Metadata } from "next";
import TarjetaJuego from "@/componentes/TarjetaJuego";

export const metadata: Metadata = {
  title: "Biblioteca",
};

const CATEGORIAS = ["TODOS", "ARCADE", "PUZZLE", "SHOOTER", "VERSUS"];

export default function Biblioteca() {
  return (
    <div className="fade-in">
      <section className="av-hero">
        <h1 className="flicker">ARCADE VAULT</h1>
        <div className="sub">
          INSERTA UNA MONEDA PARA JUGAR <span className="blink">_</span>
        </div>
      </section>

      <div className="av-filters">
        <div className="av-search">
          <span className="ico">⌕</span>
          <input placeholder="Buscar un juego por nombre…" aria-label="Buscar un juego" />
        </div>
        <div className="av-chips">
          {CATEGORIAS.map((c) => (
            <button key={c} type="button" className={"chip" + (c === "TODOS" ? " active" : "")}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="av-grid">
        <TarjetaJuego
          slug="bloque-buster"
          titulo="BLOQUE BUSTER"
          descripcion="Rebota la pelota y destruye muros de neón."
          categoria="ARCADE"
          portada="cover-bricks"
          color="cyan"
          mejor={28450}
        />
        <TarjetaJuego
          slug="caida"
          titulo="CAÍDA"
          descripcion="Encaja las piezas antes de que el techo te aplaste."
          categoria="PUZZLE"
          portada="cover-tetro"
          color="magenta"
          mejor={184220}
        />
        <TarjetaJuego
          slug="serpentina"
          titulo="SERPENTINA"
          descripcion="Crece sin morder tu propia cola."
          categoria="ARCADE"
          portada="cover-snake"
          color="green"
          mejor={7820}
        />
        <TarjetaJuego
          slug="gloton"
          titulo="GLOTÓN"
          descripcion="Devora puntos y escapa de los fantasmas."
          categoria="ARCADE"
          portada="cover-glot"
          color="yellow"
          mejor={96400}
        />
        <TarjetaJuego
          slug="invasores"
          titulo="INVASORES"
          descripcion="Defiende el planeta de filas alienígenas."
          categoria="SHOOTER"
          portada="cover-invaders"
          color="green"
          mejor={54190}
        />
        <TarjetaJuego
          slug="rocas"
          titulo="ROCAS"
          descripcion="Pulveriza asteroides en gravedad cero."
          categoria="SHOOTER"
          portada="cover-rocas"
          color="yellow"
          mejor={41200}
        />
        <TarjetaJuego
          slug="ranaria"
          titulo="RANARIA"
          descripcion="Cruza la autopista de pixeles."
          categoria="ARCADE"
          portada="cover-rana"
          color="green"
          mejor={18900}
        />
        <TarjetaJuego
          slug="duelo-pixel"
          titulo="DUELO PIXEL"
          descripcion="Dos paletas. Una pelota. Reflejos máximos."
          categoria="VERSUS"
          portada="cover-duelo"
          color="cyan"
          mejor={24}
        />
      </div>
    </div>
  );
}
