
import Component from "../components/381";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"public_ips":{"maximum":100,"current_usage":8}};
}
