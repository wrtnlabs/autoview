
import Component from "../components/870";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"type":"commit","details":{"file_path":"src/config.js","line_number":42,"commit_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","snippet":"const SECRET_KEY = 'dummy_secret_value';"}},{"type":"issue_body","details":{"issue_number":123,"repository":"example-org/sample-repo","owner":"example-org","text_excerpt":"Here is where I accidentally leaked a dummy password in the issue body."}},{"type":"pull_request_review_comment","details":{"pull_request_number":101,"comment_id":4567,"path":"app/utils/auth.js","position":15,"line":15,"body":"This is a dummy secret: DUMMY123456789"}}];
}
