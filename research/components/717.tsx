import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposDependabotSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.dependabot_secret[];
        };
    }
    /**
     * Set secrets for Dependabot.
     *
     * @title Dependabot Secret
    */
    export type dependabot_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposDependabotSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Sort secrets by creation date (newest first)
  const sortedSecrets = React.useMemo(() => {
    return [...value.secrets].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [value.secrets]);

  // Helper to format ISO strings into a human-readable date-time.
  const formatDateTime = (iso: string): string => {
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
  // 3. Return the React element.
  return (
    <section className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Dependabot Secrets
        </h2>
        <p className="text-sm text-gray-500">
          Total: <span className="font-medium text-gray-700">{value.total_count}</span>
        </p>
      </header>
      <ul className="space-y-3">
        {sortedSecrets.map((secret) => (
          <li
            key={secret.name}
            className="flex flex-col sm:flex-row sm:justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition"
          >
            <div className="truncate">
              <p className="text-gray-900 font-medium truncate">{secret.name}</p>
            </div>
            <div className="mt-2 sm:mt-0 text-xs text-gray-500 flex flex-col sm:items-end">
              <span>
                Created:{" "}
                <time dateTime={secret.created_at}>
                  {formatDateTime(secret.created_at)}
                </time>
              </span>
              <span>
                Updated:{" "}
                <time dateTime={secret.updated_at}>
                  {formatDateTime(secret.updated_at)}
                </time>
              </span>
            </div>
          </li>
        ))}
        {sortedSecrets.length === 0 && (
          <li className="text-center text-gray-500 py-4">
            No secrets available.
          </li>
        )}
      </ul>
    </section>
  );
}
