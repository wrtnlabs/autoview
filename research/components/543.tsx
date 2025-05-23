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
  const authorName = author ? author.name ?? author.login : 'Unknown User';
  const initialAvatar = author?.avatar_url ?? '';
  const fallbackAvatar = author
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random&color=fff`
    : 'https://placehold.co/64x64?text=User';

  const createdAt = new Date(value.created_at);
  const formattedCreatedAt = createdAt.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const formattedEditedAt = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : '';

  // Strip HTML tags for safe preview
  const plainBody = value.body_html.replace(/<[^>]+>/g, '').trim();

  // Prepare reaction items if any
  const reactions = value.reactions;
  const reactionList = reactions
    ? [
        { count: reactions["+1"], Icon: LucideReact.ThumbsUp },
        { count: reactions["-1"], Icon: LucideReact.ThumbsDown },
        { count: reactions.laugh, Icon: LucideReact.Smile },
        { count: reactions.confused, Icon: LucideReact.Frown },
        { count: reactions.heart, Icon: LucideReact.Heart },
        { count: reactions.hooray, Icon: LucideReact.Trophy },
        { count: reactions.eyes, Icon: LucideReact.Eye },
        { count: reactions.rocket, Icon: LucideReact.Rocket },
      ].filter(item => item.count > 0)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={initialAvatar}
            onError={e => { (e.currentTarget as HTMLImageElement).src = fallbackAvatar; }}
            alt={`${authorName} avatar`}
            className="w-10 h-10 rounded-full object-cover bg-gray-100"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {authorName} <span className="text-gray-500">#{value.number}</span>
            </p>
            <p className="text-xs text-gray-500">
              {formattedCreatedAt}
              {formattedEditedAt && (
                <span> • Edited {formattedEditedAt}</span>
              )}
            </p>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed break-words line-clamp-3">
          {plainBody}
        </p>
      </div>
      {reactionList.length > 0 && (
        <footer className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-4 text-gray-600 text-sm">
            {reactionList.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1">
                <item.Icon size={16} className="text-gray-500" />
                <span>{item.count}</span>
              </div>
            ))}
            <div className="flex items-center space-x-1">
              <LucideReact.Users size={16} className="text-gray-400" />
              <span>{reactions?.total_count}</span>
            </div>
          </div>
        </footer>
      )}
    </article>
  );
}
