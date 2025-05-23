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
  const displayName = author?.name || author?.login || "Unknown User";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedEditedAt = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const reactions = value.reactions;
  const reactionItems: { key: string; icon: JSX.Element; count: number }[] = [];
  if (reactions) {
    if (reactions["+1"] > 0) {
      reactionItems.push({
        key: "+1",
        count: reactions["+1"],
        icon: <LucideReact.ThumbsUp size={16} className="text-blue-500" />,
      });
    }
    if (reactions["-1"] > 0) {
      reactionItems.push({
        key: "-1",
        count: reactions["-1"],
        icon: <LucideReact.ThumbsDown size={16} className="text-red-500" />,
      });
    }
    if (reactions.laugh > 0) {
      reactionItems.push({
        key: "laugh",
        count: reactions.laugh,
        icon: <LucideReact.Laugh size={16} className="text-yellow-500" />,
      });
    }
    if (reactions.confused > 0) {
      reactionItems.push({
        key: "confused",
        count: reactions.confused,
        icon: <LucideReact.HelpCircle size={16} className="text-gray-500" />,
      });
    }
    if (reactions.heart > 0) {
      reactionItems.push({
        key: "heart",
        count: reactions.heart,
        icon: <LucideReact.Heart size={16} className="text-red-500" />,
      });
    }
    if (reactions.hooray > 0) {
      reactionItems.push({
        key: "hooray",
        count: reactions.hooray,
        icon: <LucideReact.PartyPopper size={16} className="text-pink-500" />,
      });
    }
    if (reactions.eyes > 0) {
      reactionItems.push({
        key: "eyes",
        count: reactions.eyes,
        icon: <LucideReact.Eye size={16} className="text-gray-500" />,
      });
    }
    if (reactions.rocket > 0) {
      reactionItems.push({
        key: "rocket",
        count: reactions.rocket,
        icon: <LucideReact.Rocket size={16} className="text-indigo-500" />,
      });
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-start space-x-3">
        <img
          src={author?.avatar_url || avatarFallback}
          alt={displayName}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = avatarFallback;
          }}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 truncate">{displayName}</p>
          <div className="flex items-center text-sm text-gray-500 mt-0.5">
            <LucideReact.Calendar size={14} className="mr-1" />
            <span>{formattedCreatedAt}</span>
            {formattedEditedAt && (
              <>
                <LucideReact.Edit2 size={14} className="mx-2 text-gray-400" />
                <span>Edited {formattedEditedAt}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 prose prose-sm prose-indigo max-w-none">
        <div dangerouslySetInnerHTML={{ __html: value.body_html }} />
      </div>

      {reactionItems.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center space-x-4 text-sm text-gray-600">
          {reactionItems.map((item) => (
            <div key={item.key} className="flex items-center">
              {item.icon}
              <span className="ml-1">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  // 3. Return the React element.
}
