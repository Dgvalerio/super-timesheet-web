export const distinctByCode = <Item>(
  items: (Item & { code?: string })[]
): Item[] => {
  const aux: string[] = [];

  return items.filter(({ code }) => {
    if (!code) return false;

    const inAux = aux.includes(code);

    if (!inAux) aux.push(code);

    return !inAux;
  });
};
