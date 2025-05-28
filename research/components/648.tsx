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
  const integrations = value.filter(
    (item): item is NonNullable<AutoViewInputSubTypes.integration> => item !== null
  );
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (integrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle className="mb-2" size={48} />
        <span>No integrations available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {integrations.map((integration) => {
        const {
          id,
          name,
          slug,
          description,
          external_url,
          created_at,
          updated_at,
          installations_count,
          permissions,
          events,
          owner,
        } = integration;
        const ownerName =
          "login" in owner ? owner.login : owner.name;

        return (
          <div
            key={id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {name}
              </h3>
              {slug && (
                <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded">
                  {slug}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {description ?? "No description provided."}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <img
                  src={owner.avatar_url}
                  alt={ownerName}
                  onError={(e) =>
                    (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      ownerName
                    )}&background=0D8ABC&color=fff`)
                  }
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span>{ownerName}</span>
              </div>

              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Created {formatDate(created_at)}</span>
              </div>

              {installations_count !== undefined && (
                <div className="flex items-center gap-1">
                  <LucideReact.Users size={16} className="text-gray-400" />
                  <span>{installations_count}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <LucideReact.Zap size={16} className="text-gray-400" />
                <span>{events.length} events</span>
              </div>

              <div className="flex items-center gap-1">
                <LucideReact.Key size={16} className="text-gray-400" />
                <span>{Object.keys(permissions).length} permissions</span>
              </div>

              <div className="flex items-center gap-1 max-w-xs truncate">
                <LucideReact.Link size={16} className="text-gray-400" />
                <span className="truncate">{external_url}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-3 text-sm text-gray-400">
              <LucideReact.GitCommit size={16} />
              <span>Last updated {formatDate(updated_at)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
