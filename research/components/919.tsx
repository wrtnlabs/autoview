import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.simple_user[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived constant: total number of users
  const userCount = value.length;

  // Return the composed visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Users className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          GitHub Users ({userCount})
        </h2>
      </div>

      {userCount === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No users available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((user: AutoViewInputSubTypes.simple_user) => (
            <div
              key={user.id}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.login,
                  )}&background=0D8ABC&color=fff`;
                }}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />

              <div className="text-center w-full">
                <div className="flex items-center justify-center text-gray-900 font-medium truncate">
                  <span>{user.login}</span>
                  {user.site_admin && (
                    <LucideReact.ShieldCheck
                      className="ml-1 text-blue-500"
                      size={16}
                      aria-label="Site Admin"
                    />
                  )}
                </div>

                {user.name && (
                  <div className="mt-1 text-sm text-gray-600 truncate">
                    {user.name}
                  </div>
                )}

                {user.email && (
                  <div className="flex items-center mt-2 text-sm text-gray-500 truncate">
                    <LucideReact.Mail size={16} aria-label="Email" />
                    <span className="ml-1">{user.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
