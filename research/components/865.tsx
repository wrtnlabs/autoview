import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The historical version of a ruleset
     *
     * @title Ruleset version
    */
    export interface ruleset_version {
        /**
         * The ID of the previous version of the ruleset
        */
        version_id: number & tags.Type<"int32">;
        /**
         * The actor who updated the ruleset
        */
        actor: {
            id?: number & tags.Type<"int32">;
            type?: string;
        };
        updated_at: string & tags.Format<"date-time">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.ruleset_version[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Sort versions by most recent update first
  const sortedVersions = [...value].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  //    Format ISO date strings into a readable form
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Handle empty state
  if (sortedVersions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No version history available.</span>
      </div>
    );
  }

  //    Main version history card
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.History size={20} className="text-gray-600" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Version History
        </h2>
      </div>
      <ul className="space-y-4">
        {sortedVersions.map((version) => {
          const actorType = version.actor.type
            ? version.actor.type.charAt(0).toUpperCase() +
              version.actor.type.slice(1)
            : "Unknown";
          return (
            <li
              key={version.version_id}
              className="border-l-2 border-gray-200 pl-4"
            >
              <div className="flex items-center text-gray-800">
                <LucideReact.Hash
                  size={16}
                  className="text-blue-500 flex-shrink-0"
                />
                <span className="ml-1 font-medium">v{version.version_id}</span>
                <span className="ml-2 text-sm text-gray-500">
                  {formatDate(version.updated_at)}
                </span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <LucideReact.User size={14} className="flex-shrink-0" />
                <span className="ml-1">{actorType}</span>
                {version.actor.id != null && (
                  <span className="ml-1">#{version.actor.id}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
