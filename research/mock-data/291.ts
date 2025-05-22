
import Component from "../components/291";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"fetchDetailArticle","data":{"id":12345,"contents":"This is a sample article content for UI testing purposes. It should represent the kind of content a real user might post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. (Sample)","writer":{"nickname":"SampleUser123 (Test)","id":678,"profileImage":"https://www.example.com/images/profile/sampleuser123.png"},"images":[{"id":1,"position":1,"url":"https://www.example.com/images/article/sample-img-1.jpg","depth":1},{"id":2,"position":2,"url":"https://www.example.com/images/article/sample-img-2.jpg","depth":2}],"comments":[{"id":101,"contents":"This is a sample comment. It includes some text to represent user feedback. (Test)","parentId":null,"xPosition":"15.5","yPosition":20.25},{"id":102,"contents":"This is a reply comment to the first comment. (Sample Reply)","parentId":101,"xPosition":null,"yPosition":null}]}};
}
