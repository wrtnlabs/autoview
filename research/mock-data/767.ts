
import Component from "../components/767";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":4096,"remote_id":"abc123def","remote_name":"dummy_porter_author","email":"sample.author@example.com","name":"Sample Porter Author (Test)","url":"https://api.example.com/v1/porter-authors/4096","import_url":"https://api.example.com/v1/porter-authors/4096/import"};
}
