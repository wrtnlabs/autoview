import LucideReact from "lucide-react";
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
  const displayName = author?.name || author?.login || "Unknown user";
  const avatarSrc = author?.avatar_url || "";
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=random&color=fff`;
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const formattedEdited =
    value.last_edited_at &&
    new Date(value.last_edited_at).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // Prepare reactions mapping
  const rawReacts = value.reactions;
  const reactionEntries = rawReacts
    ? (Object.entries(rawReacts) as [string, number][]).filter(
        ([key, count]) => key !== "url" && count > 0,
      )
    : [];

  const reactionIcons: Record<string, { Icon: React.FC<any>; color: string }> =
    {
      "+1": { Icon: LucideReact.ThumbsUp, color: "currentColor" },
      "-1": { Icon: LucideReact.ThumbsDown, color: "currentColor" },
      laugh: { Icon: LucideReact.Smile, color: "#F59E0B" },
      confused: { Icon: LucideReact.HelpCircle, color: "#6B7280" },
      heart: { Icon: LucideReact.Heart, color: "#DC2626" },
      hooray: { Icon: LucideReact.Star, color: "#FBBF24" },
      eyes: { Icon: LucideReact.Eye, color: "#6B7280" },
      rocket: { Icon: LucideReact.Rocket, color: "#10B981" },
    };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {/* Header: Avatar, Name, Date, Comment Number */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={avatarSrc}
            alt={displayName}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
            }}
            className="w-8 h-8 rounded-full object-cover bg-gray-100"
          />
          <span className="font-medium text-gray-900">{displayName}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm space-x-1">
          <LucideReact.Calendar size={16} />
          <span>{formattedDate}</span>
          <span>&bull;</span>
          <span>#{value.number}</span>
        </div>
      </div>

      {/* Comment Body */}
      <div
        className="prose prose-sm max-w-full text-gray-800 line-clamp-4 break-words"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {/* Edited Indicator */}
      {formattedEdited && (
        <div className="mt-2 text-gray-500 text-xs italic">
          Edited on {formattedEdited}
        </div>
      )}

      {/* Reactions */}
      {reactionEntries.length > 0 && (
        <div className="flex items-center space-x-4 mt-3">
          {reactionEntries.map(([key, count]) => {
            const mapping = reactionIcons[key];
            if (!mapping) return null;
            const { Icon, color } = mapping;
            return (
              <div
                key={key}
                className="flex items-center text-gray-600 text-sm"
              >
                <Icon
                  size={16}
                  color={color}
                  className="mr-1"
                  aria-label={key}
                />
                <span>{count}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
