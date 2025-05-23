import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposDependabotSecrets {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.dependabot_secret[];
        }
    }
    /**
     * Set secrets for Dependabot.
     *
     * @title Dependabot Secret
    */
    export interface dependabot_secret {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposDependabotSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const hasSecrets = Array.isArray(value.secrets) && value.secrets.length > 0;

  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.ListChecks size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Dependabot Secrets ({value.total_count})
        </h2>
      </div>

      {!hasSecrets ? (
        <div className="flex flex-col items-center py-10">
          <LucideReact.AlertCircle size={40} className="text-gray-400" />
          <p className="mt-2 text-gray-500">No Dependabot secrets found.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {value.secrets.map((secret) => (
            <li key={secret.name} className="py-3 sm:py-4">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center text-gray-800 font-medium">
                  <LucideReact.Key size={16} className="text-gray-500 mr-1" />
                  <span className="truncate">{secret.name}</span>
                </div>
                <div className="flex flex-wrap text-gray-500 text-sm space-x-4">
                  <div className="flex items-center">
                    <LucideReact.Calendar
                      size={14}
                      className="text-gray-400 mr-1"
                    />
                    <span>Created: {formatDate(secret.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Calendar
                      size={14}
                      className="text-gray-400 mr-1"
                    />
                    <span>Updated: {formatDate(secret.updated_at)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
