import Link from "next/link";

type Props = {
  slug: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  portada: string;
  color: "cyan" | "magenta" | "yellow" | "green";
  mejor: number;
};

const claseBoton: Record<Props["color"], string> = {
  cyan: "btn",
  magenta: "btn magenta",
  yellow: "btn yellow",
  green: "btn",
};

export default function TarjetaJuego({
  slug,
  titulo,
  descripcion,
  categoria,
  portada,
  color,
  mejor,
}: Props) {
  return (
    <Link href={`/juegos/${slug}`} className="card">
      <div className="cover">
        <div className={`cover-bg ${portada}`}></div>
        <div className="label">{categoria}</div>
      </div>
      <div className="meta">
        <div className="title">{titulo}</div>
        <div className="desc">{descripcion}</div>
        <div className="row">
          <div className="score-badge">
            <span>MEJOR PUNTUACIÓN</span>
            <b>{mejor.toLocaleString("es-ES")}</b>
          </div>
          <span className={claseBoton[color]}>JUGAR</span>
        </div>
      </div>
    </Link>
  );
}
