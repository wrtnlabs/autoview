
import Component from "../components/345";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"abcd1234efgh5678","node_id":"NODEID_SampleGist_abc123XYZ=","url":"https://api.example.com/gists/abcd1234efgh5678","forks_url":"https://api.example.com/gists/abcd1234efgh5678/forks","commits_url":"https://api.example.com/gists/abcd1234efgh5678/commits","git_pull_url":"https://api.example.com/gists/abcd1234efgh5678.git","git_push_url":"https://api.example.com/gists/abcd1234efgh5678.git","html_url":"https://www.example.com/gists/abcd1234efgh5678","files":{"sample.txt":{"filename":"sample.txt","type":"text/plain","language":"Text","raw_url":"https://raw.example.com/gists/abcd1234efgh5678/sample.txt","size":42,"truncated":false,"content":"This is a sample text file content for UI testing purposes. All content is fictional.","encoding":"utf-8"},"script.js":{"filename":"script.js","type":"application/javascript","language":"JavaScript","raw_url":"https://raw.example.com/gists/abcd1234efgh5678/script.js","size":128,"truncated":false,"content":"console.log('Sample JS content for UI test (script.js)');","encoding":"utf-8"}},"public":true,"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-19T14:30:00Z","description":"A sample gist for UI testing. Contains two files: a text file and a JS script. All data is fictional.","comments":2,"comments_enabled":true,"user":"testuser123","comments_url":"https://api.example.com/gists/abcd1234efgh5678/comments","truncated":false};
}
