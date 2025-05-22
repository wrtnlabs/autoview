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
  const displayName = value.author
    ? value.author.name?.trim() || value.author.login
    : "Unknown User";
  const avatarSrc = value.author?.avatar_url || "";
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;

  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const editedDate = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const reactionItems = value.reactions
    ? Object.entries({
        "👍": value.reactions["+1"],
        "👎": value.reactions["-1"],
        "😄": value.reactions.laugh,
        "😕": value.reactions.confused,
        "❤️": value.reactions.heart,
        "🎉": value.reactions.hooray,
        "👀": value.reactions.eyes,
        "🚀": value.reactions.rocket,
      }).filter(([, count]) => count > 0)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-3">
        <img
          src={avatarSrc}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = placeholderAvatar;
          }}
          alt={displayName}
          className="w-8 h-8 rounded-full object-cover mr-3 bg-gray-100"
        />
        <div className="flex-1">
          <div className="font-semibold text-gray-800">
            {displayName}{" "}
            <span className="text-gray-500 text-sm">#{value.number}</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs mt-0.5">
            <LucideReact.Calendar size={14} className="mr-1" />
            {formattedDate}
          </div>
        </div>
      </div>

      {/* Edited indicator */}
      {editedDate && (
        <div className="text-gray-400 text-xs italic mb-3">
          Edited: {editedDate}
        </div>
      )}

      {/* Comment body */}
      <div
        className="prose prose-sm max-w-full mb-4 break-words"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {/* Reactions */}
      {reactionItems.length > 0 && (
        <div className="border-t pt-3 mt-2 flex flex-wrap gap-3">
          {reactionItems.map(([emoji, count]) => (
            <div
              key={emoji}
              className="flex items-center text-gray-600 text-sm"
            >
              <span className="mr-1">{emoji}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
