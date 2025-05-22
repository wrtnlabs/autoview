import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const versions = Array.isArray(value)
    ? [...value].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )
    : [];

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActorLabel = (
    actor: AutoViewInputSubTypes.ruleset_version["actor"],
  ) => {
    if (actor.type) return actor.type;
    if (typeof actor.id === "number") return `Actor #${actor.id}`;
    return "Unknown";
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (versions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <LucideReact.AlertCircle className="text-gray-400 mb-2" size={48} />
        <p className="text-gray-500">No version history available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.History className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Ruleset Version History ({versions.length})
        </h2>
      </div>
      <ul className="space-y-3">
        {versions.map((version) => (
          <li
            key={version.version_id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center space-x-2 truncate">
              <LucideReact.Hash className="text-indigo-500" size={16} />
              <span className="font-medium text-gray-700 truncate">
                Version {version.version_id}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-1 sm:mt-0 truncate">
              <LucideReact.User className="text-gray-500" size={16} />
              <span className="text-gray-600 truncate">
                {getActorLabel(version.actor)}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-1 sm:mt-0">
              <LucideReact.Calendar className="text-gray-400" size={16} />
              <time
                dateTime={version.updated_at}
                className="text-gray-500 text-sm"
              >
                {formatDate(version.updated_at)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
