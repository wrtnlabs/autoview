
import Component from "../components/282";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"test_req_to_res_001","data":{"list":[{"id":101,"contents":"Sample article contents for UI testing purposes. This is the first mock article.","createdAt":{},"thumbnail":null,"myPick":false,"isMine":false,"writer":{"login":"sample.user1","type":"User","id":5010},"comments":[{"id":9001,"text":"First test comment (Sample)"},{"id":9002,"text":"Second sample comment"}]},{"id":102,"contents":"Another mock article content. This one includes a thumbnail image.","createdAt":{},"thumbnail":"https://www.example.com/images/sample-thumbnail-102.png","myPick":true,"isMine":true,"writer":{"login":"test.user2 (Test)","type":"User","id":5020},"comments":[]}],"count":2,"totalResult":50,"totalPage":25,"search":"ui testing","page":1}};
}
