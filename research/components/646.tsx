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
  const integrations = Array.isArray(value) ? value.filter((item): item is NonNullable<typeof item> => item != null) : [];

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {integrations.length === 0 ? (
        <p className="text-center text-gray-500">No integrations available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((app) => {
            const {
              id,
              name,
              description,
              external_url,
              created_at,
              updated_at,
              events,
              installations_count,
            } = app;
            const safeDescription = description ?? "No description provided.";
            const eventList = Array.isArray(events) ? events : [];
            const previewEvents = eventList.slice(0, 3);
            const moreCount = eventList.length - previewEvents.length;

            return (
              <div
                key={id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{safeDescription}</p>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 truncate">{external_url}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {previewEvents.map((evt, idx) => (
                      <span
                        key={`${evt}-${idx}`}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                      >
                        {evt}
                      </span>
                    ))}
                    {moreCount > 0 && (
                      <span className="text-xs text-gray-500">+{moreCount} more</span>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 border-t px-4 py-3 text-xs text-gray-600 flex justify-between">
                  <span>Created: {formatDate(created_at)}</span>
                  <span>Updated: {formatDate(updated_at)}</span>
                </div>
                {typeof installations_count === "number" && (
                  <div className="bg-gray-50 border-t px-4 py-2 text-xs text-gray-600">
                    Installations: {installations_count}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
