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
  const authorName =
    value.author?.name || value.author?.login || "Unknown User";
  const avatarUrl =
    value.author?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      authorName,
    )}&background=0D8ABC&color=fff`;
  const createdDate = new Date(value.created_at);
  const formattedCreatedAt = createdDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const editedAt = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  // Prepare reactions list (omit url and total_count)
  const reactionsData = value.reactions;
  const reactionTypes = [
    "+1",
    "-1",
    "laugh",
    "confused",
    "heart",
    "hooray",
    "eyes",
    "rocket",
  ] as const;
  type ReactionType = (typeof reactionTypes)[number];
  const reactionList = reactionsData
    ? reactionTypes
        .map((type) => ({
          type,
          count: (reactionsData as any)[type] as number,
        }))
        .filter((r) => typeof r.count === "number" && r.count > 0)
    : [];

  function getReactionIcon(type: ReactionType) {
    const commonProps = { size: 16, className: "text-gray-500" };
    switch (type) {
      case "+1":
        return <LucideReact.ThumbsUp {...commonProps} />;
      case "-1":
        return <LucideReact.ThumbsDown {...commonProps} />;
      case "laugh":
        return <LucideReact.Smile {...commonProps} />;
      case "confused":
        return <LucideReact.Meh {...commonProps} />;
      case "heart":
        return <LucideReact.Heart {...commonProps} />;
      case "hooray":
        return <LucideReact.Star {...commonProps} />;
      case "eyes":
        return <LucideReact.Eye {...commonProps} />;
      case "rocket":
        return <LucideReact.Rocket {...commonProps} />;
      default:
        return null;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Avatar, Name, Dates */}
      <div className="flex items-start">
        <img
          src={avatarUrl}
          alt={`${authorName} avatar`}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://ui-avatars.com/api/?name=Unknown&background=ccc&color=fff";
          }}
        />
        <div className="ml-3 flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-800">{authorName}</span>
            {editedAt && (
              <span className="text-xs text-gray-500 italic">(edited)</span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-0.5">
            <LucideReact.Calendar size={14} className="mr-1" />
            <time dateTime={value.created_at}>{formattedCreatedAt}</time>
          </div>
          {editedAt && (
            <div className="flex items-center text-sm text-gray-400 mt-0.5">
              <LucideReact.Edit2 size={14} className="mr-1" />
              <time dateTime={value.last_edited_at!}>{editedAt}</time>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div
        className="mt-4 text-gray-700 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {/* Reactions */}
      {reactionList.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {reactionList.map((r) => (
            <div
              key={r.type}
              className="flex items-center space-x-1 text-sm text-gray-600"
            >
              {getReactionIcon(r.type)}
              <span>{r.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
