
import Component from "../components/870";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"type":"commit","details":{"path":"src/config/sample-config.js","start_line":10,"end_line":12,"start_column":5,"end_column":25,"blob_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","blob_url":"https://api.github.com/repos/example-org/sample-repo/git/blobs/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","commit_sha":"a1b2c3d4e5f67890123456789abcdef012345678","commit_url":"https://api.github.com/repos/example-org/sample-repo/git/commits/a1b2c3d4e5f67890123456789abcdef012345678"}},{"type":"issue_comment","details":{"issue_comment_url":"https://api.github.com/repos/example-org/sample-repo/issues/comments/456"}},{"type":"wiki_commit","details":{"path":"docs/guide/wiki-sample-page.md","start_line":5,"end_line":5,"start_column":1,"end_column":30,"blob_sha":"d2c3b4a5968778695a4b3c2d1e0f9876543210ab","page_url":"https://github.com/example-org/sample-repo.wiki/wiki/Sample-Page","commit_sha":"b6a7c8d9e0f123456789abcdef0123456789abcd","commit_url":"https://api.github.com/repos/example-org/sample-repo/wiki/commits/b6a7c8d9e0f123456789abcdef0123456789abcd"}}];
}
