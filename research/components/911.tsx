import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export interface team_discussion_comment {
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
    }
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
    export interface reaction_rollup {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.team_discussion_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.author;
  const displayName = author ? (author.name ?? author.login) : "Unknown User";
  const avatarSrc =
    author?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=0D8ABC&color=fff`;
  const createdDate = new Date(value.created_at).toLocaleString();
  const isEdited = Boolean(value.last_edited_at);

  // Reaction icon mapping
  type ReactionKey = keyof AutoViewInputSubTypes.reaction_rollup;
  const reactionIcons: Record<string, { Icon: React.ComponentType<any>; color: string }> = {
    "+1": { Icon: LucideReact.ThumbsUp, color: "text-blue-500" },
    "-1": { Icon: LucideReact.ThumbsDown, color: "text-red-500" },
    laugh: { Icon: LucideReact.Smile, color: "text-yellow-500" },
    confused: { Icon: LucideReact.Frown, color: "text-yellow-700" },
    heart: { Icon: LucideReact.Heart, color: "text-pink-500" },
    hooray: { Icon: LucideReact.Star, color: "text-purple-500" },
    eyes: { Icon: LucideReact.Eye, color: "text-gray-500" },
    rocket: { Icon: LucideReact.Rocket, color: "text-orange-500" },
  };

  const reactionItems = value.reactions
    ? (Object.entries(value.reactions) as [ReactionKey, number][])
        .filter(([key, count]) => key !== "url" && key !== "total_count" && count > 0)
        .map(([key, count]) => {
          const meta = reactionIcons[key];
          if (!meta) return null;
          const Icon = meta.Icon;
          return (
            <div key={key} className="flex items-center space-x-1 text-sm text-gray-600">
              <Icon size={16} className={meta.color} />
              <span>{count}</span>
            </div>
          );
        })
        .filter(Boolean)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Author Header */}
      <div className="flex items-center mb-3">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=0D8ABC&color=fff`;
          }}
        />
        <div className="ml-3">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">{displayName}</span>
            <span className="text-gray-500 text-sm">{createdDate}</span>
            {isEdited && (
              <LucideReact.Edit2 size={16} className="text-gray-400" aria-label="Edited" />
            )}
          </div>
        </div>
      </div>

      {/* Comment Body */}
      <div className="text-gray-700 text-sm">
        <div
          className="line-clamp-3 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: value.body_html }}
        />
      </div>

      {/* Reactions */}
      {reactionItems.length > 0 && (
        <div className="flex space-x-4 mt-4">{reactionItems}</div>
      )}
    </div>
  );
}
