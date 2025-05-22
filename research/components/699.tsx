import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.commit_comment;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const displayName = user?.name?.trim() || user?.login || "Unknown User";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const shortCommitId = value.commit_id.slice(0, 7);
  const iconMapping: Record<string, React.ComponentType<any>> = {
    "+1": LucideReact.ThumbsUp,
    "-1": LucideReact.ThumbsDown,
    laugh: LucideReact.Smile,
    confused: LucideReact.Frown,
    heart: LucideReact.Heart,
    hooray: LucideReact.Star,
    eyes: LucideReact.Eye,
    rocket: LucideReact.Rocket,
  };
  const reactions = value.reactions ?? {};
  const reactionEntries = (
    Object.entries(reactions) as [string, number][]
  ).filter(
    ([key, count]) =>
      key !== "url" &&
      key !== "total_count" &&
      typeof count === "number" &&
      count > 0,
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 flex-shrink-0">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = avatarFallback;
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
              <LucideReact.User className="text-gray-400" size={20} />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {user?.html_url ? (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-900 hover:underline truncate"
              >
                {displayName}
              </a>
            ) : (
              <span className="font-medium text-gray-900 truncate">
                {displayName}
              </span>
            )}
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              {value.author_association.replace(/_/g, " ").toLowerCase()}
            </span>
            <span className="ml-auto flex items-center text-gray-500 text-sm">
              <LucideReact.Calendar className="mr-1" size={14} />
              {formattedDate}
            </span>
          </div>
          <p className="mt-2 text-gray-800 text-sm line-clamp-3 whitespace-pre-wrap">
            {value.body}
          </p>
          <div className="mt-3 flex flex-wrap items-center text-gray-500 text-sm space-x-4">
            {value.path && (
              <div className="flex items-center">
                <LucideReact.FileText className="mr-1" size={14} />
                <span className="truncate">
                  {value.path}
                  {value.line != null
                    ? `:${value.line}`
                    : value.position != null
                      ? `:${value.position}`
                      : ""}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <LucideReact.GitCommit className="mr-1" size={14} />
              <span>{shortCommitId}</span>
            </div>
            <a
              href={value.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <LucideReact.Link className="mr-1" size={14} />
              <span className="truncate">View on GitHub</span>
            </a>
          </div>
          {reactionEntries.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center space-x-4 text-gray-600">
              {reactionEntries.map(([key, count]) => {
                const Icon = iconMapping[key];
                return (
                  <div key={key} className="flex items-center space-x-1">
                    {Icon ? <Icon size={14} className="text-gray-500" /> : null}
                    <span className="text-sm">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
