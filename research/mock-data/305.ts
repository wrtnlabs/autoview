
import Component from "../components/305";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"getUserProfileRequest","data":{"name":"Test User (Sample)","nickname":"SampleUser","email":"test.user@example.com","birth":"1990-01-01","id":12345}};
}
