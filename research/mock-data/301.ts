
import Component from "../components/301";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"GET /api/profiles?page=1 -> 200 OK (Test)","data":{"list":[{"nickname":"Alice Sample (Test)","id":101,"profileImage":"https://www.example.com/images/alice_sample.png","reason":"내가 팔로우한 사람"},{"nickname":"Bob Dummy (Sample)","id":102,"profileImage":null,"reason":"나를 팔로우한 사람"}],"count":2,"totalResult":50,"totalPage":25,"search":"sample query","page":1}};
}
