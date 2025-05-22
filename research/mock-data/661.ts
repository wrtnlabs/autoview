
import Component from "../components/661";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"path":"src/components/Header.js","start_line":10,"end_line":10,"start_column":5,"end_column":15,"annotation_level":"warning","title":"Unused variable (Sample)","message":"The variable 'logo' is declared but its value is never read (Dummy message for UI testing)","raw_details":"Variable 'logo' defined at Header.js:10:5 is not used anywhere in the code.","blob_href":"https://api.example.com/repos/example-org/sample-repo/blob/main/src/components/Header.js#L10"},{"path":"server/api/user.js","start_line":45,"end_line":50,"start_column":null,"end_column":null,"annotation_level":null,"title":null,"message":null,"raw_details":null,"blob_href":"https://api.example.com/repos/example-org/sample-repo/blob/main/server/api/user.js#L45-L50"}];
}
