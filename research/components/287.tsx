import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface CANNOT_FINDONE_ARTICLE {
        type: "business";
        result: false;
        code: 4004;
        data: "\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
    }
    export namespace ResponseForm_lt_ArticleType {
        export interface DetailArticle_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.ArticleType.DetailArticle;
        }
    }
    export namespace ArticleType {
        export interface DetailArticle {
            images?: AutoViewInputSubTypes.Pick_lt_BodyImageEntity_comma__space__doublequote_id_doublequote__space__or__space__doublequote_position_doublequote__space__or__space__doublequote_url_doublequote__space__or__space__doublequote_depth_doublequote__gt_[];
            writer: AutoViewInputSubTypes.UserType.Profile;
            comments: AutoViewInputSubTypes.Pick_lt_CommentEntity_comma__space__doublequote_id_doublequote__space__or__space__doublequote_contents_doublequote__space__or__space__doublequote_parentId_doublequote__space__or__space__doublequote_xPosition_doublequote__space__or__space__doublequote_yPosition_doublequote__gt_[];
            id: number;
            /**
             * 글의 내용물로, 최대 3,000자
            */
            contents: string;
        }
    }
    export interface Pick_lt_BodyImageEntity_comma__space__doublequote_id_doublequote__space__or__space__doublequote_position_doublequote__space__or__space__doublequote_url_doublequote__space__or__space__doublequote_depth_doublequote__gt_ {
        id: number;
        /**
         * 이미지의 정렬 순서로, 오름차순 정렬된다.
        */
        position?: string | number | null;
        /**
         * 서버를 통해 한 번 전처리된 이미지
         * example is @link {https://folder/test.jpg}
        */
        url: string;
        /**
         * 처음 이미지를 1이라 할 때, 몇 번째 업데이트 이미지인지를 의미하는 값
        */
        depth: number;
    }
    export namespace UserType {
        export interface Profile {
            /**
             * 사용자의 별칭, 설정하지 않는 경우도 있다.
            */
            nickname: string;
            id: number;
            /**
             * 사용자의 프로필 이미지
            */
            profileImage?: string | null;
        }
    }
    export interface Pick_lt_CommentEntity_comma__space__doublequote_id_doublequote__space__or__space__doublequote_contents_doublequote__space__or__space__doublequote_parentId_doublequote__space__or__space__doublequote_xPosition_doublequote__space__or__space__doublequote_yPosition_doublequote__gt_ {
        id: number;
        /**
         * 게시글 내용
        */
        contents: string;
        /**
         * '부모 댓글이 있는 경우, 즉 답글인 경우에는 부모 댓글 아이디를 받는다.'
        */
        parentId?: (number & tags.Type<"int32">) | null;
        /**
         * 소수점을 포함한 좌표 값
        */
        xPosition?: string | number | null;
        /**
         * 소수점을 포함한 좌표 값
        */
        yPosition?: string | number | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE | AutoViewInputSubTypes.ResponseForm_lt_ArticleType.DetailArticle_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    We discriminate on `value.result` to handle error vs. detail view.
  if (!value.result) {
    // Error case: display a stylized alert with the error message.
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded flex items-center max-w-md mx-auto">
        <LucideReact.AlertTriangle className="text-red-500 mr-2" size={24} />
        <p className="text-red-700 text-sm">{value.data}</p>
      </div>
    );
  }

  // Success case: destructure the detail article payload
  const { requestToResponse, data: article } = value;
  const { images, writer, comments, contents } = article;

  // Truncate the main contents for mobile-first layout
  const preview =
    contents.length > 300 ? contents.slice(0, 300).trimEnd() + "…" : contents;

  // Author image fallback
  const authorImg =
    writer.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      writer.nickname || `User ${writer.id}`
    )}&background=0D8ABC&color=fff`;

  // Display only the first 2 comments
  const displayedComments = comments.slice(0, 2);
  const remainingCount = comments.length - displayedComments.length;

  // Handler to replace broken images with a placeholder
  function handleImgError(
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void {
    e.currentTarget.src =
      "https://placehold.co/400x300/f1f5f9/64748b?text=Image";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Author Section */}
      <header className="flex items-center mb-4">
        <img
          src={authorImg}
          alt={`${writer.nickname || `User ${writer.id}`} profile`}
          onError={handleImgError}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {writer.nickname || `User ${writer.id}`}
          </p>
          <p className="text-xs text-gray-500">Author</p>
        </div>
      </header>

      {/* Optional request-response block */}
      {requestToResponse && (
        <div className="bg-gray-50 p-3 rounded mb-4 text-xs text-gray-600 font-mono whitespace-pre-wrap break-all">
          {requestToResponse}
        </div>
      )}

      {/* Image Gallery */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="w-full aspect-[4/3] bg-gray-100 rounded overflow-hidden"
            >
              <img
                src={img.url}
                alt={`Article image ${img.depth}`}
                onError={handleImgError}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Article Contents */}
      <section className="mb-4">
        <p className="text-gray-800 text-sm overflow-hidden line-clamp-3">
          {preview}
        </p>
      </section>

      {/* Comments Preview */}
      <footer className="border-t pt-4">
        <div className="flex items-center text-gray-700 text-sm mb-2">
          <LucideReact.MessageCircle
            className="mr-1 text-gray-500"
            size={16}
          />
          <span>{comments.length} comment{comments.length !== 1 && "s"}</span>
        </div>
        <div className="space-y-2">
          {displayedComments.map((c) => (
            <p
              key={c.id}
              className="text-gray-700 text-sm truncate"
              title={c.contents}
            >
              {c.contents}
            </p>
          ))}
        </div>
        {remainingCount > 0 && (
          <p className="text-gray-500 text-xs mt-2">
            +{remainingCount} more comment{remainingCount !== 1 && "s"}
          </p>
        )}
      </footer>
    </article>
  );
}
