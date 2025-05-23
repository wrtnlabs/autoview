
import Component from "../components/685";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"errors":[{"line":5,"column":3,"source":"src/**.js @js-team","kind":"InvalidPattern","suggestion":"Remove the extra wildcard in the file extension pattern.","message":"Line 5, Column 3: Invalid glob pattern 'src/**.js'.","path":".github/CODEOWNERS"},{"line":12,"column":15,"source":"*.md","kind":"MissingOwner","suggestion":"Specify at least one owner, e.g., @docs-team.","message":"Line 12, Column 15: No owner specified for pattern '*.md'.","path":".github/CODEOWNERS"},{"line":20,"column":8,"source":"/api/** @nonexistent-user","kind":"UnknownUser","suggestion":null,"message":"Line 20, Column 8: Owner '@nonexistent-user' does not exist or is not accessible.","path":".github/CODEOWNERS"}]};
}
