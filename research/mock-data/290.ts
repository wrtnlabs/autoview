
import Component from "../components/290";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"REQ12345->RESP67890 (Test)","data":{"list":[{"id":1,"contents":"This is a sample article content for UI testing purposes. All content is fictional (Test).","createdAt":{"value":"2025-05-19T14:30:00Z"},"thumbnail":"https://www.example.com/images/sample-thumbnail-1.png","myPick":false,"isMine":false,"writer":{"id":101,"name":"Sample Writer (Test)","profileUrl":"https://www.example.com/profiles/sample-writer"},"comments":[{"id":201,"text":"Sample comment text (Test)","author":"Commenter A (Sample)"},{"id":202,"text":"Another test comment for UI display purposes.","author":"Commenter B (Sample)"}]},{"id":2,"contents":"Another sample article with a bit shorter content. This is for testing list rendering.","createdAt":{"value":"2025-05-18T09:15:00Z"},"thumbnail":null,"myPick":true,"isMine":true,"writer":{"id":102,"name":"Test Author (Sample)","profileUrl":"https://www.example.com/profiles/test-author"},"comments":[]}],"count":2,"totalResult":25,"totalPage":13,"search":"sample search query","page":1}};
}
