// Pure helpers for product ratings (1-5 stars). Independent of cart code.
export const MAX_STARS = 5;

// Keep only whole-number ratings between 1 and 5.
export function validRatings(ratings) {
  return (Array.isArray(ratings) ? ratings : []).filter(
    (r) => Number.isInteger(r) && r >= 1 && r <= MAX_STARS
  );
}

// Average rounded to one decimal; 0 when there are no valid ratings.
export function averageRating(ratings) {
  const list = validRatings(ratings);
  if (!list.length) return 0;
  const avg = list.reduce((a, b) => a + b, 0) / list.length;
  return Math.round(avg * 10) / 10;
}

// Star string such as "★★★★☆", rounded to the nearest whole star.
export function starString(avg) {
  const n = Math.min(MAX_STARS, Math.max(0, Math.round(Number(avg) || 0)));
  return "★".repeat(n) + "☆".repeat(MAX_STARS - n);
}

// Count of ratings per star value, e.g. { 1: 0, 2: 1, 3: 0, 4: 2, 5: 5 }.
export function ratingBreakdown(ratings) {
  const out = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of validRatings(ratings)) out[r] += 1;
  return out;
}

// Human label like "4.3 (12 reviews)" or "No reviews yet".
export function ratingLabel(ratings) {
  const n = validRatings(ratings).length;
  if (!n) return "No reviews yet";
  return `${averageRating(ratings).toFixed(1)} (${n} ${n === 1 ? "review" : "reviews"})`;
}
