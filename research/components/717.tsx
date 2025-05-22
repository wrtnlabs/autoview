import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposDependabotSecrets.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const hasSecrets = value.secrets.length > 0;

  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <LucideReact.Lock size={20} className="mr-2 text-gray-600" />
          Dependabot Secrets
        </h2>
        <span className="text-sm text-gray-500">
          {value.total_count} {value.total_count === 1 ? "secret" : "secrets"}
        </span>
      </div>
      {!hasSecrets ? (
        <div className="text-center text-gray-500 py-8">
          <LucideReact.AlertCircle size={40} className="mx-auto mb-2" />
          <p>No secrets available.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {value.secrets.map((secret, index) => (
            <li
              key={secret.name + index}
              className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="flex items-center mb-2 sm:mb-0">
                <LucideReact.Key size={16} className="text-gray-500 mr-2" />
                <span className="text-gray-800 font-medium truncate">
                  {secret.name}
                </span>
              </div>
              <div className="flex flex-wrap text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <LucideReact.Calendar
                    size={16}
                    className="mr-1 text-gray-400"
                  />
                  <span>Created: {formatDate(secret.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Calendar
                    size={16}
                    className="mr-1 text-gray-400"
                  />
                  <span>Updated: {formatDate(secret.updated_at)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
