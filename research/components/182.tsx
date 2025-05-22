import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4GroupsInfiniteScrollingView = {
                    groups?: AutoViewInputSubTypes.legacy.v4.LegacyV4Group[];
                    next?: string;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Group = {
                id?: string;
                channelId?: string;
                name: string;
                scope: "all" | "public" | "private";
                managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                icon?: string & tags.Pattern<"\\S+">;
                description?: string;
                createdAt?: number;
                updatedAt?: number;
                active?: boolean;
            };
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4GroupsInfiniteScrollingView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const groups = value.groups ?? [];
  const hasMore = typeof value.next === "string" && value.next.length > 0;

  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full mx-auto p-4">
      {groups.length === 0 ? (
        <div className="text-center text-gray-500">No groups available.</div>
      ) : (
        <ul className="space-y-4">
          {groups.map((group, idx) => {
            const managerCount = group.managerIds?.length ?? 0;
            return (
              <li
                key={group.id ?? idx}
                className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center"
              >
                {group.icon && (
                  <img
                    src={group.icon}
                    alt={`${group.name} icon`}
                    className="w-12 h-12 rounded-full mr-4 object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {group.name}
                    </h3>
                    <span
                      className={
                        group.active
                          ? "text-green-700 bg-green-100 px-2 py-1 rounded-full text-sm font-medium"
                          : "text-red-700 bg-red-100 px-2 py-1 rounded-full text-sm font-medium"
                      }
                    >
                      {group.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <span className="capitalize">{group.scope}</span>
                    {" · "}
                    {managerCount} manager{managerCount !== 1 ? "s" : ""}
                  </div>
                  {group.description && (
                    <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                      {group.description}
                    </p>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    Created: {formatDate(group.createdAt)}
                    {group.updatedAt
                      ? ` · Updated: ${formatDate(group.updatedAt)}`
                      : ""}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {hasMore && (
        <div className="mt-4 text-center text-blue-600 text-sm">
          More groups available...
        </div>
      )}
    </div>
  );
}
