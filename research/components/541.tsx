import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A reply to a discussion within a team.
   *
   * @title Team Discussion Comment
   */
  export type team_discussion_comment = {
    author: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The main text of the comment.
     */
    body: string;
    body_html: string;
    /**
     * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
     */
    body_version: string;
    created_at: string & tags.Format<"date-time">;
    last_edited_at: (string & tags.Format<"date-time">) | null;
    discussion_url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    node_id: string;
    /**
     * The unique sequence number of a team discussion comment.
     */
    number: number & tags.Type<"int32">;
    updated_at: string & tags.Format<"date-time">;
    url: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion_comment;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.author;
  const authorName = author?.name || author?.login || "Unknown";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;
  const createdAt = new Date(value.created_at);
  const formattedDate = createdAt.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const isEdited = Boolean(value.last_edited_at);

  const reactionItems = value.reactions
    ? [
        { key: "+1", count: value.reactions["+1"], icon: LucideReact.ThumbsUp },
        {
          key: "-1",
          count: value.reactions["-1"],
          icon: LucideReact.ThumbsDown,
        },
        { key: "laugh", count: value.reactions.laugh, icon: LucideReact.Smile },
        {
          key: "confused",
          count: value.reactions.confused,
          icon: LucideReact.Frown,
        },
        { key: "heart", count: value.reactions.heart, icon: LucideReact.Heart },
        {
          key: "hooray",
          count: value.reactions.hooray,
          icon: LucideReact.Star,
        },
        { key: "eyes", count: value.reactions.eyes, icon: LucideReact.Eye },
        {
          key: "rocket",
          count: value.reactions.rocket,
          icon: LucideReact.Rocket,
        },
      ].filter((item) => item.count > 0)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-start mb-3">
        <img
          src={author?.avatar_url || avatarFallback}
          alt={authorName}
          className="w-10 h-10 rounded-full border object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = avatarFallback;
          }}
        />
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900 truncate">
              {authorName}
            </span>
            {author?.login && (
              <span className="text-xs text-gray-500 truncate">
                @{author.login}
              </span>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-0.5 space-x-2">
            <LucideReact.Calendar size={14} className="text-gray-400" />
            <span>{formattedDate}</span>
            {isEdited && <span className="italic">(edited)</span>}
            <span>#{value.number}</span>
          </div>
        </div>
      </div>

      <div
        className="prose prose-sm prose-gray max-w-full mb-3 break-words"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {reactionItems.length > 0 && (
        <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
          {reactionItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex items-center space-x-1">
                <Icon size={16} className="text-gray-500" />
                <span>{item.count}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
