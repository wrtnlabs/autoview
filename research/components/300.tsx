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
  const {
    data: { list, count, totalResult, totalPage, search, page },
  } = value;

  // Map raw reasons to user-friendly labels
  const reasonLabelMap: Record<
    AutoViewInputSubTypes.UserType.Acquaintance["reason"],
    string
  > = {
    "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C": "Follower",
    "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C": "Following",
  };

  // Summary text for results
  const summaryText = search
    ? `Search “${search}”: ${count} of ${totalResult}`
    : `${count} of ${totalResult} users`;

  // Fallback avatar on image load error
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.onerror = null;
    const name = e.currentTarget.alt || "User";
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=0D8ABC&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600 truncate">{summaryText}</div>
        <div className="mt-1 sm:mt-0 text-sm text-gray-600">
          Page {page} of {totalPage}
        </div>
      </div>

      {/* User list */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-gray-400">
          <LucideReact.AlertCircle
            size={48}
            className="text-gray-300"
            aria-label="No users"
          />
          <div className="mt-2 text-sm">No users found</div>
        </div>
      ) : (
        <ul className="space-y-3">
          {list.map((user) => {
            const label = reasonLabelMap[user.reason];
            const badgeClasses =
              user.reason ===
              "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800";

            return (
              <li
                key={user.id}
                className="flex items-center bg-gray-50 p-3 rounded-lg"
              >
                {/* Avatar */}
                <div className="w-10 h-10 flex-shrink-0">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.nickname || `User ${user.id}`}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.nickname || `User ${user.id}`,
                      )}&background=0D8ABC&color=fff`}
                      alt={user.nickname || `User ${user.id}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0 px-3">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {user.nickname || `User ${user.id}`}
                  </div>
                </div>

                {/* Reason badge */}
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${badgeClasses}`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
