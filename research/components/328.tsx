import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export type code_of_conduct = {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.code_of_conduct[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const count = value.length;
  // Sort entries alphabetically by name for consistent ordering
  const sortedEntries = [...value].sort((a, b) => a.name.localeCompare(b.name));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Code of Conduct{count > 0 && ` (${count})`}
      </h2>

      {count === 0 ? (
        <p className="text-gray-500">No code of conduct entries available.</p>
      ) : (
        <ul className="space-y-4">
          {sortedEntries.map((entry) => (
            <li
              key={entry.key}
              className="p-4 bg-white shadow-sm rounded-lg border border-gray-200"
            >
              <h3 className="text-md font-medium text-gray-900 truncate">
                {entry.name}
              </h3>

              {entry.body && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {entry.body}
                </p>
              )}

              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <div>
                  <span className="font-semibold">Document URL:</span>{' '}
                  <code className="break-all">{entry.url}</code>
                </div>
                {entry.html_url && (
                  <div>
                    <span className="font-semibold">HTML URL:</span>{' '}
                    <code className="break-all">{entry.html_url}</code>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
