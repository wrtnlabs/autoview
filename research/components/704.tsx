import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Commit Comment
   *
   * @title Commit Comment
   */
  export type commit_comment = {
    html_url: string & tags.Format<"uri">;
    url: string & tags.Format<"uri">;
    id: number & tags.Type<"int32">;
    node_id: string;
    body: string;
    path: string | null;
    position: (number & tags.Type<"int32">) | null;
    line: (number & tags.Type<"int32">) | null;
    commit_id: string;
    user: AutoViewInputSubTypes.nullable_simple_user;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    author_association: AutoViewInputSubTypes.author_association;
    reactions?: AutoViewInputSubTypes.reaction_rollup;
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
  /**
   * @title Reaction Rollup
   */
  export type reaction_rollup = {
    url: string & tags.Format<"uri">;
    total_count: number & tags.Type<"int32">;
    "+1": number & tags.Type<"int32">;
    "-1": number & tags.Type<"int32">;
    laugh: number & tags.Type<"int32">;
    confused: number & tags.Type<"int32">;
    heart: number & tags.Type<"int32">;
    hooray: number & tags.Type<"int32">;
    eyes: number & tags.Type<"int32">;
    rocket: number & tags.Type<"int32">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.commit_comment[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Helper: format ISO date to a readable string
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper: turn AUTHOR_ASSOCIATION into human-readable
  const formatAssociation = (
    assoc: AutoViewInputSubTypes.author_association,
  ): string =>
    assoc
      .split("_")
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((comment) => {
        const user = comment.user;
        const login = user?.login || "Unknown";
        const avatarSrc =
          user?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;
        return (
          <div
            key={comment.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={avatarSrc}
                  alt={login}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.onerror = null;
                    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      login,
                    )}&background=0D8ABC&color=fff`;
                  }}
                />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-900">{login}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.created_at)}
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                {formatAssociation(comment.author_association)}
              </span>
            </div>

            {comment.path && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <LucideReact.FileText size={16} className="mr-1" />
                <span>
                  {comment.path}
                  {comment.line !== null
                    ? `:${comment.line}`
                    : comment.position !== null
                      ? `:${comment.position}`
                      : ""}
                </span>
              </div>
            )}

            <p className="mt-2 text-gray-800 text-sm line-clamp-3 whitespace-pre-wrap">
              {comment.body}
            </p>

            {comment.reactions && (
              <div className="mt-3 flex flex-wrap items-center space-x-4 text-gray-500 text-sm">
                {comment.reactions["+1"] > 0 && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.ThumbsUp size={16} />
                    <span>{comment.reactions["+1"]}</span>
                  </div>
                )}
                {comment.reactions["-1"] > 0 && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.ThumbsDown size={16} />
                    <span>{comment.reactions["-1"]}</span>
                  </div>
                )}
                {comment.reactions.laugh > 0 && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.Laugh size={16} />
                    <span>{comment.reactions.laugh}</span>
                  </div>
                )}
                {comment.reactions.heart > 0 && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.Heart size={16} />
                    <span>{comment.reactions.heart}</span>
                  </div>
                )}
                {comment.reactions.total_count > 0 && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.Users size={16} />
                    <span>{comment.reactions.total_count} total</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
