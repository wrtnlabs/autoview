import { IconName } from "@fortawesome/fontawesome-svg-core";
import fs from "fs";
import typia from "typia";

const values: IconName[] = typia.misc.literals<IconName>();
fs.writeFileSync(
  `${__dirname}/../src/typings/AutoViewIconName.ts`,
  [
    `export type AutoViewIconName =`,
    ...values.map((v) => `  | ${JSON.stringify(v)}`),
  ].join("\n"),
  "utf8",
);
