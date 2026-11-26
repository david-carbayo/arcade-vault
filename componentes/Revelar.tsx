"use client";

import { useEffect } from "react";

// Adds the "in" class to every .reveal element as it scrolls into view,
// like useReveal in the prototype. Renders nothing.
export default function Revelar() {
  useEffect(() => {
    const elementos = document.querySelectorAll(".reveal");
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("in");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  return null;
}
