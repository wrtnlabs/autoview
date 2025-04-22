
import typia from "typia";

import { transform } from "../transformers/230";

export type InputType = Parameters<typeof transform>[0];

export function random(): InputType {
  return typia.random<InputType>();
}
