
import Component from "../components/786";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":12345678,"node_id":"MDU6SXNzdWVFdmVudF9sYWJlbGVkMTIz","event":"labeled","label":{"name":"bug (Sample)","color":"f29513"},"actor":{"login":"test-user-sample","id":1001,"node_id":"MDQ6VXNlcjEwMDE=","type":"User"},"created_at":"2025-05-19T14:30:00Z"},{"id":87654321,"node_id":"MDU6SXNzdWVFdmVudF9hc3NpZ25lZDg3Ng","event":"assigned","assignee":{"login":"sample-contributor","id":1002,"node_id":"MDQ6VXNlcjEwMDI=","type":"User"},"actor":{"login":"test-maintainer-sample","id":1003,"node_id":"MDQ6VXNlcjEwMDM=","type":"User"},"created_at":"2025-05-19T15:00:00Z"}];
}
