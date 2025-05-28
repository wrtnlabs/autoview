import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export interface team_discussion {
        author: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The main text of the discussion.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        comments_count: number & tags.Type<"int32">;
        comments_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion.
        */
        number: number & tags.Type<"int32">;
        /**
         * Whether or not this discussion should be pinned for easy retrieval.
        */
        pinned: boolean;
        /**
         * Whether or not this discussion should be restricted to team members and organization owners.
        */
        "private": boolean;
        team_url: string & tags.Format<"uri">;
        /**
         * The title of the discussion.
        */
        title: string;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const authorName = value.author?.name ?? value.author?.login ?? "Unknown";
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = value.author?.avatar_url ?? placeholderAvatar;
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderAvatar;
  };
  const createdAtDate = new Date(value.created_at);
  const createdAtFormatted = createdAtDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const isEdited = !!value.last_edited_at && value.last_edited_at !== value.created_at;
  const reactions = value.reactions;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Author & Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={avatarSrc}
            alt={authorName}
            onError={handleImageError}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{authorName}</p>
            <p className="text-xs text-gray-500">
              {createdAtFormatted}
              {isEdited && <span> · Edited</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {value.pinned && (
            <LucideReact.Pin
              size={16}
              className="text-gray-400"
              aria-label="Pinned"
            />
          )}
          {value.private && (
            <LucideReact.Lock
              size={16}
              className="text-gray-400"
              aria-label="Private"
            />
          )}
        </div>
      </div>

      {/* Title & Body */}
      <h2 className="mt-3 text-lg font-semibold text-gray-900 truncate">
        {value.title}
      </h2>
      <p className="mt-2 text-gray-700 text-sm line-clamp-3">
        {value.body}
      </p>

      {/* Footer: Comments & Reactions */}
      <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center space-x-1">
          <LucideReact.MessageSquare size={16} />
          <span>{value.comments_count}</span>
        </div>
        {reactions && (
          <div className="flex items-center space-x-3">
            {reactions["+1"] > 0 && (
              <div className="flex items-center space-x-1">
                <LucideReact.ThumbsUp size={16} />
                <span>{reactions["+1"]}</span>
              </div>
            )}
            {reactions["-1"] > 0 && (
              <div className="flex items-center space-x-1">
                <LucideReact.ThumbsDown size={16} />
                <span>{reactions["-1"]}</span>
              </div>
            )}
            {reactions.laugh > 0 && (
              <div className="flex items-center space-x-1">
                <LucideReact.Laugh size={16} />
                <span>{reactions.laugh}</span>
              </div>
            )}
            {reactions.heart > 0 && (
              <div className="flex items-center space-x-1">
                <LucideReact.Heart size={16} className="text-red-500" />
                <span>{reactions.heart}</span>
              </div>
            )}
            {reactions.eyes > 0 && (
              <div className="flex items-center space-x-1">
                <LucideReact.Eye size={16} />
                <span>{reactions.eyes}</span>
              </div>
            )}
            {reactions.rocket > 0 && (
              <div className="flex items-center space-x-1">
                <LucideReact.Rocket size={16} />
                <span>{reactions.rocket}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
