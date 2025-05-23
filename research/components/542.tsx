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
  const authorName = author?.name || author?.login || "Unknown user";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName
  )}&background=0D8ABC&color=fff`;

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

  // Prepare reaction items if any reactions exist
  const reactions = value.reactions;
  const reactionItems =
    reactions && reactions.total_count > 0
      ? [
          { count: reactions["+1"], icon: LucideReact.ThumbsUp, color: "text-gray-500" },
          { count: reactions["-1"], icon: LucideReact.ThumbsDown, color: "text-gray-500" },
          { count: reactions.laugh, icon: LucideReact.Smile, color: "text-yellow-500" },
          { count: reactions.confused, icon: LucideReact.Meh, color: "text-yellow-500" },
          { count: reactions.heart, icon: LucideReact.Heart, color: "text-red-500" },
          { count: reactions.hooray, icon: LucideReact.PartyPopper, color: "text-green-500" },
          { count: reactions.eyes, icon: LucideReact.Eye, color: "text-blue-500" },
          { count: reactions.rocket, icon: LucideReact.Rocket, color: "text-indigo-500" },
        ].filter((item) => item.count > 0)
      : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
      <div className="flex items-center space-x-3">
        <img
          src={author?.avatar_url || avatarPlaceholder}
          alt={authorName}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = avatarPlaceholder;
          }}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{authorName}</span>
          <span className="text-xs text-gray-500">
            {createdDate}
            {editedDate && (
              <span className="italic"> • Edited {editedDate}</span>
            )}
          </span>
        </div>
      </div>
      <div
        className="text-gray-800 text-sm"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />
      {reactionItems.length > 0 && (
        <div className="flex items-center space-x-4 pt-2 border-t border-gray-200">
          {reactionItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center text-sm text-gray-600 space-x-1"
            >
              <item.icon size={16} className={item.color} strokeWidth={1.5} />
              <span>{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
