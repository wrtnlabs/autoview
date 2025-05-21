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
  // 1. Filter out null entries and memoize for performance
  const integrations = React.useMemo(
    () => value.filter((item) => item !== null) as NonNullable<typeof value[number]>[],
    [value],
  );

  // 2. Render a responsive grid of GitHub App cards
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((item) => {
        // Data transformations & formatting
        const createdAt = new Date(item.created_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const updatedAt = new Date(item.updated_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const description = item.description ?? "No description provided.";
        const permissionsCount = Object.keys(item.permissions).length;
        const eventsCount = item.events.length;
        const installations = item.installations_count ?? 0;

        return (
          <div
            key={item.id}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <header>
              <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
              {item.slug && (
                <p className="mt-1 text-sm text-gray-500 truncate">@{item.slug}</p>
              )}
            </header>

            <p className="mt-2 text-sm text-gray-700 line-clamp-2">{description}</p>

            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
              <div>
                <dt className="font-medium">Permissions</dt>
                <dd>{permissionsCount}</dd>
              </div>
              <div>
                <dt className="font-medium">Events</dt>
                <dd>{eventsCount}</dd>
              </div>
              <div>
                <dt className="font-medium">Installs</dt>
                <dd>{installations}</dd>
              </div>
              <div>
                <dt className="font-medium">Created</dt>
                <dd>{createdAt}</dd>
              </div>
              <div>
                <dt className="font-medium">Updated</dt>
                <dd>{updatedAt}</dd>
              </div>
            </dl>

            <footer className="mt-3 text-xs text-gray-500 space-y-1">
              <p className="truncate">
                External: <span className="font-medium">{item.external_url}</span>
              </p>
              <p className="truncate">
                HTML: <span className="font-medium">{item.html_url}</span>
              </p>
            </footer>
          </div>
        );
      })}
    </div>
  );
}
