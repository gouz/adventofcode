export const calc = (input: string, nbiterations = -1) => {
  const junctions: number[][] = input
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split(",").map(Number));
  const distances: { from: number; to: number; distance: number }[] = [];
  for (let i = 0; i < junctions.length; i++) {
    for (let j = i + 1; j < junctions.length; j++) {
      const distance = Math.sqrt(
        (junctions[i][0] - junctions[j][0]) ** 2 +
          (junctions[i][1] - junctions[j][1]) ** 2 +
          (junctions[i][2] - junctions[j][2]) ** 2,
      );
      distances.push({ from: i, to: j, distance });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);
  const circuits: Set<number>[] = [];

  const stop = nbiterations === -1 ? distances.length : nbiterations;
  let part2 = 0;
  for (let i = 0; i < stop; i++) {
    const { from, to } = distances[i];

    const circuitFrom = circuits.findIndex((c) => c.has(from));
    const circuitTo = circuits.findIndex((c) => c.has(to));

    if (circuitFrom === -1 && circuitTo === -1) {
      circuits.push(new Set([from, to]));
    } else if (circuitFrom !== -1 && circuitTo === -1) {
      circuits[circuitFrom].add(to);
    } else if (circuitFrom === -1 && circuitTo !== -1) {
      circuits[circuitTo].add(from);
    } else if (circuitFrom !== circuitTo) {
      // fusion
      circuits[circuitTo].forEach((node) => {
        circuits[circuitFrom].add(node);
      });
      circuits.splice(circuitTo, 1);
    }

    if (
      circuits.length === 1 &&
      circuits[0].size === junctions.length &&
      part2 === 0
    ) {
      part2 = junctions[from][0] * junctions[to][0];
    }
  }

  return {
    part1: circuits
      .map((c) => c.size)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, i) => acc * i, 1),
    part2,
  };
};
