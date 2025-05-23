
import Component from "../components/870";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"type":"commit","details":{"path":"src/components/Button.js","start_line":42,"end_line":42,"start_column":12,"end_column":24,"blob_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","blob_url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","commit_sha":"a1b2c3d4e5f678901234567890abcdef12345678","commit_url":"https://api.example.com/repos/example-org/sample-repo/git/commits/a1b2c3d4e5f678901234567890abcdef12345678"}},{"type":"wiki_commit","details":{"path":"docs/API.md","start_line":10,"end_line":12,"start_column":3,"end_column":20,"blob_sha":"abcdefabcdefabcdefabcdefabcdefabcdefabcd","page_url":"https://github.com/example-org/sample-repo.wiki/blob/abcdefabcdefabcdefabcdefabcdefabcd/docs/API.md","commit_sha":"11223344556677889900aabbccddeeff11223344","commit_url":"https://github.com/example-org/sample-repo.wiki/commit/11223344556677889900aabbccddeeff11223344"}},{"type":"issue_body","details":{"issue_body_url":"https://api.example.com/repos/example-org/sample-repo/issues/24"}},{"type":"pull_request_review_comment","details":{"pull_request_review_comment_url":"https://api.example.com/repos/example-org/sample-repo/pulls/comments/67890"}}];
}
