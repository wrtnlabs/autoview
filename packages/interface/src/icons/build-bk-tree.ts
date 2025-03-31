import { BkDistanceFn, BkNode } from "./bk-tree";

export function buildBkTree(terms: string[], distanceFn: BkDistanceFn): BkNode {
  if (terms.length === 0) {
    throw new Error("terms array is empty");
  }

  const root: BkNode = {
    term: terms[0]!,
    children: {},
  };

  for (let i = 1; i < terms.length; ++i) {
    const term = terms[i]!;
    insertTerm(root, term, distanceFn);
  }

  return root;
}

function insertTerm(root: BkNode, term: string, distanceFn: BkDistanceFn) {
  let node = root;
  let distance = distanceFn(node.term, term);

  while (distance !== 0) {
    const child = node.children[distance];

    if (!child) {
      break;
    }

    node = child;
    distance = distanceFn(node.term, term);
  }

  if (distance === 0) {
    return;
  }

  node.children[distance] = {
    term,
    children: {},
  };
}
