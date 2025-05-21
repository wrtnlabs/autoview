import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: any | any;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    export type simple_user = any;
    export type enterprise = any;
}
export type AutoViewInput = AutoViewInputSubTypes.integration[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Handle empty or null list
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No GitHub integrations available.
      </div>
    );
  }

  // 2. Utility functions: date formatting and text truncation
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const truncateText = (text: string, max = 120): string =>
    text.length > max ? text.slice(0, max) + "…" : text;

  // 3. Render grid of integration cards
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {value.map((integration, idx) => {
        if (!integration) return null;
        const {
          id,
          name,
          description,
          created_at,
          updated_at,
          events,
          permissions,
          installations_count,
        } = integration;
        const permCount = permissions
          ? Object.keys(permissions).length
          : 0;

        return (
          <div
            key={id ?? idx}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Name */}
            <h2 className="text-lg font-medium text-gray-800 truncate">
              {name}
            </h2>

            {/* Description */}
            {description && (
              <p className="mt-2 text-sm text-gray-600">
                {truncateText(description)}
              </p>
            )}

            {/* Dates */}
            <div className="mt-4 flex flex-wrap text-xs text-gray-500 space-x-2">
              <span>Created: {formatDate(created_at)}</span>
              <span>Updated: {formatDate(updated_at)}</span>
            </div>

            {/* Events as badges */}
            {events && events.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {events.slice(0, 3).map((evt, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs"
                  >
                    {evt}
                  </span>
                ))}
                {events.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    +{events.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Permissions and installations */}
            <div className="mt-4 flex items-center text-sm text-gray-700 space-x-4">
              <span>Permissions: {permCount}</span>
              {installations_count !== undefined && (
                <span>Installs: {installations_count}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
