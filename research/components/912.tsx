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
  // 1. Data transformation and derived values
  const author = value.author;
  const authorName = author?.name ?? author?.login ?? "Unknown User";
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = author?.avatar_url ?? fallbackAvatar;

  const createdDate = new Date(value.created_at);
  const formattedCreated = createdDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const formattedEdited = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  // Mapping reaction types to icons and colors
  const reactionMap: Record<string, { icon: React.ComponentType<any>; color: string }> = {
    "+1": { icon: LucideReact.ThumbsUp, color: "text-blue-500" },
    "-1": { icon: LucideReact.ThumbsDown, color: "text-red-500" },
    laugh: { icon: LucideReact.Smile, color: "text-yellow-500" },
    confused: { icon: LucideReact.HelpCircle, color: "text-gray-500" },
    heart: { icon: LucideReact.Heart, color: "text-red-500" },
    hooray: { icon: LucideReact.Star, color: "text-yellow-400" },
    eyes: { icon: LucideReact.Eye, color: "text-gray-500" },
    rocket: { icon: LucideReact.Rocket, color: "text-indigo-500" },
  };

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex sm:items-start gap-4">
      <div className="flex-shrink-0">
        <img
          src={avatarUrl}
          alt={`${authorName}'s avatar`}
          className="h-10 w-10 rounded-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
          }}
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">{authorName}</span>
            <span className="text-gray-500 text-sm">#{value.number}</span>
          </div>
          <time
            className="text-gray-400 text-sm"
            dateTime={value.created_at}
          >
            {formattedCreated}
          </time>
        </div>

        {formattedEdited && (
          <p className="text-gray-400 text-xs mt-1">
            Edited {formattedEdited}
          </p>
        )}

        <p className="mt-2 text-gray-700 text-sm whitespace-pre-wrap line-clamp-5">
          {value.body}
        </p>

        {value.reactions && value.reactions.total_count > 0 && (
          <div className="mt-3 flex flex-wrap items-center space-x-4">
            {Object.entries(value.reactions)
              .filter(
                ([key, count]) =>
                  key !== "url" && key !== "total_count" && count > 0,
              )
              .map(([key, count]) => {
                const mapping = reactionMap[key];
                if (!mapping) return null;
                const Icon = mapping.icon;
                return (
                  <div
                    key={key}
                    className="flex items-center space-x-1 text-sm text-gray-500"
                  >
                    <Icon size={16} className={mapping.color} />
                    <span>{count}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
