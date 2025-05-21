
import Component from "../components/300";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"sample_request_123_to_response_456","data":{"list":[{"nickname":"SampleUserOne (Test)","id":101,"profileImage":"https://example.com/profiles/sampleuserone.png","reason":"나를 팔로우한 사람"},{"nickname":"SampleUserTwo (Sample)","id":202,"profileImage":null,"reason":"내가 팔로우한 사람"},{"nickname":"SampleUserThree","id":303,"reason":"나를 팔로우한 사람"}],"count":3,"totalResult":50,"totalPage":5,"search":"Sample","page":1}};
}
