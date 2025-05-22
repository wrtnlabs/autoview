
import Component from "../components/300";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req123_test->res123_test","data":{"list":[{"nickname":"SampleUser1 (Test)","id":101,"profileImage":"https://www.example.com/profiles/sampleuser1.png","reason":"내가 팔로우한 사람"},{"nickname":"TesterUser2","id":102,"profileImage":null,"reason":"나를 팔로우한 사람"}],"count":2,"totalResult":50,"totalPage":5,"search":"sample search query","page":1}};
}
