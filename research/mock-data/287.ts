
import Component from "../components/287";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"Sample request ID: REQ1234 (Test)","data":{"id":101,"contents":"This is a sample article content for UI testing purposes. It includes multiple sentences to test text wrapping and display. All content is fictional and for demonstration only.","writer":{"id":202,"nickname":"SampleUser (Test)","profileImage":"https://www.example.com/images/sample-profile.png"},"images":[{"id":1,"position":1,"url":"https://www.example.com/images/sample1.png","depth":1},{"id":2,"position":2,"url":"https://www.example.com/images/sample2.png","depth":2}],"comments":[{"id":301,"contents":"This is a sample comment for UI testing.","parentId":null,"xPosition":12.34,"yPosition":56.78},{"id":302,"contents":"This is a reply to the first comment. It should appear indented.","parentId":301,"xPosition":null,"yPosition":null}]}};
}
