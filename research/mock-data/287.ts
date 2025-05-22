
import Component from "../components/287";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"FetchArticleById → DetailResponse (Test)","data":{"images":[{"id":1,"position":1,"url":"https://www.example.com/images/sample1.jpg","depth":1},{"id":2,"position":"2","url":"https://www.example.com/images/sample2.jpg","depth":2}],"writer":{"nickname":"Sample Author (Test)","id":101,"profileImage":"https://www.example.com/profiles/sample-author.jpg"},"comments":[{"id":201,"contents":"Great article! Very informative. (Test Comment)","parentId":null,"xPosition":12.5,"yPosition":22.3},{"id":202,"contents":"Thank you for the feedback. (Reply)","parentId":201}],"id":12345,"contents":"This is a sample article content used for UI testing purposes. It includes multiple lines and various lengths to ensure proper rendering in the UI. All content herein is fictional and for demonstration only.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit."}};
}
