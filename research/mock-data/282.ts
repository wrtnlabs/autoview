
import Component from "../components/282";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req-12345→resp-67890-sample","data":{"list":[{"id":101,"contents":"First sample article content for UI testing purposes. This content is fictional and for demonstration only.","createdAt":{},"thumbnail":"https://www.example.com/images/sample-thumbnail-101.png","myPick":false,"isMine":false,"writer":{"id":501,"name":"Test Writer (Sample)","profileUrl":"https://www.example.com/users/test-writer-sample"},"comments":[{"id":9001,"author":{"id":1001,"name":"Commenter One (Test)"},"text":"This is a sample comment for UI testing.","createdAt":{}}]},{"id":102,"contents":"Second sample article content for UI test scenarios including edge cases. Ensure long text wrapping and multiline rendering behavior.","createdAt":{},"thumbnail":null,"myPick":true,"isMine":true,"writer":{"id":502,"name":"Sample Contributor (Bot Account)","profileUrl":"https://www.example.com/users/sample-contributor-bot"},"comments":[]}],"count":2,"totalResult":5,"totalPage":3,"search":"sample query","page":1}};
}
