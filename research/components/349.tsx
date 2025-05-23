import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A comment made to a gist.
     *
     * @title Gist Comment
    */
    export interface gist_comment {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        /**
         * The comment text.
        */
        body: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: AutoViewInputSubTypes.author_association;
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
    /**
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.gist_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at);
  const formattedCreated = createdAt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const isEdited = value.updated_at !== value.created_at;

  // Determine user display information
  const user = value.user;
  const loginName = user?.login ?? "Unknown User";
  const displayName = user?.name ? `${user.name} (${loginName})` : loginName;
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    loginName
  )}&background=0D8ABC&color=fff`;

  // Map author_association to badge styles
  const associationStyles: Record<AutoViewInputSubTypes.author_association, string> = {
    OWNER: "bg-green-100 text-green-800",
    MEMBER: "bg-blue-100 text-blue-800",
    COLLABORATOR: "bg-yellow-100 text-yellow-800",
    CONTRIBUTOR: "bg-purple-100 text-purple-800",
    FIRST_TIMER: "bg-indigo-100 text-indigo-800",
    FIRST_TIME_CONTRIBUTOR: "bg-indigo-100 text-indigo-800",
    MANNEQUIN: "bg-pink-100 text-pink-800",
    NONE: "bg-gray-100 text-gray-800",
  };
  const badgeClass = associationStyles[value.author_association];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <header className="flex items-center gap-3">
        {user ? (
          <img
            src={user.avatar_url}
            alt={loginName}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = avatarPlaceholder;
            }}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <LucideReact.User
            size={40}
            className="text-gray-400"
            aria-label="Unknown user"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 truncate">{displayName}</h3>
            <span
              className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${badgeClass}`}
            >
              {value.author_association}
            </span>
          </div>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <LucideReact.Calendar size={16} className="mr-1" />
            <time dateTime={value.created_at} className="truncate">
              {formattedCreated}
            </time>
            {isEdited && (
              <span className="ml-2 italic text-gray-400 text-xs">(edited)</span>
            )}
          </div>
        </div>
      </header>
      <p className="mt-3 text-gray-700 whitespace-pre-line line-clamp-3">
        {value.body}
      </p>
    </article>
  );
}
