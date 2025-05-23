import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace TryPagination_lt_UserType {
        export interface ProfileList_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.PaginationResponseType_lt_UserType.ProfileList_gt_;
        }
    }
    export namespace PaginationResponseType_lt_UserType {
        export interface ProfileList_gt_ {
            list: AutoViewInputSubTypes.UserType.Acquaintance[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        }
    }
    export namespace UserType {
        export interface Acquaintance {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_UserType.ProfileList_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const { list, count, totalResult, totalPage, page, search } = value.data;
  const reasonMapping: Record<string, { label: string; icon: JSX.Element | null }> = {
    "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C": {
      label: "Follows you",
      icon: <LucideReact.UserPlus className="text-blue-500" size={16} />
    },
    "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C": {
      label: "Following",
      icon: <LucideReact.UserCheck className="text-green-500" size={16} />
    }
  };

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow w-full max-w-md mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Acquaintances</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Showing {count} of {totalResult}</span>
          <span>• Page {page} of {totalPage}</span>
        </div>
        {search && (
          <p className="text-sm text-gray-500 mt-1">
            Search: <span className="italic">&quot;{search}&quot;</span>
          </p>
        )}
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-4">No acquaintances found.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {list.map((item) => {
            const placeholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              item.nickname
            )}&background=0D8ABC&color=fff`;
            const mapping = reasonMapping[item.reason] || {
              label: item.reason,
              icon: null
            };

            return (
              <li key={item.id} className="py-3 flex items-center space-x-4">
                <img
                  src={item.profileImage ?? placeholder}
                  alt={`${item.nickname}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = placeholder;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium truncate">
                    {item.nickname}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    {mapping.icon}
                    <span className={mapping.icon ? "ml-1" : ""}>
                      {mapping.label}
                    </span>
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
