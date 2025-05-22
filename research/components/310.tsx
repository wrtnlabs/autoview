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
  // 1. Data aggregation/transformation
  if (value === null) {
    return (
      <div className="p-4 text-gray-500 italic">
        No integration data available.
      </div>
    );
  }

  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const formattedCreated = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedUpdated = updatedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const installCount = value.installations_count ?? 0;
  const installText = `${installCount} ${
    installCount === 1 ? "installation" : "installations"
  }`;

  const permissionEntries = Object.entries(value.permissions || {});
  const topPermissions = permissionEntries.slice(0, 5);
  const extraPermissions = permissionEntries.length - topPermissions.length;

  const events = Array.isArray(value.events) ? value.events : [];
  const topEvents = events.slice(0, 5);
  const extraEvents = events.length - topEvents.length;

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">{value.name}</h2>
      {/* Slug */}
      {value.slug && (
        <p className="mt-1 text-sm text-gray-500">@{value.slug}</p>
      )}
      {/* Description */}
      {value.description && (
        <p className="mt-2 text-gray-700 text-sm line-clamp-2">
          {value.description}
        </p>
      )}
      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-600">
        <div>
          <span className="font-medium text-gray-800">Created:</span>{" "}
          {formattedCreated}
        </div>
        <div>
          <span className="font-medium text-gray-800">Updated:</span>{" "}
          {formattedUpdated}
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-800">Installations:</span>{" "}
          {installText}
        </div>
      </div>
      {/* Events */}
      {topEvents.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-1">Events</h3>
          <div className="flex flex-wrap gap-2">
            {topEvents.map((evt) => (
              <span
                key={evt}
                className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
              >
                {evt}
              </span>
            ))}
            {extraEvents > 0 && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                +{extraEvents} more
              </span>
            )}
          </div>
        </div>
      )}
      {/* Permissions */}
      {topPermissions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-1">
            Permissions
          </h3>
          <div className="flex flex-wrap gap-2">
            {topPermissions.map(([key, val]) => (
              <span
                key={key}
                className="flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {key}:{val}
              </span>
            ))}
            {extraPermissions > 0 && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                +{extraPermissions} more
              </span>
            )}
          </div>
        </div>
      )}
      {/* External URL */}
      {value.external_url && (
        <div
          className="mt-4 text-xs text-blue-600 truncate"
          title={value.external_url}
        >
          {value.external_url}
        </div>
      )}
    </div>
  );
}
