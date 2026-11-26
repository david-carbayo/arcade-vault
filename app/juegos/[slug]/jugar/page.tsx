import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { esSlugDeEjemplo, SLUGS_DE_EJEMPLO } from "@/componentes/slugs";

// Unknown slugs wait for the full render, so notFound() can still send a 404 status.
// That means params is awaited outside <Suspense>, so this route is allowed to block.
export const ensureStatic = "navigation";
export const instant = false;

export function generateStaticParams() {
  return SLUGS_DE_EJEMPLO.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/juegos/[slug]/jugar">): Promise<Metadata> {
  const { slug } = await params;
  return { title: esSlugDeEjemplo(slug) ? "Jugando BLOQUE BUSTER" : "Pantalla no encontrada" };
}

export default async function Reproductor({ params }: PageProps<"/juegos/[slug]/jugar">) {
  const { slug } = await params;
  if (!esSlugDeEjemplo(slug)) notFound();

  return (
    <div className="av-player fade-in">
      <div className="player-hud">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div className="hud-stat">
            <div className="l">Jugador</div>
            <div className="v" style={{ color: "var(--ink)" }}>
              INVITADO
            </div>
          </div>
          <div className="hud-stat">
            <div className="l">Puntuación</div>
            <div className="v">0</div>
          </div>
          <div className="hud-stat lives">
            <div className="l">Vidas</div>
            <div className="v">♥ ♥ ♥</div>
          </div>
          <div className="hud-stat level">
            <div className="l">Nivel</div>
            <div className="v">01</div>
          </div>
        </div>
        <div className="hud-actions">
          <button type="button" className="btn yellow">
            PAUSA
          </button>
          <button type="button" className="btn magenta">
            FIN
          </button>
          <Link href={`/juegos/${slug}`} className="btn ghost">
            SALIR
          </Link>
        </div>
      </div>

      <div className="crt">
        <div className="crt-screen">
          <div className="game-arena">
            <div className="grid-floor"></div>
            <div className="enemy e1"></div>
            <div className="enemy e2"></div>
            <div className="enemy e3"></div>
            <div className="player-ship"></div>
          </div>
        </div>
        <div className="crt-bottom">
          <span className="led">SEÑAL OK</span>
          <span>BLOQUE BUSTER · CRT-83 · 60 HZ</span>
          <span>CARGA · 1MB</span>
        </div>
      </div>
    </div>
  );
}
