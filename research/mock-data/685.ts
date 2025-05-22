
import Component from "../components/685";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"errors":[{"line":12,"column":1,"source":"docs/README.md * @docs-team","kind":"duplicate_pattern","suggestion":"Remove duplicate entry or merge patterns.","message":"[docs/README.md] Duplicate CODEOWNERS pattern found for path 'docs/README.md' in this file.","path":".github/CODEOWNERS"},{"line":45,"column":11,"source":"src/* frontend-team","kind":"invalid_owner_format","suggestion":"Prefix owner with '@' to specify a user or team.","message":"Invalid owner format 'frontend-team'. Owners must start with '@'.","path":".github/CODEOWNERS"},{"line":78,"column":5,"source":"assets/images/*","kind":"missing_owner","message":"No owner specified for pattern 'assets/images/*'.","path":"CODEOWNERS"}]};
}
