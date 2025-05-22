import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
   *
   * @title Reaction
   */
  export type reaction = {
    id: number & tags.Type<"int32">;
    node_id: string;
    user: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The reaction to use
     */
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
    created_at: string & tags.Format<"date-time">;
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
}
export type AutoViewInput = AutoViewInputSubTypes.reaction[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation: count reactions by content type
  const reactionCounts = value.reduce(
    (acc, reaction) => {
      const key = reaction.content;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<AutoViewInputSubTypes.reaction["content"], number>,
  );

  // 2. Map reaction types to icons, colors, and labels
  const reactionDetails: Record<
    AutoViewInputSubTypes.reaction["content"],
    { Icon: React.ComponentType<any>; colorClass: string; label: string }
  > = {
    "+1": {
      Icon: LucideReact.CheckCircle,
      colorClass: "text-green-500",
      label: "Like",
    },
    "-1": {
      Icon: LucideReact.XCircle,
      colorClass: "text-red-500",
      label: "Dislike",
    },
    laugh: {
      Icon: LucideReact.Smile,
      colorClass: "text-yellow-500",
      label: "Laugh",
    },
    confused: {
      Icon: LucideReact.HelpCircle,
      colorClass: "text-amber-500",
      label: "Confused",
    },
    heart: {
      Icon: LucideReact.Heart,
      colorClass: "text-pink-500",
      label: "Heart",
    },
    hooray: {
      Icon: LucideReact.Trophy,
      colorClass: "text-indigo-500",
      label: "Hooray",
    },
    rocket: {
      Icon: LucideReact.Rocket,
      colorClass: "text-gray-500",
      label: "Rocket",
    },
    eyes: { Icon: LucideReact.Eye, colorClass: "text-gray-500", label: "Eyes" },
  };

  // 3. Prepare a sorted list of reaction types that occurred
  const sortedReactions = (
    Object.keys(reactionCounts) as Array<
      AutoViewInputSubTypes.reaction["content"]
    >
  )
    .filter((content) => reactionCounts[content] > 0)
    .sort((a, b) => reactionCounts[b]! - reactionCounts[a]!);

  // 4. Render: if no reactions, show an empty state
  if (sortedReactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No reactions yet</span>
      </div>
    );
  }

  // 5. Render the reaction summary bar
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-wrap items-center gap-4">
      {sortedReactions.map((content) => {
        const count = reactionCounts[content]!;
        const { Icon, colorClass, label } = reactionDetails[content];
        return (
          <div
            key={content}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md"
            title={`${label}: ${count}`}
            aria-label={`${label}: ${count}`}
          >
            <Icon className={`${colorClass}`} size={16} strokeWidth={2} />
            <span className="text-sm font-medium text-gray-700">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
