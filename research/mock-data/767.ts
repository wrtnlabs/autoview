
import Component from "../components/767";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345,"remote_id":"author_12345","remote_name":"SampleAuthor","email":"sample.author@example.com","name":"Sample Author (Test)","url":"https://api.example.com/authors/author_12345","import_url":"https://import.example.com/authors/author_12345"};
}
