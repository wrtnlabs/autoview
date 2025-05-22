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
  const authorName = author?.name ?? author?.login ?? "Unknown";
  const avatarSrc = author?.avatar_url ?? "";
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;

  const formattedCreatedAt = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const formattedEditedAt = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const reactions = value.reactions;
  const reactionDefinitions = [
    {
      key: "+1" as const,
      Icon: LucideReact.ThumbsUp,
      color: "text-gray-500",
      label: "Thumbs up",
    },
    {
      key: "-1" as const,
      Icon: LucideReact.ThumbsDown,
      color: "text-gray-500",
      label: "Thumbs down",
    },
    {
      key: "laugh" as const,
      Icon: LucideReact.Smile,
      color: "text-yellow-500",
      label: "Laugh",
    },
    {
      key: "confused" as const,
      Icon: LucideReact.Frown,
      color: "text-yellow-600",
      label: "Confused",
    },
    {
      key: "heart" as const,
      Icon: LucideReact.Heart,
      color: "text-red-500",
      label: "Heart",
    },
    {
      key: "hooray" as const,
      Icon: LucideReact.Star,
      color: "text-amber-400",
      label: "Hooray",
    },
    {
      key: "eyes" as const,
      Icon: LucideReact.Eye,
      color: "text-indigo-500",
      label: "Eyes",
    },
    {
      key: "rocket" as const,
      Icon: LucideReact.Rocket,
      color: "text-pink-500",
      label: "Rocket",
    },
  ] as const;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-full">
      {/* Header: Avatar, Author, Dates */}
      <div className="flex items-center mb-3">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={`${authorName}'s avatar`}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
            }}
          />
        ) : (
          <LucideReact.User size={32} className="text-gray-400" />
        )}
        <div className="ml-3 flex-1">
          <div className="text-sm font-semibold text-gray-900">
            {authorName}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <LucideReact.Calendar size={12} className="mr-1" />
            <time dateTime={value.created_at}>{formattedCreatedAt}</time>
          </div>
        </div>
        {formattedEditedAt && (
          <div className="ml-auto flex items-center text-xs italic text-gray-400">
            <LucideReact.Edit2 size={12} className="mr-1" />
            <time dateTime={value.last_edited_at!}>{formattedEditedAt}</time>
          </div>
        )}
      </div>

      {/* Comment Body */}
      <div
        className="text-gray-800 mb-4 overflow-hidden line-clamp-4 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {/* Reactions */}
      {reactions && (
        <div className="flex flex-wrap items-center gap-4">
          {reactionDefinitions.map(({ key, Icon, color, label }) => {
            const count = reactions[key];
            if (count > 0) {
              return (
                <div
                  key={key}
                  className="flex items-center text-sm text-gray-500"
                  aria-label={`${label}: ${count}`}
                >
                  <Icon size={16} className={`${color} mr-1`} />
                  <span>{count}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
