// Builds display-ready cart line items: name, quantity, unit and line totals (cents).
export function cartLines(cart, products) {
  return Object.entries(cart).flatMap(([id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    if (!p || qty <= 0) return [];
    const unitCents = Math.round(p.price * 100);
    return [{ id: p.id, name: p.name, qty, unitCents, lineCents: unitCents * qty }];
  });
}
