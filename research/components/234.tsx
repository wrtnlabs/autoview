import { tags } from "typia";
import React from "react";
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.desk.GroupsInfiniteScrollingView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const groups: AutoViewInputSubTypes.Group[] = value.groups ?? [];
  const formatDate = (ts?: number): string =>
    ts
      ? new Date(ts).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '';
  const scopeLabels: Record<AutoViewInputSubTypes.Group['scope'], string> = {
    all: 'All',
    public: 'Public',
    private: 'Private',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-4">
      {groups.length === 0 ? (
        <div className="text-center text-gray-500">No groups available.</div>
      ) : (
        groups.map((group) => (
          <div
            key={group.id ?? group.title}
            className="bg-white p-4 rounded-lg shadow-sm flex items-start space-x-4"
          >
            {group.icon && (
              <img
                src={group.icon}
                alt={`${group.title} icon`}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {group.title}
                </h3>
                <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                  <span className="px-2 py-0.5 text-xs font-medium text-white bg-blue-500 rounded">
                    {scopeLabels[group.scope]}
                  </span>
                  {group.active !== undefined && (
                    <span
                      className={`px-2 py-0.5 text-xs font-medium text-white rounded ${
                        group.active ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {group.active ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>
              </div>
              {group.description && (
                <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                  {group.description}
                </p>
              )}
              {(group.createdAt || group.updatedAt) && (
                <div className="mt-3 text-gray-500 text-xs space-x-4">
                  {group.createdAt && (
                    <span>Created: {formatDate(group.createdAt)}</span>
                  )}
                  {group.updatedAt && (
                    <span>Updated: {formatDate(group.updatedAt)}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
