
import Component from "../components/297";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"getUserProfileResponse (Test)","data":{"myself":true,"name":"Jane Doe (Test User)","nickname":"JD (Sample)","email":"jane.doe@example.com","birth":"1990-05-15","id":12345,"profileImage":"https://www.example.com/profiles/jane_doe_test.png","coverImage":"https://www.example.com/covers/jane_doe_cover_test.jpg","introduce":"Hello, I'm Jane Doe, a test user for UI development. I enjoy creating sample data and designing mock interfaces. This is a fictional profile introduced for testing purposes only."}};
}
