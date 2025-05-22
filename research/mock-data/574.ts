
import Component from "../components/574";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"full_name":"test-org/sample-repo-cache","active_caches_size_in_bytes":153600000,"active_caches_count":7};
}
