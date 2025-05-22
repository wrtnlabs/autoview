
import Component from "../components/888";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"name":"v1.0.0-sample","commit":{"sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/sample-org/sample-repo/git/commits/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"},"zipball_url":"https://api.example.com/repos/sample-org/sample-repo/zipball/v1.0.0-sample","tarball_url":"https://api.example.com/repos/sample-org/sample-repo/tarball/v1.0.0-sample","node_id":"MDM6UmVmMjM0NTY3ODphYmNkZWYxMjM0NTY3ODlhYmNkZWYxMjM0NTY3OA=="},{"name":"v2.1.3-beta-sample","commit":{"sha":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","url":"https://api.example.com/repos/sample-org/sample-repo/git/commits/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0"},"zipball_url":"https://api.example.com/repos/sample-org/sample-repo/zipball/v2.1.3-beta-sample","tarball_url":"https://api.example.com/repos/sample-org/sample-repo/tarball/v2.1.3-beta-sample","node_id":"MDM6UmVmOTg3NjU0MzIxOmFiY2QxMjM0NTY3OThmZ2hpamtsbW5vcA=="}];
}
