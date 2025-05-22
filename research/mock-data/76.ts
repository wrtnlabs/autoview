
import Component from "../components/76";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sale_id":"sale_test_001","stocks":[{"unit_id":"unit_test_001","stock_id":"stock_test_A1","choices":[],"quantity":2},{"unit_id":"unit_test_002","stock_id":"stock_test_B2","choices":[{"option_id":"option_color","value":"Red (Sample)"},{"option_id":"option_gift_wrap","value":true}],"quantity":5}],"volume":3,"accumulate":true};
}
