import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
     *
     * @title Reaction
    */
    export interface reaction {
        id: number & tags.Type<"int32">;
        node_id: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The reaction to use
        */
        content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        created_at: string & tags.Format<"date-time">;
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
}
export type AutoViewInput = AutoViewInputSubTypes.reaction[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  type Reaction = AutoViewInputSubTypes.reaction;
  type ReactionContent = Reaction["content"];

  // Aggregate counts per reaction type
  const reactionCounts = value.reduce((acc, reaction) => {
    const key = reaction.content as ReactionContent;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {} as Record<ReactionContent, number>);

  // Map each reaction type to a LucideReact icon and a semantic color
  const reactionIconMap: Record<ReactionContent, { icon: React.ComponentType<any>; color: string }> = {
    "+1":     { icon: LucideReact.ThumbsUp,    color: "#22C55E" },
    "-1":     { icon: LucideReact.ThumbsDown,  color: "#EF4444" },
    laugh:    { icon: LucideReact.Smile,       color: "#FACC15" },
    confused: { icon: LucideReact.HelpCircle,  color: "#F97316" },
    heart:    { icon: LucideReact.Heart,       color: "#EF4444" },
    hooray:   { icon: LucideReact.PartyPopper, color: "#F43F5E" },
    rocket:   { icon: LucideReact.Rocket,      color: "#6366F1" },
    eyes:     { icon: LucideReact.Eye,         color: "#6B7280" },
  };

  // Prepare a sorted list of [content, count] entries, highest first
  const sortedReactions = (Object.entries(reactionCounts) as [ReactionContent, number][])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // If there are no reactions, show a friendly placeholder
  if (sortedReactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No reactions yet</span>
      </div>
    );
  }

  // Display each reaction type with its icon and count
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
      {sortedReactions.map(([content, count]) => {
        const { icon: Icon, color } = reactionIconMap[content];
        return (
          <div
            key={content}
            className="flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-full"
          >
            <Icon size={16} color={color} strokeWidth={2} />
            <span className="text-sm font-medium text-gray-700">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
