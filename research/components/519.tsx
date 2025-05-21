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
  const versions = React.useMemo(
    () =>
      [...value].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      ),
    [value],
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getActorName = (
    actor: AutoViewInputSubTypes.ruleset_version['actor'],
  ): string =>
    actor.type
      ? actor.type
      : actor.id !== undefined
      ? `Actor #${actor.id}`
      : 'Unknown Actor';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-baseline">
        Version History
        <span className="ml-2 text-sm text-gray-500">({versions.length})</span>
      </h2>
      <ul className="divide-y divide-gray-200">
        {versions.map((ver) => (
          <li
            key={ver.version_id}
            className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div className="flex items-center space-x-2">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                v{ver.version_id}
              </span>
              <span className="text-sm text-gray-600 truncate">
                {getActorName(ver.actor)}
              </span>
            </div>
            <time className="mt-1 sm:mt-0 text-sm text-gray-500">
              {formatDate(ver.updated_at)}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
