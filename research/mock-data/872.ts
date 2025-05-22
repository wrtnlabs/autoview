
import Component from "../components/872";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"incremental_scans":[{"type":"incremental","status":"completed","started_at":"2025-05-19T09:30:00Z","completed_at":"2025-05-19T09:32:15Z"},{"type":"incremental","status":"running","started_at":"2025-05-19T11:15:00Z","completed_at":null}],"pattern_update_scans":[{"type":"pattern_update","status":"pending","started_at":null,"completed_at":null}],"backfill_scans":[{"type":"backfill","status":"completed","started_at":"2025-05-18T08:00:00Z","completed_at":"2025-05-18T08:45:00Z"}],"custom_pattern_backfill_scans":[{"type":"custom_pattern_backfill","status":"completed","started_at":"2025-05-17T14:20:00Z","completed_at":"2025-05-17T14:55:30Z","pattern_name":"Sample Secret Key Pattern","pattern_scope":"repository"},{"type":"custom_pattern_backfill","status":"running","started_at":"2025-05-19T12:00:00Z","completed_at":null,"pattern_name":"Org-Wide Token Regex (Test)","pattern_scope":"organization"}]};
}
