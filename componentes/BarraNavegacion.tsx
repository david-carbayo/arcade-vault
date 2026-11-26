"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Seccion = "biblioteca" | "salon" | "acceso" | null;

function seccionActiva(ruta: string): Seccion {
  if (ruta === "/" || ruta.startsWith("/juegos/")) return "biblioteca";
  if (ruta === "/salon-de-la-fama") return "salon";
  if (ruta === "/acceso") return "acceso";
  return null;
}

export default function BarraNavegacion() {
  const seccion = seccionActiva(usePathname());
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);
  const claseActiva = (s: Seccion) => (seccion === s ? "active" : "");

  return (
    <>
      <nav className="av-nav">
        <Link href="/" className="logo" onClick={cerrar}>
          <div className="logo-mark"></div>
          <div className="logo-text neon-cyan">
            ARCADE <span className="neon-magenta">VAULT</span>
          </div>
        </Link>
        <div className="links">
          <Link href="/" className={claseActiva("biblioteca")}>
            Biblioteca
          </Link>
          <Link href="/salon-de-la-fama" className={claseActiva("salon")}>
            Salón de la Fama
          </Link>
        </div>
        <div className="spacer"></div>
        <div className="coin-counter">
          <span className="coin"></span>
          <span>CRÉDITOS · 03</span>
        </div>
        <Link href="/acceso" className="btn auth-btn">
          Iniciar Sesión
        </Link>
        <button
          type="button"
          className="btn ghost hamburger"
          onClick={() => setAbierto(true)}
          aria-label="Menú"
          aria-expanded={abierto}
        >
          ≡
        </button>
      </nav>

      <div
        className={"av-mobile-backdrop" + (abierto ? " open" : "")}
        onClick={cerrar}
      ></div>
      <aside className={"av-mobile-panel" + (abierto ? " open" : "")}>
        <div className="pixel neon-cyan" style={{ fontSize: 11, marginBottom: 16 }}>
          MENÚ
        </div>
        <Link href="/" className={claseActiva("biblioteca")} onClick={cerrar}>
          Biblioteca
        </Link>
        <Link href="/salon-de-la-fama" className={claseActiva("salon")} onClick={cerrar}>
          Salón de la Fama
        </Link>
        <Link href="/acceso" className={claseActiva("acceso")} onClick={cerrar}>
          Iniciar Sesión
        </Link>
        <div style={{ flex: 1 }}></div>
        <div
          className="pixel"
          style={{ fontSize: 9, color: "var(--ink-faint)", letterSpacing: "0.16em" }}
        >
          CRÉDITOS · 03
        </div>
      </aside>
    </>
  );
}
