import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
        owner: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise;
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
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    }
    /**
     * An enterprise on GitHub.
     *
     * @title Enterprise
    */
    export interface enterprise {
        /**
         * A short description of the enterprise.
        */
        description?: string | null;
        html_url: string & tags.Format<"uri">;
        /**
         * The enterprise's website URL.
        */
        website_url?: (string & tags.Format<"uri">) | null;
        /**
         * Unique identifier of the enterprise
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the enterprise.
        */
        name: string;
        /**
         * The slug url identifier for the enterprise.
        */
        slug: string;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        avatar_url: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.integration[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Filter out any null entries in the integrations array.
  const integrations = value.filter(
    (item): item is NonNullable<AutoViewInputSubTypes.integration> => item !== null,
  );

  // Handle empty state
  if (integrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No integrations available</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {integrations.map((integration) => {
        // Derive owner display name
        const owner = integration.owner;
        const ownerName =
          'login' in owner
            ? owner.login
            : owner.name;

        // Format dates
        const createdDate = new Date(integration.created_at).toLocaleDateString(
          undefined,
          { year: 'numeric', month: 'short', day: 'numeric' },
        );
        const updatedDate = new Date(integration.updated_at).toLocaleDateString(
          undefined,
          { year: 'numeric', month: 'short', day: 'numeric' },
        );

        // Compute counts
        const permissionsCount = Object.keys(integration.permissions).length;
        const eventsCount = integration.events.length;
        const installations = integration.installations_count ?? 0;

        return (
          <div key={integration.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <LucideReact.Github className="mr-2 text-gray-600" size={20} />
                {integration.name}
              </h2>
              <a
                href={integration.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-500 hover:underline"
              >
                <LucideReact.ExternalLink className="mr-1" size={16} />
                View on GitHub
              </a>
            </div>
            {integration.description && (
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {integration.description}
              </p>
            )}
            <div className="flex flex-wrap items-center text-gray-500 text-sm mt-3 gap-4">
              <div className="flex items-center">
                <LucideReact.User size={16} className="mr-1" />
                <span>{ownerName}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span>Created: {createdDate}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.RefreshCcw size={16} className="mr-1" />
                <span>Updated: {updatedDate}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Users size={16} className="mr-1" />
                <span>{installations} Installs</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Shield size={16} className="mr-1" />
                <span>{permissionsCount} Permissions</span>
              </div>
              <div className="flex items-center">
                <LucideReact.List size={16} className="mr-1" />
                <span>{eventsCount} Events</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
