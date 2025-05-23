
import Component from "../components/661";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"path":"src/components/Button.jsx","start_line":10,"end_line":12,"start_column":5,"end_column":20,"annotation_level":"warning","title":"Deprecated prop usage (Sample)","message":"The 'size' prop is deprecated and will be removed in v2. Use 'dimension' instead.","raw_details":"size: string | number (deprecated)","blob_href":"https://api.example.com/repos/example-org/sample-repo/blob/main/src/components/Button.jsx#L10-L12"},{"path":"test/utils/helpers.py","start_line":42,"end_line":42,"start_column":null,"end_column":null,"annotation_level":null,"title":null,"message":"Missing docstring for function 'compute_metrics'","raw_details":null,"blob_href":"https://api.example.com/repos/example-org/sample-repo/blob/main/test/utils/helpers.py#L42"}];
}
