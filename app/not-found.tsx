import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pantalla no encontrada",
};

export default function NoEncontrado() {
  return (
    <div className="fade-in">
      <section className="av-hero">
        <h1 className="flicker">GAME OVER · 404</h1>
        <div className="sub">
          ESTA PANTALLA NO EXISTE EN EL VAULT <span className="blink">_</span>
        </div>
      </section>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <Link href="/" className="btn lg">
          VOLVER AL VAULT
        </Link>
      </div>
    </div>
  );
}
