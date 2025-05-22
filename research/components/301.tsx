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
  const { data } = value;
  const { list, page, totalPage, totalResult, search } = data;

  // Map reason codes to human‐readable labels and icons
  const reasonMap: Record<string, { label: string; icon: JSX.Element }> = {
    "나를 팔로우한 사람": {
      label: "Follows you",
      icon: <LucideReact.UserCheck className="text-green-500" size={16} />,
    },
    "내가 팔로우한 사람": {
      label: "You follow",
      icon: <LucideReact.UserPlus className="text-gray-400" size={16} />,
    },
  };

  // Generate a placeholder avatar URL based on nickname
  const makeAvatarUrl = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with summary info */}
      <header className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <LucideReact.Users className="text-gray-700" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">Acquaintances</h2>
        </div>
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
          <span>
            Page {page} of {totalPage}
          </span>
          <span>
            Showing {list.length} of {totalResult}
          </span>
          {search && (
            <div className="flex items-center gap-1 text-gray-500">
              <LucideReact.Search size={16} />
              <span className="truncate max-w-xs">"{search}"</span>
            </div>
          )}
        </div>
      </header>

      {/* Empty state */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No acquaintances found.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {list.map((item) => {
            const avatarSrc = item.profileImage || makeAvatarUrl(item.nickname);
            const reasonInfo = reasonMap[item.reason] || {
              label: item.reason,
              icon: <LucideReact.User className="text-gray-400" size={16} />,
            };

            return (
              <li
                key={item.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
              >
                <img
                  src={avatarSrc}
                  alt={item.nickname}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = makeAvatarUrl(item.nickname);
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {item.nickname}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500 truncate">
                    {reasonInfo.icon}
                    <span>{reasonInfo.label}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
