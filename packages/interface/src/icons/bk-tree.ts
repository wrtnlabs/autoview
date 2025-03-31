export interface BkNode {
  term: string;
  children: Record<number, BkNode>;
}

export type BkDistanceFn = (a: string, b: string) => number;

export interface BkMatchResult {
  node: BkNode;
  distance: number;
}

export class BkTree {
  constructor(
    private root: BkNode,
    private distanceFn: BkDistanceFn,
  ) {}

  findNearest(term: string): BkMatchResult {
    let bestMatch: BkMatchResult = {
      node: this.root,
      distance: this.distanceFn(term, this.root.term),
    };
    const candidates = [this.root];

    for (;;) {
      const candidate = candidates.pop();

      if (!candidate) {
        break;
      }

      const candidateDistance = this.distanceFn(term, candidate.term);

      if (candidateDistance < bestMatch.distance) {
        bestMatch = {
          node: candidate,
          distance: candidateDistance,
        };
      }

      if (candidateDistance === 0) {
        break;
      }

      const tolerance = bestMatch.distance;
      const lowerBound = candidateDistance - tolerance;
      const upperBound = candidateDistance + tolerance;

      for (const [distance, child] of Object.entries(candidate.children)) {
        const distanceNumber = Number(distance);

        if (distanceNumber < lowerBound) {
          continue;
        }

        if (upperBound < distanceNumber) {
          continue;
        }

        candidates.push(child);
      }
    }

    return bestMatch;
  }
}
