import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
        managerIds?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<2147483647> &
          tags.UniqueItems;
        icon?: string & tags.Pattern<"\\S+">;
        description?: string;
        createdAt?: number;
        updatedAt?: number;
        active?: boolean;
      };
    }
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4GroupsInfiniteScrollingView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const groups = value.groups ?? [];

  // Helper to format timestamps
  const formatDate = (ts?: number): string =>
    ts
      ? new Date(ts).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No groups available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group, index) => {
        const name = group.name;
        const description = group.description?.trim() || "";
        const created = formatDate(group.createdAt);
        const scopeStyles =
          group.scope === "public"
            ? "bg-blue-100 text-blue-800"
            : group.scope === "private"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800";
        const managerCount = group.managerIds?.length ?? 0;
        const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name,
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={group.id ?? index}
            className="flex items-start p-4 bg-white rounded-lg shadow-sm"
          >
            {/* Icon / Avatar */}
            <div className="flex-shrink-0">
              {group.icon ? (
                <img
                  src={group.icon}
                  alt={`${name} icon`}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = avatarPlaceholder;
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h3
                  className="text-lg font-semibold text-gray-900 truncate"
                  title={name}
                >
                  {name}
                </h3>
                <span
                  className={`ml-2 text-xs font-medium px-2 py-1 rounded ${scopeStyles}`}
                >
                  {group.scope.charAt(0).toUpperCase() + group.scope.slice(1)}
                </span>
              </div>

              {description && (
                <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                  {description}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center text-gray-500 text-xs space-x-4">
                {created && (
                  <div className="flex items-center">
                    <LucideReact.Calendar size={14} />
                    <span className="ml-1">{created}</span>
                  </div>
                )}
                {typeof group.active === "boolean" && (
                  <div className="flex items-center">
                    {group.active ? (
                      <LucideReact.CheckCircle
                        className="text-green-500"
                        size={14}
                        aria-label="Active"
                      />
                    ) : (
                      <LucideReact.XCircle
                        className="text-red-500"
                        size={14}
                        aria-label="Inactive"
                      />
                    )}
                  </div>
                )}
                {managerCount > 0 && (
                  <div className="flex items-center">
                    <LucideReact.Users size={14} />
                    <span className="ml-1">
                      {managerCount} manager{managerCount > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
