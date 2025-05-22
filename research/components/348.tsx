import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A comment made to a gist.
   *
   * @title Gist Comment
   */
  export type gist_comment = {
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
  };
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
  export type author_association =
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.gist_comment;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const userName = user?.name?.trim() || user?.login || "Unknown User";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName,
  )}&background=0D8ABC&color=fff`;
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isEdited = value.updated_at !== value.created_at;
  const assocLabel = value.author_association
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {user ? (
            <img
              src={user.avatar_url}
              alt={userName}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = avatarFallback;
              }}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <LucideReact.User
              size={40}
              className="text-gray-300"
              aria-label="Anonymous"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 truncate">
              {userName}
            </span>
            <div className="flex items-center text-xs text-gray-500">
              <LucideReact.Calendar size={14} className="mr-1" />
              <span>{createdDate}</span>
              {isEdited && <span className="ml-2 italic">(edited)</span>}
            </div>
          </div>
        </div>
        <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
          {assocLabel}
        </span>
      </div>
      <div className="mt-4 text-gray-800 text-sm bg-gray-50 p-3 rounded line-clamp-3 whitespace-pre-wrap">
        {value.body.trim() || <em className="text-gray-400">No content</em>}
      </div>
    </div>
  );
}
