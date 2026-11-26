export const SLUGS_DE_EJEMPLO = [
  "bloque-buster",
  "caida",
  "serpentina",
  "gloton",
  "invasores",
  "rocas",
  "ranaria",
  "duelo-pixel",
] as const;

export function esSlugDeEjemplo(slug: string): boolean {
  return (SLUGS_DE_EJEMPLO as readonly string[]).includes(slug);
}
