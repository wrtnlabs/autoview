
import Component from "../components/872";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"incremental_scans":[{"type":"incremental","status":"completed","started_at":"2025-05-18T09:00:00Z","completed_at":"2025-05-18T09:05:00Z"},{"type":"incremental","status":"running","started_at":"2025-05-19T11:15:30Z","completed_at":null}],"pattern_update_scans":[{"type":"pattern_update","status":"pending","started_at":null,"completed_at":null}],"backfill_scans":[],"custom_pattern_backfill_scans":[{"type":"custom_pattern","status":"completed","pattern_name":"API Key Leak Detection (Test)","pattern_scope":"repository","started_at":"2025-05-10T08:00:00Z","completed_at":"2025-05-10T08:02:30Z"},{"type":"custom_pattern","status":"running","pattern_name":"Credential Exposure Check (Sample)","pattern_scope":"organization","started_at":"2025-05-19T12:00:00Z","completed_at":null}]};
}
