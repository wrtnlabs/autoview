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
    export interface IS_SAME_POSITION {
        type: "business";
        result: false;
        code: 4003;
        data: "\uC774\uBBF8\uC9C0\uC758 \uC815\uB82C \uAC12\uC774 \uB3D9\uC77C\uD55C \uACBD\uC6B0\uAC00 \uC874\uC7AC\uD569\uB2C8\uB2E4.";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CANNOT_FINDONE_ARTICLE | AutoViewInputSubTypes.ResponseForm_lt_ArticleType.DetailArticle_gt_ | AutoViewInputSubTypes.IS_SAME_POSITION;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isError = value.result === false;
  if (isError) {
    const errorCode = value.code;
    const errorMessage = value.data as string;
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-3">
        <LucideReact.AlertTriangle size={24} className="flex-shrink-0 text-red-600" />
        <div>
          <p className="font-semibold">Error {errorCode}</p>
          <p className="mt-1">{errorMessage}</p>
        </div>
      </div>
    );
  }

  // It's a successful detail-article response
  const detailResponse = value as AutoViewInputSubTypes.ResponseForm_lt_ArticleType.DetailArticle_gt_;
  const article = detailResponse.data;
  const writer = article.writer;
  const displayName = writer.nickname?.trim() ? writer.nickname : `User ${writer.id}`;
  const profileSrc =
    writer.profileImage ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=0D8ABC&color=fff`;
  const images = article.images ?? [];
  const primaryImage = images[0];
  const extraImageCount = images.length > 1 ? images.length - 1 : 0;
  const comments = article.comments;
  const commentCount = comments.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-full">
      {/* Author */}
      <header className="flex items-center gap-3">
        <img
          src={profileSrc}
          alt={displayName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=0D8ABC&color=fff`;
          }}
          className="w-10 h-10 rounded-full object-cover bg-gray-100"
        />
        <span className="text-lg font-medium text-gray-900">{displayName}</span>
      </header>

      {/* Primary Image */}
      {primaryImage && (
        <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
          <img
            src={primaryImage.url}
            alt={`Image ${primaryImage.id}`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/400x300/f1f5f9/64748b?text=Image";
            }}
            className="w-full h-full object-cover"
          />
          {extraImageCount > 0 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded">
              +{extraImageCount}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div>
        <p className="text-gray-800 whitespace-pre-wrap line-clamp-3">{article.contents}</p>
      </div>

      {/* Comments */}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-center text-gray-600 gap-1">
          <LucideReact.MessageSquare size={16} className="text-gray-500" />
          <span className="text-sm">
            {commentCount} Comment{commentCount !== 1 ? "s" : ""}
          </span>
        </div>
        {commentCount > 0 && (
          <ul className="mt-2 space-y-2">
            {comments.slice(0, 3).map((comment) => (
              <li key={comment.id} className="flex items-start gap-2">
                <LucideReact.ChevronRight size={16} className="text-gray-400 mt-1" />
                <p className="text-gray-700 text-sm line-clamp-2">{comment.contents}</p>
              </li>
            ))}
            {commentCount > 3 && (
              <li className="text-gray-500 text-sm italic">View all comments</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
