
import Component from "../components/305";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"loginRequest->decodedUserToken","data":{"name":"Jane Doe (Test Account)","nickname":"jdoe_sample","email":"jane.doe@example.com","birth":"1990-07-15","id":12345}};
}
