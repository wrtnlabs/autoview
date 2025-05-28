
import Component from "../components/304";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"User detail retrieval successful (Test Response)","data":{"followStatus":"followUp","myself":false,"name":"Alex Smith (Test User)","nickname":"alexsample","email":"alex.smith.test@example.com","birth":"1990-07-15","id":1001,"profileImage":"https://www.example.com/images/alex_smith_profile_test.png","coverImage":"https://www.example.com/images/alex_smith_cover_test.jpg","introduce":"Hello, I'm Alex (Test User). This is a sample introduction for UI testing purposes."}};
}
