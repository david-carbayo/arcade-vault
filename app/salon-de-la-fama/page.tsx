import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Salón de la Fama",
};

const JUEGOS = [
  "BLOQUE BUSTER",
  "CAÍDA",
  "SERPENTINA",
  "GLOTÓN",
  "INVASORES",
  "ROCAS",
  "RANARIA",
  "DUELO PIXEL",
];

const PUNTUACIONES = [
  { nombre: "RGB_QUEEN", puntos: 275088, fecha: "20/05/2026" },
  { nombre: "GLITCHA", puntos: 232454, fecha: "20/06/2026" },
  { nombre: "Z3R0COOL", puntos: 232104, fecha: "05/03/2026" },
  { nombre: "DROID_X", puntos: 214488, fecha: "20/05/2026" },
  { nombre: "MAGENTA88", puntos: 210081, fecha: "19/08/2026" },
  { nombre: "VAULT_07", puntos: 209958, fecha: "01/10/2026" },
  { nombre: "CYBER_LU", puntos: 174442, fecha: "16/05/2026" },
  { nombre: "NEONFOX", puntos: 160117, fecha: "20/05/2026" },
  { nombre: "PIXEL_DAD", puntos: 140654, fecha: "19/01/2026" },
  { nombre: "ARKADYA", puntos: 112969, fecha: "19/11/2026" },
  { nombre: "VECTORX", puntos: 35990, fecha: "10/01/2026" },
  { nombre: "PX_KAI", puntos: 4146, fecha: "13/02/2026" },
];

const CLASE_PODIO = [" top1", " top2", " top3"];

const puntos = (n: number) => n.toLocaleString("es-ES");

export default function SalonDeLaFama() {
  const [primero, segundo, tercero] = PUNTUACIONES;

  return (
    <div className="av-hall fade-in">
      <div className="hall-head">
        <h1>SALÓN DE LA FAMA</h1>
        <p className="pixel" style={{ fontSize: 10 }}>
          LOS NOMBRES QUE NUNCA SE BORRAN DE LA PANTALLA
        </p>
      </div>

      <div className="hall-tabs">
        {JUEGOS.map((titulo, i) => (
          <button key={titulo} type="button" className={"chip" + (i === 0 ? " active" : "")}>
            {titulo}
          </button>
        ))}
      </div>

      <div className="podium">
        <div className="podium-slot silver">
          <div className="rank-num">02</div>
          <div className="name">{segundo.nombre}</div>
          <div className="score">{puntos(segundo.puntos)}</div>
          <div className="date">{segundo.fecha}</div>
        </div>
        <div className="podium-slot gold">
          <div className="pixel" style={{ fontSize: 9, color: "var(--gold)", letterSpacing: "0.18em" }}>
            CAMPEÓN
          </div>
          <div className="rank-num" style={{ fontSize: 36, marginTop: 4 }}>
            01
          </div>
          <div className="name">{primero.nombre}</div>
          <div className="score" style={{ fontSize: 20 }}>
            {puntos(primero.puntos)}
          </div>
          <div className="date">{primero.fecha}</div>
        </div>
        <div className="podium-slot bronze">
          <div className="rank-num">03</div>
          <div className="name">{tercero.nombre}</div>
          <div className="score">{puntos(tercero.puntos)}</div>
          <div className="date">{tercero.fecha}</div>
        </div>
      </div>

      <div className="hall-table">
        <div className="th">
          <div>RANGO</div>
          <div>JUGADOR</div>
          <div>PUNTUACIÓN</div>
          <div>FECHA</div>
        </div>
        {PUNTUACIONES.map((p, i) => (
          <div
            key={p.nombre}
            className={"tr" + (CLASE_PODIO[i] ?? "")}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="rk">#{String(i + 1).padStart(2, "0")}</div>
            <div className="pl">{p.nombre}</div>
            <div className="sc">{puntos(p.puntos)}</div>
            <div className="dt">{p.fecha}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link href="/juegos" className="btn lg">
          VOLVER A LA BIBLIOTECA
        </Link>
      </div>
    </div>
  );
}
