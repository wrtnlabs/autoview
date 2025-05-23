
import Component from "../components/294";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_abc123_res_xyz456 (Sample)","data":{"list":[{"nickname":"홍길동 (샘플)","id":101,"profileImage":"https://www.example.com/avatars/hong_avatar.png","reason":"나를 팔로우한 사람"},{"nickname":"Sample User (Test)","id":102,"profileImage":null,"reason":"내가 팔로우한 사람"},{"nickname":"Tester Bot (Sample)","id":103,"reason":"나를 팔로우한 사람"}],"count":3,"totalResult":12,"totalPage":4,"search":"홍길동","page":1}};
}
