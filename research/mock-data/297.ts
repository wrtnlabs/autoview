
import Component from "../components/297";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"Profile data loaded successfully (Sample)","data":{"myself":false,"name":"Test User (Sample)","nickname":"SampleTester","email":"test.user@example.com","birth":"1990-05-19","id":12345,"profileImage":"https://www.example.com/images/profile-sample.png","coverImage":"https://www.example.com/images/cover-sample.jpg","introduce":"Hello! This is a sample introduction for a test user. All information is fictional and used solely for UI testing purposes."}};
}
