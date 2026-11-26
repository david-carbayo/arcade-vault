import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { esSlugDeEjemplo, SLUGS_DE_EJEMPLO } from "@/componentes/slugs";

export async function generateMetadata({
  params,
}: PageProps<"/juegos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: esSlugDeEjemplo(slug) ? "BLOQUE BUSTER" : "Pantalla no encontrada" };
}

// Unknown slugs wait for the full render, so notFound() can still send a 404 status.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return SLUGS_DE_EJEMPLO.map((slug) => ({ slug }));
}

const PUNTUACIONES = [
  { nombre: "Z3R0COOL", puntos: 288295, fecha: "26/10/2026" },
  { nombre: "VAULT_07", puntos: 265726, fecha: "26/07/2026" },
  { nombre: "ARKADYA", puntos: 263269, fecha: "03/08/2026" },
  { nombre: "GLITCHA", puntos: 253385, fecha: "10/08/2026" },
  { nombre: "MAGENTA88", puntos: 197855, fecha: "07/09/2026" },
  { nombre: "NEONFOX", puntos: 147679, fecha: "10/02/2026" },
  { nombre: "RETROVIRA", puntos: 90057, fecha: "17/12/2026" },
  { nombre: "VECTORX", puntos: 77325, fecha: "03/05/2026" },
  { nombre: "M00NRYU", puntos: 66441, fecha: "24/02/2026" },
  { nombre: "ATARI_KID", puntos: 44370, fecha: "15/12/2026" },
];

const CLASE_PODIO = [" top1", " top2", " top3"];

export default async function DetalleJuego({ params }: PageProps<"/juegos/[slug]">) {
  const { slug } = await params;
  if (!esSlugDeEjemplo(slug)) notFound();

  return (
    <div className="av-detail fade-in">
      <div>
        <div className="detail-cover">
          <div className="cover-bg cover-bricks"></div>
        </div>
        <div style={{ marginTop: 20 }} className="detail-info">
          <div className="detail-tags">
            <span>ARCADE</span>
            <span>1 JUGADOR</span>
            <span>TECLADO / TÁCTIL</span>
            <span>RETRO 1985</span>
          </div>
          <h2 className="neon-cyan">BLOQUE BUSTER</h2>
          <p>
            Pilota una nave-paleta y rebota un núcleo de plasma para pulverizar muros de bloques
            cromáticos. Cada nivel reorganiza la grilla en patrones imposibles. ¿Hasta dónde llegará
            tu racha?
          </p>
          <div className="stat-strip">
            <div>
              <div className="l">Partidas</div>
              <div className="v">12.4K</div>
            </div>
            <div>
              <div className="l">Mejor global</div>
              <div
                className="v"
                style={{ color: "var(--magenta)", textShadow: "0 0 6px rgba(255,0,110,0.5)" }}
              >
                {(28450).toLocaleString("es-ES")}
              </div>
            </div>
            <div>
              <div className="l">Dificultad</div>
              <div
                className="v"
                style={{ color: "var(--yellow)", textShadow: "0 0 6px rgba(245,255,0,0.5)" }}
              >
                ★ ★ ★ ☆ ☆
              </div>
            </div>
          </div>
          <div className="detail-actions">
            <Link href={`/juegos/${slug}/jugar`} className="btn xl pulse">
              ▶  JUGAR AHORA
            </Link>
            <Link href="/" className="btn ghost lg">
              VOLVER AL VAULT
            </Link>
          </div>
        </div>
      </div>

      <aside>
        <div className="leaderboard">
          <h3>MEJORES PUNTUACIONES</h3>
          {PUNTUACIONES.map((p, i) => (
            <div key={p.nombre} className={"lb-row" + (CLASE_PODIO[i] ?? "")}>
              <div className="rk">#{String(i + 1).padStart(2, "0")}</div>
              <div className="pl">
                {p.nombre}
                <div style={{ fontSize: 10, color: "var(--ink-faint)", letterSpacing: "0.1em" }}>
                  {p.fecha}
                </div>
              </div>
              <div className="sc">{p.puntos.toLocaleString("es-ES")}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
