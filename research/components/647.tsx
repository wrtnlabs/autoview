import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  export type simple_user = {
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
  };
  /**
   * An enterprise on GitHub.
   *
   * @title Enterprise
   */
  export type enterprise = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.integration[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data filtering and formatting utilities
  const integrations = value.filter(
    (item): item is NonNullable<typeof item> => item !== null,
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Render placeholder when no data
  if (integrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No integrations available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => {
        const owner = integration.owner;
        const ownerName =
          "login" in owner ? owner.login : owner.name || "Unknown";
        const avatarUrl = owner.avatar_url;
        const installationCount = integration.installations_count ?? "—";
        const permissionCount = Object.keys(integration.permissions).length;
        const eventsCount = integration.events.length;

        return (
          <div
            key={integration.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="p-4 flex items-start">
              <img
                src={avatarUrl}
                alt={ownerName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    ownerName,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {integration.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600 truncate">
                  {ownerName}
                </p>
              </div>
            </div>

            <div className="px-4">
              <p className="text-sm text-gray-700 line-clamp-3 min-h-[3.5rem]">
                {integration.description ?? "No description provided."}
              </p>
            </div>

            <div className="mt-4 px-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="ml-1">
                  Created {formatDate(integration.created_at)}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.RefreshCw size={16} className="text-gray-400" />
                <span className="ml-1">
                  Updated {formatDate(integration.updated_at)}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Users size={16} className="text-gray-400" />
                <span className="ml-1">{installationCount} installs</span>
              </div>
              <div className="flex items-center">
                <LucideReact.List size={16} className="text-gray-400" />
                <span className="ml-1">{eventsCount} events</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Lock size={16} className="text-gray-400" />
                <span className="ml-1">{permissionCount} perms</span>
              </div>
            </div>

            <div className="mt-4 px-4 pb-4">
              <a
                href={integration.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline text-sm"
              >
                <LucideReact.Link size={16} className="mr-1" />
                View on GitHub
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
