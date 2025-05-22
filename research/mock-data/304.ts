
import Component from "../components/304";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"resp-xyz-001-test","data":{"followStatus":"followUp","myself":false,"name":"Sample User (Test)","nickname":"sample_user","email":"sample.user@example.com","birth":"1992-07-15","id":101,"profileImage":"https://www.example.com/images/sample-user.png","coverImage":"https://www.example.com/images/sample-user-cover.png","introduce":"Hello! I'm a sample user used for UI testing. This introduction is purely fictional and meant to demonstrate text rendering."}};
}
