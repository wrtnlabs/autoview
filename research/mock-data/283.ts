
import Component from "../components/283";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"fetchArticle -> success (Sample mapping)","data":true};
}
