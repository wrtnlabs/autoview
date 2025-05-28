
import Component from "../components/290";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"GET /api/articles?page=1&search=sample - Response Code: 200 (Test)","data":{"list":[{"id":101,"contents":"This is a sample article contents for testing UI. It covers multiple lines and uses placeholder text.","createdAt":{},"thumbnail":"https://www.example.com/images/sample-thumbnail.jpg","myPick":true,"isMine":false,"writer":{"id":501,"username":"sample_writer_01","displayName":"Sample Writer (Test)"},"comments":[{"id":9001,"text":"This is a sample comment for UI testing.","author":{"id":6001,"username":"commenter1","name":"Commenter One (Test)"}},{"id":9002,"text":"Another sample comment. Testing multiline.\nSecond line.","author":{"id":6002,"username":"commenter2","name":"Commenter Two (Sample)"}}]},{"id":102,"contents":"Second sample article content. This text is for testing UI components. All content is fictional.","createdAt":{},"thumbnail":null,"myPick":false,"isMine":true,"writer":{"id":502,"username":"sample_writer_02","displayName":"Sample Author 02 (Test)"},"comments":[]}],"count":2,"totalResult":42,"totalPage":5,"search":"sample query","page":1}};
}
