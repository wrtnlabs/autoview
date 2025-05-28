
import Component from "../components/300";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"dummy-request-id-001","data":{"list":[{"nickname":"TestUserAlpha (Sample)","id":101,"profileImage":"https://www.example.com/images/testuseralpha.png","reason":"내가 팔로우한 사람"},{"nickname":"SampleFriendBeta","id":102,"profileImage":null,"reason":"나를 팔로우한 사람"}],"count":2,"totalResult":10,"totalPage":5,"search":"SampleSearch","page":1}};
}
