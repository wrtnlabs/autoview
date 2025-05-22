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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalReactions = value.length;
  const grouped = value.reduce(
    (acc, reaction) => {
      acc[reaction.content] = (acc[reaction.content] || 0) + 1;
      return acc;
    },
    {} as Record<AutoViewInputSubTypes.reaction["content"], number>,
  );

  const iconMap = {
    "+1": "ThumbsUp",
    "-1": "ThumbsDown",
    laugh: "Smile",
    confused: "HelpCircle",
    heart: "Heart",
    hooray: "Clap",
    rocket: "Rocket",
    eyes: "Eye",
  } as const;

  const sortedEntries = (
    Object.entries(grouped) as [keyof typeof iconMap, number][]
  )
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  // Helper for placeholder avatars
  const getPlaceholder = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <LucideReact.Heart className="text-red-500 mr-2" size={20} />
        Reactions
      </h3>
      {totalReactions === 0 ? (
        <div className="flex items-center justify-center text-gray-500 py-6">
          <LucideReact.AlertCircle size={24} />
          <span className="ml-2">No reactions yet</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {sortedEntries.map(([content, count]) => {
              const IconComponent = LucideReact[iconMap[content]];
              return (
                <div
                  key={content}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                >
                  <IconComponent
                    size={16}
                    className="text-gray-600 mr-1"
                    strokeWidth={1.5}
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex -space-x-2">
            {value.slice(0, 5).map((reaction, idx) => {
              const name =
                reaction.user?.name ?? reaction.user?.login ?? "Unknown";
              const src = reaction.user?.avatar_url ?? getPlaceholder(name);
              return (
                <img
                  key={idx}
                  src={src}
                  alt={name}
                  title={name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      getPlaceholder(name);
                  }}
                />
              );
            })}
            {value.length > 5 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 text-gray-600 text-xs flex items-center justify-center font-medium">
                +{value.length - 5}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
