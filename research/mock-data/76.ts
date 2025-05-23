
import Component from "../components/76";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sale_id":"sale_test_001","stocks":[{"unit_id":"unit_100_sample","stock_id":"stock_200_sample","choices":[],"quantity":2},{"unit_id":"unit_101_sample","stock_id":"stock_201_sample","choices":[{"option_id":"opt_color","value":"Red (Sample)"},{"option_id":"opt_gift_wrap","value":true}],"quantity":1}],"volume":3,"accumulate":true};
}
