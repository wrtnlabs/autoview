import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type CANNOT_FINDONE_ARTICLE = {
    type: "business";
    result: false;
    code: 4004;
    data: "\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
  };
  export namespace ResponseForm_lt_ArticleType {
    export type DetailArticle_gt_ = {
      result: true;
      code: 1000;
      requestToResponse?: string;
      data: AutoViewInputSubTypes.ArticleType.DetailArticle;
    };
  }
  export namespace ArticleType {
    export type DetailArticle = {
      images?: AutoViewInputSubTypes.Pick_lt_BodyImageEntity_comma__space__doublequote_id_doublequote__space__or__space__doublequote_position_doublequote__space__or__space__doublequote_url_doublequote__space__or__space__doublequote_depth_doublequote__gt_[];
      writer: AutoViewInputSubTypes.UserType.Profile;
      comments: AutoViewInputSubTypes.Pick_lt_CommentEntity_comma__space__doublequote_id_doublequote__space__or__space__doublequote_contents_doublequote__space__or__space__doublequote_parentId_doublequote__space__or__space__doublequote_xPosition_doublequote__space__or__space__doublequote_yPosition_doublequote__gt_[];
      id: number;
      /**
       * 글의 내용물로, 최대 3,000자
       */
      contents: string;
    };
  }
  export type Pick_lt_BodyImageEntity_comma__space__doublequote_id_doublequote__space__or__space__doublequote_position_doublequote__space__or__space__doublequote_url_doublequote__space__or__space__doublequote_depth_doublequote__gt_ =
    {
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
    };
  export namespace UserType {
    export type Profile = {
      /**
       * 사용자의 별칭, 설정하지 않는 경우도 있다.
       */
      nickname: string;
      id: number;
      /**
       * 사용자의 프로필 이미지
       */
      profileImage?: string | null;
    };
  }
  export type Pick_lt_CommentEntity_comma__space__doublequote_id_doublequote__space__or__space__doublequote_contents_doublequote__space__or__space__doublequote_parentId_doublequote__space__or__space__doublequote_xPosition_doublequote__space__or__space__doublequote_yPosition_doublequote__gt_ =
    {
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
    };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE
  | AutoViewInputSubTypes.ResponseForm_lt_ArticleType.DetailArticle_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isError = !value.result;

  if (isError) {
    // Error case: show a styled error message
    const errorData = value as AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE;
    const message = errorData.data || "An unexpected error occurred.";
    const code = errorData.code;

    return (
      <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
        <LucideReact.AlertCircle
          size={24}
          className="text-red-500 flex-shrink-0 mr-3"
          aria-hidden="true"
        />
        <div>
          <p className="text-red-800 font-semibold">Error {code}</p>
          <p className="text-red-700 mt-1">{message}</p>
        </div>
      </div>
    );
  }

  // Success case: display article details
  const article = (
    value as AutoViewInputSubTypes.ResponseForm_lt_ArticleType.DetailArticle_gt_
  ).data;
  const displayName = article.writer.nickname || `User ${article.writer.id}`;
  const avatarSrc =
    article.writer.profileImage ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`;
  const primaryImage =
    Array.isArray(article.images) && article.images.length > 0
      ? article.images[0].url
      : "https://placehold.co/600x400/e2e8f0/1e293b?text=Image";
  const commentCount = Array.isArray(article.comments)
    ? article.comments.length
    : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Writer info */}
      <header className="flex items-center mb-4">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-10 h-10 rounded-full object-cover mr-3 bg-gray-200"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=64748b&color=fff`;
          }}
        />
        <div>
          <p className="text-gray-900 font-medium">{displayName}</p>
        </div>
      </header>

      {/* Main Image */}
      <div className="w-full mb-4">
        <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
          <img
            src={primaryImage}
            alt="Article Image"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/600x400/e2e8f0/1e293b?text=Image";
            }}
          />
        </div>
      </div>

      {/* Content */}
      <section className="text-gray-700 mb-4 line-clamp-6">
        {article.contents}
      </section>

      {/* Footer: Comments */}
      <footer className="flex items-center text-gray-500 text-sm">
        <LucideReact.MessageSquare
          size={16}
          className="mr-1 flex-shrink-0"
          aria-hidden="true"
        />
        <span>
          {commentCount} Comment{commentCount !== 1 ? "s" : ""}
        </span>
      </footer>
    </article>
  );
}
