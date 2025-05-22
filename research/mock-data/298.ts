
import Component from "../components/298";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"FetchUserDetailRequest_12345_sample","data":{"myself":false,"name":"Test Designer (Sample)","nickname":"DesignGuru_Test","email":"test.designer@example.com","birth":"1990-07-15","id":7890,"profileImage":"https://www.example.com/images/sample-profile.png","coverImage":"https://www.example.com/images/sample-cover.jpg","introduce":"Hello! I'm a sample designer profile for UI testing. All data shown here is fictional and for demonstration purposes only."}};
}
