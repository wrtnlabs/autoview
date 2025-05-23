import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A collection of related issues and pull requests.
     *
     * @title Milestone
    */
    export interface milestone {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        labels_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The number of the milestone.
        */
        number: number & tags.Type<"int32">;
        /**
         * The state of the milestone.
        */
        state: "open" | "closed";
        /**
         * The title of the milestone.
        */
        title: string;
        description: string | null;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        open_issues: number & tags.Type<"int32">;
        closed_issues: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        closed_at: (string & tags.Format<"date-time">) | null;
        due_on: (string & tags.Format<"date-time">) | null;
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
export type AutoViewInput = AutoViewInputSubTypes.milestone[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} aria-hidden="true" />
        <p className="mt-4">No milestones available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((m) => {
        const created = formatDate(m.created_at);
        const due = m.due_on ? formatDate(m.due_on) : null;
        const closed = m.closed_at ? formatDate(m.closed_at) : null;
        const hasCreator = Boolean(m.creator);
        const creatorLogin = m.creator?.login ?? "";
        const creatorAvatar = m.creator?.avatar_url ?? "";

        return (
          <div key={m.id} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {m.state === "open" ? (
                  <LucideReact.Clock
                    className="text-amber-500"
                    size={16}
                    aria-label="Open"
                  />
                ) : (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                    aria-label="Closed"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  #{m.number} {m.title}
                </h3>
              </div>
              {hasCreator && (
                <div className="flex items-center space-x-2">
                  <img
                    src={creatorAvatar}
                    alt={creatorLogin}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        creatorLogin,
                      )}&background=0D8ABC&color=fff`;
                    }}
                  />
                  <span className="text-sm text-gray-600 truncate">
                    {creatorLogin}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-700 mt-2 line-clamp-3">
              {m.description ?? "No description"}
            </p>
            <div className="flex items-center gap-4 text-gray-600 text-sm mt-3">
              <div className="flex items-center gap-1">
                <LucideReact.Circle className="text-gray-500" size={16} />
                <span>{m.open_issues}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.CheckCircle
                  className="text-gray-500"
                  size={16}
                />
                <span>{m.closed_issues}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center text-gray-500 text-xs mt-3 space-x-4">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Created: {created}</span>
              </div>
              {due && (
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={14} />
                  <span>Due: {due}</span>
                </div>
              )}
              {closed && (
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={14} />
                  <span>Closed: {closed}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
