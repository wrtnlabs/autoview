import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The historical version of a ruleset
     *
     * @title Ruleset version
    */
    export type ruleset_version = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.ruleset_version[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Sorting history newest first and formatting timestamps.
  const sortedHistory = [...value].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  if (sortedHistory.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-center">No version history available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Ruleset Version History
      </h2>
      <ul className="space-y-4">
        {sortedHistory.map((version) => (
          <li
            key={version.version_id}
            className="border-l-2 border-gray-200 pl-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">
                Version {version.version_id}
              </span>
              <span className="text-gray-500 text-sm">
                {formatDate(version.updated_at)}
              </span>
            </div>
            {(version.actor.type || version.actor.id !== undefined) && (
              <div className="mt-1 text-gray-500 text-sm">
                {version.actor.type && (
                  <span className="capitalize">{version.actor.type}</span>
                )}
                {version.actor.id !== undefined && (
                  <span>
                    {version.actor.type
                      ? ` (ID: ${version.actor.id})`
                      : `ID: ${version.actor.id}`}
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
