import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4GroupsInfiniteScrollingView {
                    groups?: AutoViewInputSubTypes.legacy.v4.LegacyV4Group[];
                    next?: string;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Group {
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
            }
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4GroupsInfiniteScrollingView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const groups = value.groups ?? [];
  const hasNext = Boolean(value.next);
  const scopeColor: Record<AutoViewInputSubTypes.legacy.v4.LegacyV4Group['scope'], string> = {
    all: 'bg-blue-100 text-blue-800',
    public: 'bg-green-100 text-green-800',
    private: 'bg-gray-100 text-gray-800',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No groups available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap -mx-2">
      {groups.map((group, idx) => {
        const createdAt = group.createdAt
          ? new Date(group.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : null;
        const managerCount = group.managerIds?.length;
        const isActive = group.active !== false;
        const scopeCls = scopeColor[group.scope] || scopeColor.private;

        return (
          <div key={group.id ?? idx} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <LucideReact.Tag size={20} className="text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{group.name}</h3>
                </div>
                {isActive ? (
                  <LucideReact.CheckCircle size={20} className="text-green-500" />
                ) : (
                  <LucideReact.XCircle size={20} className="text-red-500" />
                )}
              </div>

              {group.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{group.description}</p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className={`px-2 py-1 rounded ${scopeCls}`}>{group.scope}</span>

                {typeof managerCount === 'number' && (
                  <span className="flex items-center text-gray-500">
                    <LucideReact.Users size={14} className="mr-1" />
                    {managerCount}
                  </span>
                )}

                {createdAt && (
                  <span className="flex items-center text-gray-500">
                    <LucideReact.Calendar size={14} className="mr-1" />
                    {createdAt}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {hasNext && (
        <div className="w-full px-2">
          <div className="mt-4 flex items-center justify-center text-gray-500">
            <LucideReact.ChevronsDown size={20} className="animate-bounce" />
            <span className="ml-2">More items available</span>
          </div>
        </div>
      )}
    </div>
  );
}
