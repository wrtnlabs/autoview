
import Component from "../components/820";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"status":"finished_file_sync"};
}
