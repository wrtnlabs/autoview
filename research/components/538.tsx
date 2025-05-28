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
  const displayName = value.author
    ? value.author.name?.trim() || value.author.login
    : "Unknown Author";

  const avatarFallback = value.author
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`
    : `https://placehold.co/40x40/93a3b8/ffffff?text=?`;

  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const editedDate = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  // Prepare reaction items
  const reactionItems: { key: string; count: number }[] = [];
  if (value.reactions) {
    const {
      total_count,
      "+1": plus,
      "-1": minus,
      laugh,
      confused,
      heart,
      hooray,
      eyes,
      rocket,
    } = value.reactions;
    if (plus > 0) reactionItems.push({ key: "+1", count: plus });
    if (minus > 0) reactionItems.push({ key: "-1", count: minus });
    if (laugh > 0) reactionItems.push({ key: "laugh", count: laugh });
    if (confused > 0) reactionItems.push({ key: "confused", count: confused });
    if (heart > 0) reactionItems.push({ key: "heart", count: heart });
    if (hooray > 0) reactionItems.push({ key: "hooray", count: hooray });
    if (eyes > 0) reactionItems.push({ key: "eyes", count: eyes });
    if (rocket > 0) reactionItems.push({ key: "rocket", count: rocket });
    if (reactionItems.length === 0 && total_count > 0) {
      reactionItems.push({ key: "total", count: total_count });
    }
  }

  // Map reaction key to icon component
  const renderReactionIcon = (key: string) => {
    switch (key) {
      case "+1":
        return <LucideReact.ThumbsUp size={16} />;
      case "-1":
        return <LucideReact.ThumbsDown size={16} />;
      case "laugh":
        return <LucideReact.Smile size={16} />;
      case "confused":
        return <LucideReact.Frown size={16} />;
      case "heart":
        return <LucideReact.Heart size={16} />;
      case "hooray":
        return <LucideReact.Star size={16} />;
      case "eyes":
        return <LucideReact.Eye size={16} />;
      case "rocket":
        return <LucideReact.Rocket size={16} />;
      case "total":
        return <LucideReact.ThumbsUp size={16} />;
      default:
        return null;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-md max-w-full">
      {/* Pinned & Private Indicators */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {value.pinned && (
          <div className="flex items-center text-gray-500" title="Pinned">
            <LucideReact.Pin size={16} />
          </div>
        )}
        {value["private"] && (
          <div className="flex items-center text-gray-500" title="Private">
            <LucideReact.Lock size={16} />
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 truncate">{value.title}</h2>

      {/* Author and Date */}
      <div className="mt-2 flex items-center space-x-3">
        {value.author ? (
          <img
            src={value.author.avatar_url}
            alt={`Avatar of ${displayName}`}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = avatarFallback;
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <LucideReact.User className="text-gray-400" size={16} />
          </div>
        )}
        <div className="flex flex-col text-sm text-gray-600 leading-tight">
          <span className="font-medium text-gray-800">{displayName}</span>
          <span className="flex items-center">
            <LucideReact.Calendar className="mr-1 text-gray-400" size={16} />
            {createdDate}
            {editedDate && <em className="ml-2 text-gray-500">(edited)</em>}
          </span>
        </div>
      </div>

      {/* Body HTML */}
      <div
        className="mt-4 text-gray-700 overflow-hidden line-clamp-3 prose-sm"
        dangerouslySetInnerHTML={{
          __html: value.body_html || `<p>${value.body}</p>`,
        }}
      />

      {/* Meta: Comments & Reactions */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.MessageCircle size={16} className="mr-1" />
          <span>
            {value.comments_count} comment
            {value.comments_count !== 1 ? "s" : ""}
          </span>
        </div>
        {reactionItems.map((item) => (
          <div key={item.key} className="flex items-center">
            {renderReactionIcon(item.key)}
            <span className="ml-1">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
