import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export interface GroupsInfiniteScrollingView {
            next?: string;
            groups?: AutoViewInputSubTypes.Group[];
        }
    }
    export interface Group {
        id?: string;
        channelId?: string;
        title: string;
        scope: "all" | "public" | "private";
        managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.desk.GroupsInfiniteScrollingView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const groups = value.groups ?? [];
  const hasGroups = groups.length > 0;

  const scopeLabels = {
    all: "All Users",
    public: "Public",
    private: "Private",
  } as const;

  function formatDate(timestamp?: number): string {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasGroups) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle aria-hidden size={48} />
        <span>No groups available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group, idx) => (
        <div key={group.id ?? idx} className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {group.title}
            </h3>
            {group.active ? (
              <LucideReact.CheckCircle
                className="text-green-500"
                size={16}
                aria-hidden
              />
            ) : (
              <LucideReact.XCircle
                className="text-red-500"
                size={16}
                aria-hidden
              />
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
              {scopeLabels[group.scope]}
            </span>

            {group.managerIds && (
              <div className="flex items-center">
                <LucideReact.Users className="mr-1" size={16} aria-hidden />
                <span>
                  {group.managerIds.length}{" "}
                  {group.managerIds.length === 1 ? "Manager" : "Managers"}
                </span>
              </div>
            )}

            {group.createdAt && (
              <div className="flex items-center">
                <LucideReact.Calendar
                  className="mr-1"
                  size={16}
                  aria-hidden
                />
                <time dateTime={new Date(group.createdAt).toISOString()}>
                  {formatDate(group.createdAt)}
                </time>
              </div>
            )}
          </div>

          {group.description && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {group.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
