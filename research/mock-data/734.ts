
import Component from "../components/734";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"MDExOkJyYW5jaFBvbGljeTEwMQ==","name":"release/v[0-9]+.*","type":"branch"};
}
