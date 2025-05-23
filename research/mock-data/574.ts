
import Component from "../components/574";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"full_name":"example-org/sample-repo","active_caches_size_in_bytes":268435456,"active_caches_count":5};
}
