
import Component from "../components/683";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"processing_status":"failed","analyses_url":null,"errors":["Failed to process SARIF file: SampleError encountered at line 42.","Invalid SARIF schema version detected (dummy)."]};
}
