
import Component from "../components/294";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req-abc123-res-xyz789","data":{"list":[{"nickname":"SampleUser1 (Test)","id":101,"profileImage":"https://example.com/images/sample-profile1.png","reason":"나를 팔로우한 사람"},{"nickname":"테스터2_Dummy","id":102,"profileImage":null,"reason":"내가 팔로우한 사람"},{"nickname":"DemoUser3_TestAccount","id":103,"reason":"나를 팔로우한 사람"}],"count":3,"totalResult":30,"totalPage":10,"search":"Demo","page":1}};
}
