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
    data: { list, totalResult, totalPage, page, search },
  } = value;
  const displayCount = list.length;

  // Helper to render avatar or initials
  const renderAvatar = (user: AutoViewInputSubTypes.UserType.Acquaintance) => {
    if (user.profileImage) {
      return (
        <img
          src={user.profileImage}
          alt={user.nickname || `User ${user.id}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }
    const initial = user.nickname
      ? user.nickname.charAt(0).toUpperCase()
      : user.id.toString().charAt(0);
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">
        {initial}
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Acquaintance List
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Showing {displayCount} of {totalResult} users
          {search ? (
            <>
              {' '}
              for "<span className="italic">{search}</span>"
            </>
          ) : null}
          , page {page} of {totalPage}.
        </p>
      </div>
      {/* List */}
      <ul className="divide-y divide-gray-200">
        {list.map((user) => (
          <li
            key={user.id}
            className="flex items-center space-x-4 py-3 hover:bg-gray-50"
          >
            {renderAvatar(user)}
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-medium truncate">
                {user.nickname || `User ${user.id}`}
              </p>
              <p className="text-gray-500 text-sm truncate">{user.reason}</p>
            </div>
          </li>
        ))}
        {displayCount === 0 && (
          <li className="py-4 text-center text-gray-500 text-sm">
            No users to display.
          </li>
        )}
      </ul>
      {/* Footer */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Data Code: {value.code}
      </div>
    </div>
  );
}
