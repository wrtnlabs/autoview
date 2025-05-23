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
  const avatarSrc =
    value.author?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      authorName,
    )}&background=random`;
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const editedDate = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;
  const isPrivate = value["private"];
  const isPinned = value.pinned;
  const reactions = value.reactions;
  const plusOneCount = reactions?.["+1"] ?? 0;
  const heartCount = reactions?.heart ?? 0;
  const laughCount = reactions?.laugh ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white p-4 rounded-lg shadow flex flex-col space-y-4">
      {/* Header: Author, Date, Pins/Privacy */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={avatarSrc}
            alt={authorName}
            className="w-8 h-8 rounded-full object-cover bg-gray-100"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName,
              )}&background=0D8ABC&color=fff`;
            }}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900 truncate">{authorName}</p>
            <p className="text-gray-500">{createdDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {isPinned && (
            <LucideReact.Pin
              size={16}
              className="text-gray-500"
              aria-label="Pinned"
            />
          )}
          {isPrivate ? (
            <LucideReact.Lock
              size={16}
              className="text-gray-500"
              aria-label="Private"
            />
          ) : (
            <LucideReact.Unlock
              size={16}
              className="text-gray-500"
              aria-label="Public"
            />
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {`#${value.number} ${value.title}`}
      </h2>

      {/* Body Preview (HTML) */}
      <div
        className="prose prose-sm text-gray-700 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {/* Footer: Comments and Reactions */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <LucideReact.MessageCircle size={16} />
            <span>{value.comments_count}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.ThumbsUp size={16} />
            <span>{plusOneCount}</span>
          </div>
          {heartCount > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.Heart size={16} className="text-red-500" />
              <span>{heartCount}</span>
            </div>
          )}
          {laughCount > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.Laugh size={16} />
              <span>{laughCount}</span>
            </div>
          )}
        </div>
        {editedDate && <span className="italic">Edited: {editedDate}</span>}
      </div>
    </div>
  );
}
