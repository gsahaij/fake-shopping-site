// Pure helpers to keep the search/sort view in the URL query string,
// so a filtered view can be bookmarked or shared.
export const SORT_MODES = ["default", "price-asc", "price-desc", "name"];

// Parse "?q=duck&sort=name" into a safe { q, sort } object.
export function parseViewState(search) {
  const params = new URLSearchParams(String(search || ""));
  const q = (params.get("q") || "").trim();
  const sortParam = params.get("sort");
  const sort = SORT_MODES.includes(sortParam) ? sortParam : "default";
  return { q, sort };
}

// Build a query string ("" when everything is default, otherwise "?q=...").
export function buildViewQuery({ q = "", sort = "default" } = {}) {
  const params = new URLSearchParams();
  const query = String(q || "").trim();
  if (query) params.set("q", query);
  if (SORT_MODES.includes(sort) && sort !== "default") params.set("sort", sort);
  const s = params.toString();
  return s ? `?${s}` : "";
}
