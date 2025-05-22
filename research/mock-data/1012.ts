
import Component from "../components/1012";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"sample-repo-alpha","owner":{"login":"example-org"},"html_url":"https://github.com/example-org/sample-repo-alpha","description":"Dummy repository for UI testing purposes.","stargazers_count":42},{"id":202,"name":"sample-repo-beta","owner":{"login":"example-org"},"html_url":"https://github.com/example-org/sample-repo-beta","description":"Another dummy entry to test array rendering.","stargazers_count":7}];
}
