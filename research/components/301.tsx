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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const data = value.data;
  const { list, count, totalResult, page, totalPage, search } = data;

  // Map internal reason codes to user-friendly labels and icons
  const reasonMap: Record<string, { label: string; icon: JSX.Element }> = {
    "나를 팔로우한 사람": {
      label: "Follows You",
      icon: <LucideReact.UserPlus size={16} className="text-blue-500" />
    },
    "내가 팔로우한 사람": {
      label: "Following",
      icon: <LucideReact.UserCheck size={16} className="text-green-500" />
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header with title, optional search, and summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Acquaintances</h2>
        <div className="mt-2 sm:mt-0 flex items-center space-x-4 text-sm text-gray-500">
          {search && (
            <div>
              Search: <span className="font-medium text-gray-700">{search}</span>
            </div>
          )}
          <div>
            {count} of {totalResult}
          </div>
        </div>
      </div>

      {/* List or empty state */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-sm">No acquaintances found.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {list.map((contact: AutoViewInputSubTypes.UserType.Acquaintance) => {
            // Prepare avatar source and fallback
            const placeholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              contact.nickname
            )}&background=0D8ABC&color=fff`;
            const imgSrc = contact.profileImage || placeholder;

            // Determine label and icon for reason
            const reasonInfo =
              reasonMap[contact.reason] || {
                label: contact.reason,
                icon: <LucideReact.User size={16} className="text-gray-400" />
              };

            return (
              <li key={contact.id} className="py-3 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={imgSrc}
                    alt={contact.nickname}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = placeholder;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {contact.nickname}
                  </p>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span className="mr-1">{reasonInfo.icon}</span>
                    <span>{reasonInfo.label}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Footer with pagination info */}
      <div className="mt-4 flex justify-center text-sm text-gray-500">
        Page {page} of {totalPage}
      </div>
    </div>
  );
}
