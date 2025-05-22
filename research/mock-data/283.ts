
import Component from "../components/283";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"url":"https://www.example.com/articles/sample-article-test","slug":"sample-article-test","title":"Example Article Title (Test Data)","summary":"This is a sample summary for a test article. It should demonstrate how mock data appears in UI components.","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a dummy content for testing UI rendering purposes. All characters are fictional.","author":{"id":501,"name":"John Doe (Test)","email":"john.doe@example.org","profileUrl":"https://api.example.com/v1/users/john.doe"},"tags":["sample","testing","ui-mock"],"status":"published","publishedAt":"2025-05-19T09:00:00Z","updatedAt":"2025-05-19T12:30:00Z","commentsCount":5,"metadata":{"views":123,"likes":45,"shares":3},"relatedArticles":[{"id":102,"title":"Related Article One (Sample)","slug":"related-article-one-sample","url":"https://www.example.com/articles/related-article-one-sample"},{"id":103,"title":"Related Article Two (Sample)","slug":"related-article-two-sample","url":"https://www.example.com/articles/related-article-two-sample"}]};
}
