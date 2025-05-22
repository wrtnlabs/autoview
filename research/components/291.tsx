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
  export type IS_SAME_POSITION = {
    type: "business";
    result: false;
    code: 4003;
    data: "\uC774\uBBF8\uC9C0\uC758 \uC815\uB82C \uAC12\uC774 \uB3D9\uC77C\uD55C \uACBD\uC6B0\uAC00 \uC874\uC7AC\uD569\uB2C8\uB2E4.";
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE
  | AutoViewInputSubTypes.ResponseForm_lt_ArticleType.DetailArticle_gt_
  | AutoViewInputSubTypes.IS_SAME_POSITION;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  if (!value.result) {
    // Error state: display business errors
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 flex items-center gap-2">
        <LucideReact.AlertCircle size={20} className="flex-shrink-0" />
        <span className="text-sm">{value.data}</span>
      </div>
    );
  }

  // Success state: we have a DetailArticle
  const article = value.data;
  const { id, writer, contents, images = [], comments } = article;
  // Avatar with fallback
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    writer.nickname || `User ${writer.id}`,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = writer.profileImage || avatarFallback;
  // Prepare comments preview
  const previewComments = comments.slice(0, 3);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: author info */}
      <div className="flex items-center">
        <img
          src={avatarUrl}
          alt={`${writer.nickname || `User ${writer.id}`} Avatar`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = avatarFallback;
          }}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="ml-3">
          <p className="text-gray-900 font-medium">
            {writer.nickname || `User #${writer.id}`}
          </p>
          <p className="text-gray-500 text-sm">Article #{id}</p>
        </div>
      </div>

      {/* Article contents */}
      <p className="mt-4 text-gray-700 text-sm line-clamp-5">{contents}</p>

      {/* Images gallery */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={`Article image ${img.id}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/400x300/f1f5f9/64748b?text=Image";
              }}
              className="w-full aspect-[4/3] object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* Comments preview */}
      <div className="mt-4">
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.MessageSquare size={16} />
          <span className="ml-1">
            {comments.length} comment{comments.length !== 1 && "s"}
          </span>
        </div>
        {previewComments.length > 0 && (
          <ul className="mt-2 space-y-1">
            {previewComments.map((c) => (
              <li
                key={c.id}
                className="text-gray-700 text-sm truncate"
                title={c.contents}
              >
                {c.contents}
              </li>
            ))}
          </ul>
        )}
        {comments.length > previewComments.length && (
          <p className="mt-1 text-gray-500 text-sm">
            …and {comments.length - previewComments.length} more
          </p>
        )}
      </div>
    </div>
  );
}
