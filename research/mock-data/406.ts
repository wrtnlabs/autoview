
import Component from "../components/406";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"labels":[{"id":42,"name":"custom-runner-sample-42","type":"custom"},{"id":43,"name":"read-only-runner-sample-43","type":"read-only"},{"name":"generic-runner-label-test"}]};
}
