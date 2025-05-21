
import Component from "../components/685";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"errors":[{"line":3,"column":10,"source":"*.md @docs-team","kind":"invalid_pattern","suggestion":"Use a valid glob pattern without spaces or owner references","message":"Invalid pattern \"*.md @docs-team\": patterns cannot include owner tokens in this context.","path":".github/CODEOWNERS"},{"line":5,"column":1,"kind":"duplicate_pattern","suggestion":null,"message":"Duplicate pattern \"/src/*\" found; remove or consolidate duplicates for clarity.","path":".github/CODEOWNERS"}]};
}
