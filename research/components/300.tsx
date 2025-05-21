import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace TryPagination_lt_UserType {
        export type ProfileList_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.PaginationResponseType_lt_UserType.ProfileList_gt_;
        };
    }
    export namespace PaginationResponseType_lt_UserType {
        export type ProfileList_gt_ = {
            list: AutoViewInputSubTypes.UserType.Acquaintance[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        };
    }
    export namespace UserType {
        export type Acquaintance = {
            /**
             * 사용자의 별칭, 설정하지 않는 경우도 있다.
            */
            nickname: string;
            id: number;
            /**
             * 사용자의 프로필 이미지
            */
            profileImage?: string | null;
            reason: "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C" | "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C";
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_UserType.ProfileList_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { list, totalResult, page, totalPage } = value.data;
  const summary = `Showing ${list.length} of ${totalResult} results`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Summary and pagination info */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{summary}</h2>
        <span className="text-sm text-gray-500">
          Page {page} of {totalPage}
        </span>
      </div>
      {/* User cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-4 bg-white rounded-lg shadow"
          >
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.nickname}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl text-gray-500">
                  {user.nickname.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            {/* User info */}
            <div className="overflow-hidden">
              <div className="text-lg font-medium text-gray-900 truncate">
                {user.nickname || 'Unknown'}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {user.reason}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
