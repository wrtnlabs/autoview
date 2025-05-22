
import Component from "../components/76";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sale_id":"sale_test_001","stocks":[{"unit_id":"unit_1001","stock_id":"stock_5001","choices":[],"quantity":1},{"unit_id":"unit_1002","stock_id":"stock_5002","choices":[{"option_id":"option_color","value":"Red (Sample)"},{"option_id":"option_gift_wrap","value":true}],"quantity":2}],"volume":3,"accumulate":false};
}
