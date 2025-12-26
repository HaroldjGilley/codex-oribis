export const ORBS = [
  "ESSE","IPSUM","ALTER","CONIUNCTA","OPPOSITIO",
  "CONSCIUS","POTENTIA","FINIS","MUTATIO",
  "AEQUITAS","TEMPUS","VERUM"
];

export function evaluate(orbs) {
  let errors = [];

  // Type V — orphaned orb
  orbs.forEach(o => {
    if (!o.links || o.links.length === 0) {
      errors.push("V");
    }
  });

  // Type IV — VERUM cannot be nested
  orbs.forEach(a => {
    if (a.type === "VERUM") {
      orbs.forEach(b => {
        if (a !== b && distance(a,b) + a.r < b.r) {
          errors.push("IV");
        }
      });
    }
  });

  let state = "STABLE";
  if (errors.includes("II") || errors.includes("VII")) state = "COLLAPSE";
  else if (errors.length > 0) state = "TENSION";

  return { state, errors: [...new Set(errors)] };
}

function distance(a,b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
