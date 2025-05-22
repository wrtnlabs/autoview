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
  const authorName = author?.name || author?.login || "Unknown User";
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = author?.avatar_url || defaultAvatar;

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  const createdAt = formatDate(value.created_at);
  const editedAt = value.last_edited_at
    ? formatDate(value.last_edited_at)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: avatar, author, timestamps */}
      <div className="flex items-center space-x-3">
        <img
          src={avatarUrl}
          alt={`${authorName} avatar`}
          className="w-8 h-8 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = defaultAvatar;
          }}
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{authorName}</span>
          <div className="flex items-center text-sm text-gray-500 space-x-1">
            <LucideReact.Calendar size={14} className="text-gray-400" />
            <span>{createdAt}</span>
            {editedAt && (
              <>
                <span className="mx-1">·</span>
                <LucideReact.Edit2 size={14} className="text-gray-400" />
                <span>Edited {editedAt}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Comment body */}
      <div className="text-sm text-gray-800">
        <div
          className="line-clamp-4 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: value.body_html }}
        />
      </div>

      {/* Reactions */}
      {value.reactions && (
        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600">
          {value.reactions["+1"] > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.ThumbsUp size={16} className="text-blue-500" />
              <span>{value.reactions["+1"]}</span>
            </div>
          )}
          {value.reactions["-1"] > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.ThumbsDown size={16} className="text-red-500" />
              <span>{value.reactions["-1"]}</span>
            </div>
          )}
          {value.reactions.laugh > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.Smile size={16} className="text-yellow-500" />
              <span>{value.reactions.laugh}</span>
            </div>
          )}
          {value.reactions.confused > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.Frown size={16} className="text-indigo-500" />
              <span>{value.reactions.confused}</span>
            </div>
          )}
          {value.reactions.heart > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.Heart size={16} className="text-pink-500" />
              <span>{value.reactions.heart}</span>
            </div>
          )}
          {value.reactions.hooray > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.PartyPopper size={16} className="text-green-500" />
              <span>{value.reactions.hooray}</span>
            </div>
          )}
          {value.reactions.eyes > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.Eye size={16} className="text-gray-500" />
              <span>{value.reactions.eyes}</span>
            </div>
          )}
          {value.reactions.rocket > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.Rocket size={16} className="text-indigo-500" />
              <span>{value.reactions.rocket}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
