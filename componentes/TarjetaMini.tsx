import Link from "next/link";

type Props = {
  slug: string;
  titulo: string;
  categoria: string;
  portada: string;
};

export default function TarjetaMini({ slug, titulo, categoria, portada }: Props) {
  return (
    <Link href={`/juegos/${slug}`} className="mini-card">
      <div className="mini-cover">
        <div className={`cover-bg ${portada}`}></div>
      </div>
      <div className="mini-meta">
        <div className="mini-title">{titulo}</div>
        <div className="mini-cat">{categoria}</div>
      </div>
    </Link>
  );
}
