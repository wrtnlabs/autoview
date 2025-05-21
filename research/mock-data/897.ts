
import Component from "../components/897";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"count":1100,"uniques":450,"views":[{"timestamp":"2025-05-14T00:00:00Z","uniques":120,"count":180},{"timestamp":"2025-05-15T00:00:00Z","uniques":130,"count":200},{"timestamp":"2025-05-16T00:00:00Z","uniques":140,"count":220},{"timestamp":"2025-05-17T00:00:00Z","uniques":160,"count":260},{"timestamp":"2025-05-18T00:00:00Z","uniques":150,"count":240}]};
}
