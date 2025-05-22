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
  const userName = user?.login || "Unknown User";
  const avatarUrl =
    user?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName,
    )}&background=random`;
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updatedDate = new Date(value.updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isEdited = value.updated_at !== value.created_at;

  const fileLocation =
    value.path != null
      ? `${value.path}${value.line != null ? `:${value.line}` : ""}`
      : null;

  // Prepare reaction items
  const reactionItems: { icon: JSX.Element; count: number }[] = [];
  const r = value.reactions;
  if (r) {
    if (r["+1"] > 0)
      reactionItems.push({
        icon: <LucideReact.ThumbsUp size={16} className="text-gray-500" />,
        count: r["+1"],
      });
    if (r["-1"] > 0)
      reactionItems.push({
        icon: <LucideReact.ThumbsDown size={16} className="text-gray-500" />,
        count: r["-1"],
      });
    if (r.laugh > 0)
      reactionItems.push({
        icon: <LucideReact.Smile size={16} className="text-gray-500" />,
        count: r.laugh,
      });
    if (r.confused > 0)
      reactionItems.push({
        icon: <LucideReact.Frown size={16} className="text-gray-500" />,
        count: r.confused,
      });
    if (r.heart > 0)
      reactionItems.push({
        icon: <LucideReact.Heart size={16} className="text-gray-500" />,
        count: r.heart,
      });
    if (r.hooray > 0)
      reactionItems.push({
        icon: <LucideReact.PartyPopper size={16} className="text-gray-500" />,
        count: r.hooray,
      });
    if (r.eyes > 0)
      reactionItems.push({
        icon: <LucideReact.Eye size={16} className="text-gray-500" />,
        count: r.eyes,
      });
    if (r.rocket > 0)
      reactionItems.push({
        icon: <LucideReact.Rocket size={16} className="text-gray-500" />,
        count: r.rocket,
      });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Header: Avatar, name, dates, association */}
      <div className="flex items-center">
        <img
          src={avatarUrl}
          alt={`${userName} avatar`}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) =>
            (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName,
            )}&background=random`)
          }
        />
        <div className="ml-3 flex-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-gray-900 font-medium">{userName}</span>
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
              {value.author_association}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <LucideReact.Calendar size={16} />
            <span>{createdDate}</span>
            {isEdited && (
              <span title={`Edited at ${updatedDate}`}>(edited)</span>
            )}
          </div>
        </div>
      </div>

      {/* File location if available */}
      {fileLocation && (
        <div className="flex items-center text-gray-600 text-sm space-x-1">
          <LucideReact.FileText size={16} />
          <span className="truncate">{fileLocation}</span>
        </div>
      )}

      {/* Comment body */}
      <div className="text-gray-800 text-sm whitespace-pre-wrap line-clamp-4">
        {value.body}
      </div>

      {/* Reactions summary */}
      {reactionItems.length > 0 && (
        <div className="flex items-center space-x-4">
          {reactionItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-1 text-gray-600 text-sm"
            >
              {item.icon}
              <span>{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
