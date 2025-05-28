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
  type Integration = NonNullable<AutoViewInputSubTypes.integration>;
  const integrations = value.filter(
    (item): item is Integration => item !== null
  );
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (integrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No Integrations Available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Integrations ({integrations.length})
      </h2>
      <ul className="space-y-4">
        {integrations.map((intg) => {
          const permissionCount = Object.keys(intg.permissions).length;
          const eventCount = intg.events.length;
          const installations = intg.installations_count ?? 0;
          const owner = intg.owner;
          const ownerName =
            "login" in owner ? owner.login : owner.name;
          const avatarSrc = owner.avatar_url;

          return (
            <li
              key={intg.id}
              className="p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LucideReact.Package
                    size={20}
                    className="text-indigo-500"
                  />
                  <span className="text-lg font-medium text-gray-800">
                    {intg.name}
                  </span>
                  {intg.slug && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {intg.slug}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <LucideReact.Calendar size={16} />
                  <span>{formatDate(intg.updated_at)}</span>
                </div>
              </div>

              {intg.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {intg.description}
                </p>
              )}

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <img
                    src={avatarSrc}
                    alt={ownerName}
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        ownerName
                      )}&background=0D8ABC&color=fff`;
                    }}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="ml-2 truncate">{ownerName}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Users
                    size={16}
                    className="text-gray-400"
                  />
                  <span className="ml-2">{installations}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Key
                    size={16}
                    className="text-gray-400"
                  />
                  <span className="ml-2">{permissionCount} perms</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Bell
                    size={16}
                    className="text-gray-400"
                  />
                  <span className="ml-2">{eventCount} events</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center text-sm text-blue-600 space-x-4">
                <div className="flex items-center max-w-xs truncate">
                  <LucideReact.Link size={14} />
                  <span className="ml-1 truncate">{intg.html_url}</span>
                </div>
                <div className="flex items-center max-w-xs truncate">
                  <LucideReact.ExternalLink size={14} />
                  <span className="ml-1 truncate">{intg.external_url}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
