
import Component from "../components/766";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":42,"remote_id":"porter_ext_42","remote_name":"porter_ext_author_42","email":"test.author42@example.com","name":"Test Porter Author (Sample)","url":"https://www.example.com/authors/42","import_url":"https://api.example.com/imports/porter_author/42"},{"id":43,"remote_id":"porter_ext_43","remote_name":"porter_ext_author_secondary","email":"secondary.author@example.org","name":"Secondary Porter Author (Dummy)","url":"https://www.example.org/authors/43","import_url":"https://api.example.org/imports/porter_author/43"}];
}
