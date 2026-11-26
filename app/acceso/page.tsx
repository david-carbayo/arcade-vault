import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acceso",
};

export default function Acceso() {
  return (
    <div className="av-auth-wrap fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <div className="mark"></div>
          <h2 className="neon-cyan">ARCADE VAULT</h2>
          <div
            className="mono"
            style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.16em", marginTop: 6 }}
          >
            ACCESO AL SISTEMA · v2.6
          </div>
        </div>

        <div className="auth-tabs">
          <button type="button" className="on">
            INICIAR SESIÓN
          </button>
          <button type="button">CREAR CUENTA</button>
        </div>

        <form>
          <div className="field">
            <label htmlFor="usuario">Usuario</label>
            <input id="usuario" placeholder="px_kai" autoComplete="off" />
          </div>
          <div className="field">
            <label htmlFor="contrasena">Contraseña</label>
            <input id="contrasena" type="password" placeholder="••••••••" autoComplete="off" />
          </div>

          <button className="btn lg" type="button" style={{ width: "100%", marginTop: 8 }}>
            ENTRAR AL VAULT
          </button>
        </form>

        <Link href="/" className="btn ghost" style={{ width: "100%", marginTop: 10 }}>
          JUGAR COMO INVITADO
        </Link>

        <div className="auth-divider">O CONTINÚA CON</div>
        <div className="social">
          <button className="btn ghost" type="button">
            ◆  GOOGLE
          </button>
          <button className="btn ghost" type="button">
            ▣  GITHUB
          </button>
        </div>

        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            fontSize: 11,
            color: "var(--ink-faint)",
            letterSpacing: "0.1em",
          }}
        >
          AL ENTRAR ACEPTAS LOS TÉRMINOS DEL SALÓN ARCADE
        </div>
      </div>
    </div>
  );
}
