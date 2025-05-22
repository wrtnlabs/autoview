
import Component from "../components/285";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_12345_dummy_response","data":{"list":[{"id":101,"writerId":42,"contents":"This is a sample comment for testing purposes.","createdAt":"2025-05-19T14:30:00Z","imageId":null,"xPosition":15.5,"yPosition":null,"writer":{"nickname":"TestUser1 (Sample)","id":7,"profileImage":"https://www.example.com/images/test-user1.png"}},{"id":102,"writerId":84,"contents":"Another sample comment (Dummy) to check UI rendering.","createdAt":"2025-05-18T09:15:00Z","imageId":55,"xPosition":"-23.45","yPosition":-23.45,"writer":{"nickname":"SampleUser2 (Test)","id":8,"profileImage":null}}],"count":2,"totalResult":50,"totalPage":5,"search":"sample search","page":1}};
}
