import * as LucideReact from "lucide-react";
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
  // 1. No additional aggregation needed; we derive displayName and handle defaults inline.

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((user) => {
        const displayName = user.name?.trim() ? user.name! : user.login;
        const emailText = user.email?.trim() ? user.email : "No public email";
        const profileLink = user.html_url;

        return (
          <div
            key={user.id}
            className="flex bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex-shrink-0">
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                className="w-16 h-16 m-4 rounded-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName,
                  )}&background=random`;
                }}
              />
            </div>
            <div className="flex flex-col justify-between flex-1 p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <LucideReact.User size={16} className="text-gray-500" />
                  <span className="text-gray-900 font-medium truncate">
                    {displayName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <LucideReact.Mail size={16} className="text-gray-500" />
                  <span className="text-gray-600 text-sm truncate">
                    {emailText}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <LucideReact.Link size={16} className="text-gray-500" />
                  <span className="text-blue-600 text-sm truncate">
                    {profileLink}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {user.site_admin ? (
                  <>
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                    />
                    <span className="ml-1 text-green-600 text-sm">Admin</span>
                  </>
                ) : (
                  <>
                    <LucideReact.XCircle size={16} className="text-red-500" />
                    <span className="ml-1 text-red-600 text-sm">User</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
