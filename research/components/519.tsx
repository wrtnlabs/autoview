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
  // 1. Data transformation: sort versions by most recent update
  const sortedVersions = [...value].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  // 2. Render structure
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {sortedVersions.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <LucideReact.AlertCircle size={24} className="text-gray-400" />
          <span className="mt-2 text-sm">No version history available</span>
        </div>
      ) : (
        sortedVersions.map((item, idx) => {
          // Derive actor label
          const actorLabel = item.actor.type
            ? `${item.actor.type}${item.actor.id ? ` (#${item.actor.id})` : ""}`
            : "Unknown actor";
          // Format update date
          const formattedDate = new Date(item.updated_at).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          });

          return (
            <div
              key={idx}
              className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <LucideReact.Archive size={16} className="text-gray-400" />
                <span className="font-medium text-gray-800 truncate">
                  Version {item.version_id}
                </span>
                <LucideReact.User size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600 truncate">{actorLabel}</span>
              </div>
              <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{formattedDate}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
