
import typia from "typia";

import { transform } from "../transformers/549";

export type InputType = Parameters<typeof transform>[0];

export function random(): InputType {
  return typia.random<InputType>();
}
