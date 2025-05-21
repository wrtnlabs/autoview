
import Component from "../components/256";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"redirection":{"originalUrl":"https://www.example.com/path/to/sample-page","expireAt":1732000000,"shortUrl":"https://short.example.com/abc123"}};
}
