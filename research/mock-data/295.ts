
import Component from "../components/295";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"fetch_image_list_sampleRequest","data":["https://www.example.com/images/sample1.png","https://www.example.com/images/sample2.png"]};
}
