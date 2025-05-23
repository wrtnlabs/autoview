
import Component from "../components/291";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_789_sample -> resp_101_test","data":{"images":[{"id":1,"position":1,"url":"https://www.example.com/images/article101_img1.jpg","depth":1},{"id":2,"position":2,"url":"https://www.example.com/images/article101_img2.jpg","depth":2}],"writer":{"nickname":"SampleUser (Test)","id":501,"profileImage":"https://www.example.com/profiles/sampleuser_test.jpg"},"comments":[{"id":1001,"contents":"This is a top-level comment for testing UI layouts.","xPosition":12.5,"yPosition":"24.8"},{"id":1002,"contents":"This is a reply to the first comment. All data is fictional.","parentId":1001,"xPosition":null,"yPosition":null}],"id":101,"contents":"This is a sample article content for UI testing. It contains multiple sentences of placeholder text. All data here is fictional and used for demonstration purposes only."}};
}
