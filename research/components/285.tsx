import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace TryPagination_lt_CommentType {
    export type CommentsByArcile_gt_ = {
      result: true;
      code: 1000;
      requestToResponse?: string;
      data: AutoViewInputSubTypes.PaginationResponseType_lt_CommentType.CommentsByArcile_gt_;
    };
  }
  export namespace PaginationResponseType_lt_CommentType {
    export type CommentsByArcile_gt_ = {
      list: AutoViewInputSubTypes.Merge_lt_CommentType.RootComment_comma__space___type_gt_[];
      count: number;
      totalResult: number;
      totalPage: number;
      search?: string;
      page: number;
    };
  }
  export namespace Merge_lt_CommentType {
    export type RootComment_comma__space___type_gt_ = {
      id: number;
      /**
       * 작성자의 아이디
       */
      writerId: number & tags.Type<"int32">;
      /**
       * 게시글 내용
       */
      contents: string;
      createdAt: string | AutoViewInputSubTypes.Date;
      /**
       * 이미지의 아이디로 없을 수도 있다.
       * 없는 경우에는 그 게시글에 달린 것으로, xPosition, yPosition을 무시한다.
       */
      imageId?: number | null;
      /**
       * 소수점을 포함한 좌표 값
       */
      xPosition?: string | number | null;
      /**
       * 소수점을 포함한 좌표 값
       */
      yPosition?: string | number | null;
      writer: AutoViewInputSubTypes.UserType.Profile;
    };
  }
  export type Date = {};
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
}
export type AutoViewInput =
  AutoViewInputSubTypes.TryPagination_lt_CommentType.CommentsByArcile_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { list, count, totalResult, totalPage, page } = value.data;

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-6">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 text-sm">
        <div className="flex items-center mb-2 sm:mb-0">
          <LucideReact.MessageSquare size={16} className="mr-1 text-gray-500" />
          <span>
            Showing {list.length} of {totalResult} comments
          </span>
        </div>
        <div className="flex items-center">
          <span>Page {page}</span>
          <span className="mx-1">/</span>
          <span>{totalPage}</span>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {list.map((comment) => {
          const avatarSrc =
            comment.writer.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              comment.writer.nickname || `User ${comment.writer.id}`,
            )}&background=0D8ABC&color=fff`;

          return (
            <div
              key={comment.id}
              className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
            >
              {/* Avatar */}
              <img
                src={avatarSrc}
                alt={comment.writer.nickname || "User avatar"}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    comment.writer.nickname || `User ${comment.writer.id}`,
                  )}&background=64748b&color=fff`;
                }}
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-gray-800 truncate">
                    {comment.writer.nickname || `User ${comment.writer.id}`}
                  </span>
                  <time
                    dateTime={
                      typeof comment.createdAt === "string"
                        ? comment.createdAt
                        : ""
                    }
                    className="text-gray-500 text-xs mt-1 sm:mt-0"
                  >
                    {formatDate(
                      typeof comment.createdAt === "string"
                        ? comment.createdAt
                        : "",
                    )}
                  </time>
                </div>
                <p className="mt-1 text-gray-700 text-sm line-clamp-3">
                  {comment.contents}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
