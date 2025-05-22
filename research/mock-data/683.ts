
import Component from "../components/683";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"processing_status":"complete","analyses_url":"https://api.example.org/v1/code-scanning/analyses/sample-analysis-001","errors":null};
}
