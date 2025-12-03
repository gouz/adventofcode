export const calc = (input: string) => {
  const racers = input
    .split("\n")
    .map(
      (line) =>
        line
          .match(
            /^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/,
          )
          ?.slice(1) || [],
    );

  const run = (racer: string[], nbSeconds: number) => {
    const [name, speed, duration, rest] = racer;
    const period = Number(duration) + Number(rest);
    const cycles = Math.floor(nbSeconds / period);
    return {
      name,
      distance:
        Number(speed) *
        (Number(duration) * cycles +
          Math.min(nbSeconds % period, Number(duration))),
    };
  };

  const part1 = Math.max(...racers.map((racer) => run(racer, 2503).distance));

  const distances: { [key: string]: number }[] = [];

  for (let i = 0; i <= 2503; ++i) {
    racers.forEach((racer, _) => {
      distances[i] = distances[i] || {};
      distances[i][racer[0]] = run(racer, i).distance;
    });
  }

  const points: { [key: string]: number } = {};

  distances.forEach((d, _) => {
    const bestdist = Object.values(
      Object.fromEntries(Object.entries(d).sort(([, a], [, b]) => b - a)),
    )[0];
    Object.entries(d).forEach(([k, v], _) => {
      if (v === bestdist) points[k] = (points[k] || 0) + 1;
    });
  });

  const part2 = Math.max(...Object.values(points)) - 1;

  return { part1, part2 };
};
