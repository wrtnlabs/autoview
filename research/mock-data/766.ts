
import Component from "../components/766";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1,"remote_id":"porter_auth_001","remote_name":"Porter Author One (Sample)","email":"author.one@example.com","name":"Sample Porter Author One","url":"https://api.example.com/authors/1","import_url":"https://import.example.org/authors/1"},{"id":2,"remote_id":"porter_auth_002","remote_name":"Porter Author Two (Test)","email":"author.two@example.org","name":"Sample Porter Author Two","url":"https://api.example.net/authors/2","import_url":"https://import.example.com/authors/2"}];
}
