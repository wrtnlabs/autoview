
import Component from "../components/766";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"remote_id":"remote_101","remote_name":"PorterAdmin_Test","email":"porter.admin.test@example.com","name":"Porter Admin (Test)","url":"https://www.example.com/authors/porter-admin-test","import_url":"https://api.example.org/v1/import/porter_author/remote_101"},{"id":102,"remote_id":"auth_xyz_102","remote_name":"SampleAuthor_Dummy","email":"sample.author@example.org","name":"Sample Author (Dummy)","url":"https://www.example.com/authors/sample-author-dummy","import_url":"https://api.example.org/v1/import/porter_author/auth_xyz_102"}];
}
