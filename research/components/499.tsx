import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsPrivateRegistries {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            configurations: AutoViewInputSubTypes.org_private_registry_configuration[];
        };
    }
    /**
     * Private registry configuration for an organization
     *
     * @title Organization private registry
    */
    export type org_private_registry_configuration = {
        /**
         * The name of the private registry configuration.
        */
        name: string;
        /**
         * The registry type.
        */
        registry_type: "maven_repository";
        /**
         * The username to use when authenticating with the private registry.
        */
        username?: string | null;
        /**
         * Which type of organization repositories have access to the private registry.
        */
        visibility: "all" | "private" | "selected";
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsPrivateRegistries.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, configurations } = value;

  // Format ISO-strings to a readable date-time, e.g., "Jan 1, 2023, 04:30 PM"
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {total_count} Private Registry{total_count === 1 ? "" : "ies"}
      </h2>

      {configurations.length === 0 ? (
        <p className="text-gray-500">No registry configurations available.</p>
      ) : (
        <ul className="space-y-4">
          {configurations.map((config, idx) => (
            <li
              key={idx}
              className="flex flex-col sm:flex-row sm:justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-md font-medium text-gray-900 truncate">
                  {config.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Type:{" "}
                  <span className="font-medium capitalize">
                    {config.registry_type.replace("_", " ")}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Visibility:{" "}
                  <span className="font-medium capitalize">
                    {config.visibility}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Username:{" "}
                  <span className="font-medium">
                    {config.username ?? "—"}
                  </span>
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-sm text-gray-500 flex-shrink-0">
                <p>Created: {formatDate(config.created_at)}</p>
                <p className="mt-1">Updated: {formatDate(config.updated_at)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
