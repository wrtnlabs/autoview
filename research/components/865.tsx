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
  // 1. Data transformation: sort versions by most recent update and format dates
  const sortedVersions = [...value].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.History
          size={20}
          className="text-gray-600 mr-2"
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-700">Version History</h2>
      </div>

      {sortedVersions.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500">
          <LucideReact.AlertCircle
            size={48}
            className="mb-2"
            aria-hidden="true"
          />
          <p className="text-sm">No version history available.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sortedVersions.map((v) => (
            <li
              key={v.version_id}
              className="flex flex-col sm:flex-row sm:justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <LucideReact.Hash
                  size={16}
                  className="text-gray-500"
                  aria-hidden="true"
                />
                <span className="text-gray-800 font-medium">
                  Version {v.version_id}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <LucideReact.User size={16} aria-hidden="true" />
                  <span>
                    {v.actor.type
                      ? v.actor.type + (v.actor.id ? ` (#${v.actor.id})` : "")
                      : v.actor.id
                        ? `ID ${v.actor.id}`
                        : "Unknown"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <LucideReact.Calendar size={16} aria-hidden="true" />
                  <time dateTime={v.updated_at}>
                    {formatDate(v.updated_at)}
                  </time>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
