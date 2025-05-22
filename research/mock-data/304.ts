
import Component from "../components/304";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"responseType":"DetailProfileWithRelation","payload":{"userId":2002,"displayName":"Sample Designer (Test)","profileUrl":"https://www.example.com/designers/sample-designer-2002","relations":{"projects":[{"projectId":3003,"projectName":"Test Project Alpha","role":"Lead Designer (Test)"}],"followersCount":17},"lastActiveAt":"2025-05-19T14:30:00Z"}};
}
