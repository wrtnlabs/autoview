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
export type AutoViewInput = AutoViewInputSubTypes.integration;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Handle null or undefined input
  if (!value) {
    return (
      <div className="p-4 text-center text-gray-500">
        No integration data available.
      </div>
    );
  }

  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    name,
    slug,
    description,
    external_url,
    html_url,
    created_at,
    updated_at,
    installations_count,
    permissions,
    events,
  } = value;

  // Format dates to a human-friendly format
  const formattedCreated = new Date(created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedUpdated = new Date(updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Use a fallback for description
  const displayDescription = description ?? "No description provided.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header: Name and optional slug */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        {slug && (
          <p className="mt-1 text-sm text-gray-500 truncate">@{slug}</p>
        )}
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700 line-clamp-2">
        {displayDescription}
      </p>

      {/* Core metadata */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex">
          <span className="font-medium">Created:</span>
          <span className="ml-1">{formattedCreated}</span>
        </div>
        <div className="flex">
          <span className="font-medium">Updated:</span>
          <span className="ml-1">{formattedUpdated}</span>
        </div>
        {installations_count !== undefined && (
          <div className="flex">
            <span className="font-medium">Installations:</span>
            <span className="ml-1">{installations_count}</span>
          </div>
        )}
      </div>

      {/* URLs (display only, not clickable) */}
      {(external_url || html_url) && (
        <div className="mt-5">
          <h3 className="text-sm font-medium text-gray-700">URLs</h3>
          <ul className="mt-1 space-y-1 text-xs text-blue-600">
            {external_url && (
              <li className="truncate">{external_url}</li>
            )}
            {html_url && (
              <li className="truncate">{html_url}</li>
            )}
          </ul>
        </div>
      )}

      {/* Permissions badges */}
      {permissions && Object.keys(permissions).length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-medium text-gray-700">
            Permissions
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(permissions).map(([key, level]) => (
              <span
                key={key}
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
              >
                {key}: {level}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Events badges */}
      {events && events.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-medium text-gray-700">Events</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {events.map((evt) => (
              <span
                key={evt}
                className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded uppercase"
              >
                {evt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
