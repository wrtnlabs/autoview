
import typia from "typia";

import { transform } from "../transformers/263";

export type InputType = Parameters<typeof transform>[0];

export function random(): InputType {
  return typia.random<InputType>();
}
