
import Component from "../components/872";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"incremental_scans":[{"type":"incremental","status":"completed","started_at":"2025-05-19T09:00:00Z","completed_at":"2025-05-19T09:05:00Z"},{"type":"incremental","status":"running","started_at":"2025-05-19T10:15:00Z","completed_at":null}],"pattern_update_scans":[{"type":"pattern_update","status":"pending","started_at":null,"completed_at":null},{"type":"pattern_update","status":"completed","started_at":"2025-05-18T12:00:00Z","completed_at":"2025-05-18T12:10:00Z"}],"backfill_scans":[{"type":"backfill","status":"completed","started_at":"2025-05-17T08:00:00Z","completed_at":"2025-05-17T08:30:00Z"},{"type":"backfill","status":"pending","started_at":null,"completed_at":null}],"custom_pattern_backfill_scans":[{"type":"custom_pattern_backfill","status":"completed","pattern_name":"Test Secret Pattern","pattern_scope":"repository","started_at":"2025-05-16T14:00:00Z","completed_at":"2025-05-16T14:45:00Z"},{"type":"custom_pattern_backfill","status":"running","pattern_name":"Org Sample Pattern","pattern_scope":"organization","started_at":"2025-05-19T11:30:00Z","completed_at":null}]};
}
