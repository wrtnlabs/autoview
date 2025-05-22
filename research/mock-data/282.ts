
import Component from "../components/282";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"getAllArticlesRequest_001 -> getAllArticlesResponse_001","data":{"list":[{"id":101,"contents":"This is a sample article content for UI testing purposes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. (Test)","createdAt":{},"thumbnail":"https://www.example.com/thumbnails/article-101.png","myPick":false,"isMine":false,"writer":{"id":501,"username":"test_writer_sample","displayName":"Test Writer (Sample)","profileUrl":"https://www.example.com/users/test_writer_sample"},"comments":[{"id":1001,"text":"Sample comment (first).","user":"commenter_one (Test)"},{"id":1002,"text":"Another test comment to check UI list rendering.","user":"commenter_two (Sample)"}]},{"id":102,"contents":"Another sample article. Testing different thumbnail null case. (Test)","createdAt":{},"thumbnail":null,"myPick":true,"isMine":true,"writer":{"id":502,"username":"sample_writer_2","displayName":"Sample Writer Two (Test)","profileUrl":"https://www.example.com/users/sample_writer_2"},"comments":[]}],"count":2,"totalResult":50,"totalPage":25,"search":"sample query","page":1}};
}
