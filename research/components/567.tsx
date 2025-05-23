import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Project Collaborator Permission
     *
     * @title Project Collaborator Permission
    */
    export interface project_collaborator_permission {
        permission: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
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
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.project_collaborator_permission;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const displayName = user && user.name ? user.name : user ? user.login : "Unknown User";
  const placeholderAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;

  // Badge color mapping for common GitHub permission levels
  const badgeColors: Record<string, { bg: string; text: string }> = {
    admin: { bg: "bg-red-100", text: "text-red-800" },
    maintain: { bg: "bg-yellow-100", text: "text-yellow-800" },
    write: { bg: "bg-blue-100", text: "text-blue-800" },
    triage: { bg: "bg-orange-100", text: "text-orange-800" },
    read: { bg: "bg-green-100", text: "text-green-800" },
  };
  const key = value.permission.toLowerCase();
  const { bg, text } = badgeColors[key] ?? { bg: "bg-gray-100", text: "text-gray-800" };
  const formattedPermission = value.permission.charAt(0).toUpperCase() + value.permission.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
      {user ? (
        <img
          src={user.avatar_url}
          alt={displayName}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholderAvatarUrl;
          }}
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <LucideReact.User className="text-gray-400" size={24} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-900 truncate">{displayName}</span>
          {user && user.name ? (
            <span className="text-sm text-gray-500 truncate">@{user.login}</span>
          ) : null}
        </div>
        {user && user.email ? (
          <div className="flex items-center text-sm text-gray-500 mt-1 truncate">
            <LucideReact.Mail size={16} className="mr-1 flex-shrink-0" />
            <span>{user.email}</span>
          </div>
        ) : null}
        <div className="mt-2">
          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${bg} ${text}`}>
            {formattedPermission}
          </span>
        </div>
      </div>
    </div>
  );
}
