
import Component from "../components/301";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"test_req_abc123_resp_def456","data":{"list":[{"nickname":"SampleUser1 (Test)","id":101,"profileImage":"https://www.example.com/images/sample_profile1.png","reason":"나를 팔로우한 사람"},{"nickname":"DummyUser2","id":202,"profileImage":null,"reason":"내가 팔로우한 사람"}],"count":2,"totalResult":25,"totalPage":5,"search":"Sample search (Test)","page":1}};
}
