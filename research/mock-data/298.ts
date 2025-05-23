
import Component from "../components/298";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"User profile fetched successfully (Test)","data":{"myself":false,"name":"Sample User (Test Account)","nickname":"SampleNick","email":"sample.user@example.com","birth":"1990-07-15","id":1024,"profileImage":"https://www.example.com/images/sample-user-profile.jpg","coverImage":"https://www.example.com/images/sample-user-cover.jpg","introduce":"Hello, I'm a sample user profile (Test). This introduction text is fictional and used for UI component testing."}};
}
