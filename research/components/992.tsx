import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
    name?: string | null;
    email?: string | null;
    login: string;
    id: number & tags.Type<"int32">;
    node_id: string;
    avatar_url: string & tags.Format<"uri">;
    gravatar_id: string | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    followers_url: string & tags.Format<"uri">;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string & tags.Format<"uri">;
    organizations_url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string;
    received_events_url: string & tags.Format<"uri">;
    type: string;
    site_admin: boolean;
    starred_at?: string;
    user_view_type?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.simple_user[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalUsers = value.length;
  const adminCount = value.filter((user) => user.site_admin).length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          <LucideReact.Users
            size={20}
            className="inline-block mr-2 text-gray-600"
          />
          {totalUsers} {totalUsers === 1 ? "User" : "Users"}
        </h2>
        <div className="flex items-center mt-2 sm:mt-0">
          <LucideReact.Shield size={20} className="text-red-500" />
          <span className="ml-1 text-gray-700 font-medium">
            {adminCount} {adminCount === 1 ? "Admin" : "Admins"}
          </span>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {value.map((user) => {
          const displayName = user.name?.trim() || user.login;
          return (
            <div
              key={user.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={user.avatar_url}
                  alt={`${displayName} avatar`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.onerror = null;
                    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      displayName,
                    )}&background=0D8ABC&color=fff`;
                  }}
                />
              </div>

              {/* Name */}
              <h3 className="mt-3 text-lg font-semibold text-gray-800 truncate">
                {displayName}
              </h3>

              {/* Login */}
              {user.name && (
                <p className="text-sm text-gray-500 truncate">@{user.login}</p>
              )}

              {/* Email */}
              {user.email && (
                <div className="flex items-center text-gray-500 text-sm mt-2 truncate">
                  <LucideReact.Mail size={16} className="mr-1" />
                  <span>{user.email}</span>
                </div>
              )}

              {/* Site Admin Indicator */}
              {user.site_admin && (
                <div className="flex items-center mt-2 text-red-600 text-sm uppercase font-medium">
                  <LucideReact.CheckCircle size={16} className="mr-1" />
                  <span>Admin</span>
                </div>
              )}

              {/* Profile URL */}
              <div className="flex items-center text-gray-500 text-xs mt-3 break-all">
                <LucideReact.Link size={14} className="mr-1" />
                <span className="truncate">{user.html_url}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
