
import Component from "../components/290";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req-12345 -> res-67890","data":{"list":[{"id":101,"contents":"This is a sample article content for UI testing. It includes enough text to simulate rendering multiple lines of text. All content is fictional and for test purposes only.","createdAt":{},"thumbnail":"https://www.example.com/images/sample-thumbnail-101.png","myPick":false,"isMine":false,"writer":{"username":"sample_writer_01","displayName":"Sample Writer (Test Account)"},"comments":[{"id":1,"text":"First sample comment for testing purposes.","commenter":{"username":"commenterA_sample","displayName":"Commenter A (Demo)"}}]},{"id":102,"contents":"Another example of sample article content. This second entry helps to test lists and pagination in UI components. Fictitious data only.","createdAt":{},"thumbnail":null,"myPick":true,"isMine":true,"writer":{"username":"test_writer_02","displayName":"Test Writer Two (Sample)"},"comments":[]}],"count":2,"totalResult":42,"totalPage":21,"search":"sample","page":1}};
}
