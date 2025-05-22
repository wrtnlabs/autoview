import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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
      reason:
        | "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C"
        | "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C";
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.TryPagination_lt_UserType.ProfileList_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { list, totalResult, page, totalPage } = value.data;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header: Title and Pagination Info */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Acquaintances</h2>
        <span className="text-sm text-gray-500">
          Page {page} of {totalPage}
        </span>
      </div>

      {/* Empty State */}
      {totalResult === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <p className="text-sm">No acquaintances found.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((user) => {
            // Derive display name and avatar URL
            const displayName = user.nickname || `User ${user.id}`;
            const avatarUrl =
              user.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName,
              )}&background=0D8ABC&color=fff`;

            return (
              <li
                key={user.id}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {displayName}
                </h3>
                <p className="mt-1 text-xs text-gray-500 text-center line-clamp-2">
                  {user.reason}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
