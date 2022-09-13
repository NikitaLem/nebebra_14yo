export const getRandomInRange = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

export const createCombinationsArray = (
  n: number,
  m: number
): [number, number][] => {
  const combination: [number, number][] = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      combination.push([i, j]);
    }
  }

  return combination;
};

export const getNeighborsCoords = (
  x: number,
  y: number,
  sizeX: number,
  sizeY: number
) => {
  const coords = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];
  const filtredCoords = coords.filter(
    ([x, y]) => x >= 0 && x < sizeX && y >= 0 && y < sizeY
  );
  return filtredCoords;
};
