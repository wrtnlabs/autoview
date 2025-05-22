
import Component from "../components/767";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"remote_id":"author_12345","remote_name":"porter_author_sample","email":"porter.author.sample@example.com","name":"Porter Author Sample (Test)","url":"https://api.example.com/v1/porter-authors/author_12345","import_url":"https://www.example.com/porter-authors/import/author_12345"};
}
