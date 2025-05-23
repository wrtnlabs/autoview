import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace TryPagination_lt_CommentType {
        export interface CommentsByArcile_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.PaginationResponseType_lt_CommentType.CommentsByArcile_gt_;
        }
    }
    export namespace PaginationResponseType_lt_CommentType {
        export interface CommentsByArcile_gt_ {
            list: AutoViewInputSubTypes.Merge_lt_CommentType.RootComment_comma__space___type_gt_[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        }
    }
    export namespace Merge_lt_CommentType {
        export interface RootComment_comma__space___type_gt_ {
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
        }
    }
    export interface Date {
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
}
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_CommentType.CommentsByArcile_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { data } = value;
  const { list: comments, count, totalPage, page, search } = data;

  const formatDate = (d: string | AutoViewInputSubTypes.Date): string => {
    if (typeof d === "string") {
      const dt = new Date(d);
      return dt.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm text-gray-600">
        <span>{count} comments</span>
        <span className="mt-1 sm:mt-0">
          Page {page} of {totalPage}
        </span>
      </div>
      {/* Optional search query display */}
      {search && (
        <div className="mt-2 text-sm text-gray-500">
          Search: <span className="italic">"{search}"</span>
        </div>
      )}
      {/* Comments List */}
      <ul className="mt-4 space-y-6">
        {comments.map((c) => {
          const writer = c.writer;
          const displayName = writer.nickname || `User #${writer.id}`;
          const avatarSrc =
            writer.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=ccc&color=fff`;
          const createdAt = formatDate(c.createdAt);
          const hasImage = c.imageId != null;
          const xPos =
            c.xPosition != null ? String(c.xPosition) : undefined;
          const yPos =
            c.yPosition != null ? String(c.yPosition) : undefined;

          return (
            <li key={c.id} className="flex items-start gap-4">
              <img
                src={avatarSrc}
                alt={`${displayName} avatar`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      displayName,
                    )}&background=ccc&color=fff`;
                }}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">
                    {displayName}
                  </span>
                  <time
                    dateTime={typeof c.createdAt === "string" ? c.createdAt : undefined}
                    className="text-sm text-gray-500"
                  >
                    {createdAt}
                  </time>
                </div>
                <p className="mt-1 text-gray-700 text-sm line-clamp-3">
                  {c.contents}
                </p>
                {hasImage && xPos && yPos && (
                  <div className="mt-2 flex items-center text-gray-500 text-sm">
                    <LucideReact.Image size={16} className="mr-1" />
                    <span>
                      Image annotation at ({xPos}, {yPos})
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
