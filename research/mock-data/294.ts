
import Component from "../components/294";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"GET /api/profiles?page=1&search=tester → 200 OK (Sample)","data":{"list":[{"nickname":"TestUser_A (Sample)","id":101,"profileImage":"https://www.example.com/images/testuser_a.png","reason":"나를 팔로우한 사람"},{"nickname":"SampleFollower_B","id":102,"profileImage":null,"reason":"내가 팔로우한 사람"},{"nickname":"DummyUser_C","id":103,"reason":"나를 팔로우한 사람"}],"count":3,"totalResult":25,"totalPage":5,"search":"tester","page":1}};
}
