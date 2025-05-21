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
  const {
    data: { list, count, totalResult, totalPage, page, search },
  } = value;

  // Map the Korean reason strings to human-readable English badges
  const reasonMap: Record<AutoViewInputSubTypes.UserType.Acquaintance["reason"], string> = {
    "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C": "Follower",
    "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C": "Following",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-full">
      {/* Summary */}
      <div className="mb-4 text-sm text-gray-600">
        {search && (
          <span className="italic">
            Search results for &ldquo;{search}&rdquo;:&nbsp;
          </span>
        )}
        Showing <span className="font-medium">{count}</span> of{" "}
        <span className="font-medium">{totalResult}</span> users (Page{" "}
        <span className="font-medium">{page}</span> /{" "}
        <span className="font-medium">{totalPage}</span>)
      </div>

      {/* User List */}
      <ul className="divide-y divide-gray-200">
        {list.map((user) => {
          const displayReason = reasonMap[user.reason] || "Unknown";
          const initials = user.nickname
            ? user.nickname.charAt(0).toUpperCase()
            : String(user.id).charAt(0);

          return (
            <li
              key={user.id}
              className="flex items-center py-3 space-x-4"
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={`${user.nickname || "User"}'s avatar`}
                  className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                  {initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.nickname || `User ${user.id}`}
                </p>
                <p className="mt-1 text-xs inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                  {displayReason}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
