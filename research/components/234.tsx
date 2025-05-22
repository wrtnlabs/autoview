import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export type GroupsInfiniteScrollingView = {
      next?: string;
      groups?: AutoViewInputSubTypes.Group[];
    };
  }
  export type Group = {
    id?: string;
    channelId?: string;
    title: string;
    scope: "all" | "public" | "private";
    managerIds?: string[] &
      tags.MinItems<1> &
      tags.MaxItems<2147483647> &
      tags.UniqueItems;
    icon?: string & tags.Pattern<"\\S+">;
    liveMeetId?: string;
    description?: string;
    createdAt?: number;
    updatedAt?: number;
    /**
     * @deprecated
     */
    name?: string;
    active?: boolean;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.desk.GroupsInfiniteScrollingView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived data
  const groups: AutoViewInputSubTypes.Group[] = value.groups ?? [];
  const groupCount = groups.length;
  const hasNext = Boolean(value.next);
  const placeholderIconUrl =
    "https://placehold.co/80x80/f8fafc/475569?text=Group";

  // Helper: date formatter
  const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Empty state
  if (groupCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <p className="mt-4 text-gray-500">No groups available</p>
      </div>
    );
  }

  // Main render
  return (
    <div className="p-4">
      <div className="mb-4 text-sm text-gray-600">
        Showing {groupCount} group{groupCount > 1 ? "s" : ""}
      </div>
      <ul className="space-y-4">
        {groups.map((group) => {
          const {
            id,
            title,
            icon,
            description,
            scope = "public",
            managerIds,
            createdAt,
            active = true,
          } = group;
          const key = id ?? title;
          const formattedCreated = createdAt ? formatDate(createdAt) : null;
          const scopeStyles: Record<string, string> = {
            all: "bg-blue-100 text-blue-800",
            public: "bg-green-100 text-green-800",
            private: "bg-red-100 text-red-800",
          };
          const scopeLabels: Record<string, string> = {
            all: "All",
            public: "Public",
            private: "Private",
          };

          return (
            <li
              key={key}
              className="flex items-start bg-white p-4 rounded-lg shadow"
            >
              {/* Icon or placeholder */}
              <div className="flex-shrink-0 w-12 h-12 mr-4">
                {icon ? (
                  <img
                    src={icon}
                    alt={`${title} icon`}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = placeholderIconUrl;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                    <LucideReact.Users size={24} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {title}
                  </h3>
                  {active ? (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                    />
                  ) : (
                    <LucideReact.XCircle className="text-red-500" size={16} />
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span
                    className={`px-2 py-0.5 rounded-full ${scopeStyles[scope]}`}
                  >
                    {scopeLabels[scope]}
                  </span>
                  {managerIds && managerIds.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.Users size={16} className="text-gray-400" />
                      <span>{managerIds.length}</span>
                    </div>
                  )}
                  {formattedCreated && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.Calendar
                        size={16}
                        className="text-gray-400"
                      />
                      <time dateTime={new Date(createdAt!).toISOString()}>
                        {formattedCreated}
                      </time>
                    </div>
                  )}
                </div>

                {description && (
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {hasNext && (
        <div className="mt-4 text-xs text-gray-400 text-center">
          More groups available
        </div>
      )}
    </div>
  );
}
