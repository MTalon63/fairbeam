// Some design sections are optional on disk, but the designer reads them directly (the ribbon's live
// titles, the inspector, Simulation settings). python/fairbeam/design.py defaults an omitted section
// the same way, so a loaded design gets those defaults before it reaches the UI; saving writes them
// back. `mesh` and `far_field` are the two the Rust-free build reads eagerly.
import type { Design } from "./types";

/** What design.py builds for an omitted or empty `mesh` (m.get("mode", "auto"), cells_per_wavelength
 * default 20, refine_features default false). */
const MESH_DEFAULTS: Design["mesh"] = { mode: "auto", cells_per_wavelength: 20, refine_features: false };

/** The design with the optional `mesh` and `far_field` sections the app reads present. */
export function ensureDesign(d: Design): Design {
  const patch: Partial<Design> = {};
  if (!d.far_field) patch.far_field = { enabled: true };
  if (!d.mesh || Object.keys(d.mesh).length === 0) patch.mesh = { ...MESH_DEFAULTS };
  return Object.keys(patch).length ? { ...d, ...patch } : d;
}
