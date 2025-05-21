import { tags } from "typia";
import React from "react";
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
  //    We derive a display name, optional formatted email, and a human-readable starred date for each user.

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const userCards = value.map((user: AutoViewInputSubTypes.simple_user) => {
    const displayName = user.name?.trim() || user.login;
    const formattedEmail = user.email ? user.email : null;
    const starredDate = user.starred_at
      ? new Date(user.starred_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

    return (
      <div
        key={user.id}
        className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center"
      >
        <img
          src={user.avatar_url}
          alt={`${displayName} avatar`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <h2 className="mt-3 text-lg font-semibold text-gray-800 truncate">
          {displayName}
        </h2>
        {formattedEmail && (
          <p className="mt-1 text-sm text-gray-500 truncate">
            {formattedEmail}
          </p>
        )}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {user.type}
          </span>
          {user.site_admin && (
            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              Admin
            </span>
          )}
        </div>
        {starredDate && (
          <p className="mt-2 text-xs text-gray-400">Starred: {starredDate}</p>
        )}
      </div>
    );
  });

  // 3. Return the React element.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {userCards}
    </div>
  );
}
