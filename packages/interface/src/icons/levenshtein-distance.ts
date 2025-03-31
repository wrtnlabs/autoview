export function levenshteinDistance(a: string, b: string): number {
  const s1 = a.toLowerCase();
  const s2 = b.toLowerCase();
  const costs = new Map<number, number>();

  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;

    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs.set(j, j);
        continue;
      }

      if (0 < j) {
        let newValue = costs.get(j - 1)!;

        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs.get(j)!) + 1;
        }

        costs.set(j - 1, lastValue);
        lastValue = newValue;
      }
    }

    if (0 < i) {
      costs.set(s2.length, lastValue);
    }
  }

  return costs.get(s2.length)!;
}
