
import Component from "../components/286";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"sample-request-001","data":{"id":987,"writerId":654321,"contents":"This is a dummy reply comment for UI testing purposes. All content is fictional and non-sensitive.","imageId":null,"parentId":123,"xPosition":150.25,"yPosition":"75.5","articleId":789}};
}
