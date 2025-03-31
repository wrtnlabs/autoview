import { IconName } from "@fortawesome/fontawesome-svg-core";
import fs from "fs";
import typia from "typia";

import { buildBkTree } from "../src/icons/build-bk-tree";
import { levenshteinDistance } from "../src/icons/levenshtein-distance";

const values: IconName[] = typia.misc.literals<IconName>();
const root = buildBkTree(values, levenshteinDistance);

fs.writeFileSync(
  `${__dirname}/../src/icons/icon-id-bk-tree.json`,
  JSON.stringify(root),
);
