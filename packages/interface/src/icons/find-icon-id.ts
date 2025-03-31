import { IconName } from "@fortawesome/fontawesome-svg-core";

import { BkTree } from "./bk-tree";
import bkRootNode from "./icon-id-bk-tree.json";
import { levenshteinDistance } from "./levenshtein-distance";

const bkTree = new BkTree(bkRootNode, levenshteinDistance);

export function findIconId(id: string): IconName {
  const result = bkTree.findNearest(id);
  return result.node.term as IconName;
}
