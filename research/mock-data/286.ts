
import Component from "../components/286";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"REQ_TO_RESP_001","data":{"id":12345,"writerId":1001,"contents":"This is a sample comment content for UI testing purposes. (Test)","imageId":9876,"parentId":54321,"xPosition":"150.75","yPosition":300.125,"articleId":67890}};
}
