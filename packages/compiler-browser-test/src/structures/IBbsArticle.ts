import { tags } from "typia";

export interface IBbsArticle {
  id: string;
  title: string;
  body: string;
  thumbnail: IBbsArticle.IThumbnail | null;
  created_at: string & tags.Format<"date-time">;
}
export namespace IBbsArticle {
  export interface IThumbnail {
    url: string;
    width: number;
    height: number;
  }
}
