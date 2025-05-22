
import Component from "../components/285";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req-1234-response-5678","data":{"list":[{"id":1,"writerId":101,"contents":"This is a sample comment for testing purposes. All data is fictional and for UI rendering tests.","createdAt":"2025-05-19T14:30:00Z","imageId":55,"xPosition":12.34,"yPosition":"56.78","writer":{"nickname":"SampleUser (Test)","id":101,"profileImage":"https://www.example.com/images/sample_user.png"}},{"id":2,"writerId":102,"contents":"This is another sample reply comment. Optional fields like imageId and positions are omitted.","createdAt":"2025-05-20T09:15:00Z","writer":{"nickname":"AnotherUser (Sample)","id":102}}],"count":2,"totalResult":5,"totalPage":3,"search":"test search","page":1}};
}
