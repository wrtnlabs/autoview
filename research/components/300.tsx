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
  const { data } = value;
  const { list, count, totalResult, totalPage, page, search } = data;

  // Generate a fallback avatar URL based on nickname
  const getAvatarUrl = (nickname: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(nickname || 'User')}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary Section */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          <LucideReact.Users size={16} className="text-gray-500" />
          <span>{`${count} of ${totalResult} users`}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>Page:</span>
          <span className="font-medium">{`${page}/${totalPage}`}</span>
        </div>
        {search && (
          <div className="flex items-center space-x-1">
            <LucideReact.Search size={16} className="text-gray-500" />
            <span className="italic">{search}</span>
          </div>
        )}
      </div>

      {/* List of Acquaintances */}
      {list.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((item) => (
            <li
              key={item.id}
              className="flex items-center bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex-shrink-0">
                <img
                  src={item.profileImage || getAvatarUrl(item.nickname)}
                  alt={item.nickname || 'User avatar'}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src = getAvatarUrl(item.nickname);
                  }}
                />
              </div>
              <div className="ml-3 flex-grow truncate">
                <p className="text-gray-900 font-medium truncate">
                  {item.nickname || 'Unnamed User'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {item.reason === '\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C'
                    ? 'Follows You'
                    : 'You Follow'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-sm">No users to display.</p>
        </div>
      )}
    </div>
  );
}
