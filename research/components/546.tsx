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
  type ReactionContent = AutoViewInputSubTypes.reaction['content'];
  const reactionTypes: readonly ReactionContent[] = [
    '+1',
    '-1',
    'laugh',
    'confused',
    'heart',
    'hooray',
    'rocket',
    'eyes',
  ];

  // Count occurrences of each reaction type
  const counts: Record<ReactionContent, number> = reactionTypes.reduce(
    (acc, type) => {
      acc[type] = 0;
      return acc;
    },
    {} as Record<ReactionContent, number>,
  );
  for (const reaction of value) {
    counts[reaction.content] = (counts[reaction.content] || 0) + 1;
  }

  // Map each reaction type to a semantically appropriate icon and color
  const reactionIconMap: Record<
    ReactionContent,
    { Icon: React.FC<any>; color: string }
  > = {
    '+1': { Icon: LucideReact.ThumbsUp, color: '#10B981' },
    '-1': { Icon: LucideReact.ThumbsDown, color: '#EF4444' },
    laugh: { Icon: LucideReact.Smile, color: '#F59E0B' },
    confused: { Icon: LucideReact.Frown, color: '#F97316' },
    heart: { Icon: LucideReact.Heart, color: '#EF4444' },
    hooray: { Icon: LucideReact.Star, color: '#FACC15' },
    rocket: { Icon: LucideReact.Rocket, color: '#6366F1' },
    eyes: { Icon: LucideReact.Eye, color: '#6B7280' },
  };

  const totalReactions = value.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow">
      {totalReactions === 0 ? (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span className="text-sm">No reactions yet</span>
        </div>
      ) : (
        reactionTypes.map((type) => {
          const count = counts[type];
          if (count > 0) {
            const { Icon, color } = reactionIconMap[type];
            return (
              <div key={type} className="flex items-center space-x-1">
                <Icon size={16} color={color} />
                <span className="text-sm text-gray-700">{count}</span>
              </div>
            );
          }
          return null;
        })
      )}
    </div>
  );
}
