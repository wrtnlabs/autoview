
import Component from "../components/285";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_12345_res_67890_sample","data":{"list":[{"id":1,"writerId":101,"contents":"This is a sample comment for UI testing purposes. It contains placeholder text to verify layout.","createdAt":"2025-05-19T12:34:56Z","writer":{"nickname":"Sample User (Test)","id":101,"profileImage":"https://www.example.com/images/sample-profile-101.png"}},{"id":2,"writerId":102,"contents":"Another sample comment with an image annotation point.","createdAt":"2025-05-19T13:45:00Z","imageId":555,"xPosition":45.5,"yPosition":"78.3","writer":{"nickname":"Test Contributor (Bot)","id":102,"profileImage":null}}],"count":2,"totalResult":50,"totalPage":5,"search":"sample article comments","page":1}};
}
