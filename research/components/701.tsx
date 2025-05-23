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
  //    Group reactions by content type to show counts
  const counts: Record<AutoViewInputSubTypes.reaction["content"], number> = value.reduce(
    (acc, reaction) => {
      acc[reaction.content] = (acc[reaction.content] ?? 0) + 1;
      return acc;
    },
    {} as Record<AutoViewInputSubTypes.reaction["content"], number>
  );

  //    Map each reaction content to a semantically appropriate icon
  const contentIcons: Record<AutoViewInputSubTypes.reaction["content"], JSX.Element> = {
    "+1": <LucideReact.ThumbsUp size={16} className="text-blue-500" />,
    "-1": <LucideReact.ThumbsDown size={16} className="text-red-500" />,
    laugh: <LucideReact.Laugh size={16} className="text-yellow-500" />,
    confused: <LucideReact.HelpCircle size={16} className="text-amber-500" />,
    heart: <LucideReact.Heart size={16} className="text-pink-500" />,
    hooray: <LucideReact.Star size={16} className="text-purple-500" />,
    rocket: <LucideReact.Rocket size={16} className="text-gray-700" />,
    eyes: <LucideReact.Eye size={16} className="text-gray-600" />
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <header className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <LucideReact.Activity size={20} className="text-gray-600" />
          Reactions ({value.length})
        </h2>
      </header>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        {(Object.keys(counts) as Array<AutoViewInputSubTypes.reaction["content"]>).map(
          (content) => (
            <div key={content} className="flex items-center gap-1 text-gray-700">
              {contentIcons[content]}
              <span className="font-medium">{counts[content]}</span>
            </div>
          )
        )}
      </div>

      <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
        {value.map((reaction) => {
          // Format date for readability
          const formattedDate = new Date(reaction.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
          });

          // Determine user display and avatar
          const user = reaction.user;
          const login = user?.login ?? "Unknown";
          const avatarSrc =
            user?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;

          return (
            <li key={reaction.id} className="flex items-center py-2">
              <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden mr-3">
                <img
                  src={avatarSrc}
                  alt={login}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.onerror = null;
                    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      login
                    )}&background=0D8ABC&color=fff`;
                  }}
                />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {contentIcons[reaction.content]}
                  <span className="truncate text-gray-800 font-medium">{login}</span>
                </div>
                <time className="text-gray-500 text-sm">{formattedDate}</time>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
