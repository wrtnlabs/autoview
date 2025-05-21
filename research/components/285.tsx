import { tags } from "typia";
import React from "react";
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
            createdAt: string | any;
            /**
             * 이미지의 아이디로 없을 수도 있다.
             * 없는 경우에는 그 게시글에 달린 것으로, xPosition, yPosition을 무시한다.
            */
            imageId?: number | null;
            /**
             * 소수점을 포함한 좌표 값
            */
            xPosition?: (string & tags.Pattern<"^(-?\\d+\\.?\\d*|(-?\\d+\\.?\\d*))$">) | number | null;
            /**
             * 소수점을 포함한 좌표 값
            */
            yPosition?: (string & tags.Pattern<"^(-?\\d+\\.?\\d*|(-?\\d+\\.?\\d*))$">) | number | null;
            writer: AutoViewInputSubTypes.UserType.Profile;
        };
    }
    export type Date = any;
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
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_CommentType.CommentsByArcile_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const { data } = value;
  const { list, count, totalResult, totalPage, page } = data;

  const formatDate = (iso: string | any): string => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Comments ({totalResult})
      </h2>
      <ul className="space-y-6">
        {list.map((comment) => {
          const { id, contents, createdAt, imageId, xPosition, yPosition, writer } = comment;
          const hasAnnotation = imageId != null && xPosition != null && yPosition != null;

          return (
            <li key={id} className="flex space-x-4">
              {writer.profileImage ? (
                <img
                  src={writer.profileImage}
                  alt={`${writer.nickname}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium uppercase">
                  {writer.nickname.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">{writer.nickname}</span>
                  <span className="text-gray-500 text-sm">{formatDate(createdAt)}</span>
                </div>
                <p className="text-gray-700 text-sm mt-1 line-clamp-3">{contents}</p>
                {hasAnnotation && (
                  <div className="mt-2 text-xs text-gray-500">
                    On Image (ID: {imageId}), Coordinates: ({xPosition}, {yPosition})
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex justify-between text-sm text-gray-500">
        <span>Page {page} of {totalPage}</span>
        <span>{count} shown</span>
      </div>
    </div>
  );
}
