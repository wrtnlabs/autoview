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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  type App = NonNullable<AutoViewInput[number]>;
  // Filter out null entries
  const apps: App[] = Array.isArray(value)
    ? value.filter((app): app is App => app !== null)
    : [];
  // Sort by creation date (newest first)
  const sortedApps = [...apps].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {sortedApps.map((app) => {
        const createdDate = new Date(app.created_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const updatedDate = new Date(app.updated_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const description = app.description || "No description provided.";
        const permissionsCount = app.permissions
          ? Object.keys(app.permissions).length
          : 0;
        const eventsCount = Array.isArray(app.events) ? app.events.length : 0;
        const installs = app.installations_count ?? 0;

        return (
          <div
            key={app.id}
            className="p-4 bg-white rounded-lg shadow border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {app.name}
              </h2>
              {app.slug && (
                <span className="mt-2 sm:mt-0 inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded">
                  {app.slug}
                </span>
              )}
            </div>
            <p className="mt-2 text-gray-600 text-sm overflow-hidden line-clamp-2">
              {description}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-gray-500 text-sm">
              <span>Created: {createdDate}</span>
              <span>Updated: {updatedDate}</span>
              <span>{installs} Installs</span>
              <span>Events: {eventsCount}</span>
              <span>Permissions: {permissionsCount}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
