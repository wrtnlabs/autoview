
import Component from "../components/291";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"NODEID_SampleArticle_abc123XYZ=","external_id":"article_ext_001","title":"Understanding Mock Data Generation (Sample Article)","subtitle":"A sample subtitle for UI testing purposes","author":{"name":"Sample Author (Test)","email":"author.sample@example.com","profile_url":"https://www.example.com/authors/sample-author-profile"},"created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-19T14:30:00Z","tags":["testing","mock data","ui components"],"content":"This is a sample piece of content used for UI testing. It contains multiple sentences to simulate realistic data. All content herein is fictional and for demonstration only.","comments":[{"id":201,"user":"CommenterOne (Sample)","comment":"Great sample article for testing purposes!","posted_at":"2025-05-19T13:00:00Z"},{"id":202,"user":"CommenterTwo (Test)","comment":"This is a dummy comment to check list rendering in UI components.","posted_at":"2025-05-19T13:15:00Z"}],"metadata":{"view_count":350,"like_count":45,"share_count":5},"related_articles":[]};
}
