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
  // 1. Define data aggregation/transformation functions or derived constants
  type Integration = Exclude<AutoViewInputSubTypes.integration, null>;
  const integrations: Integration[] = value.filter(
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
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-lg">No integrations available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => {
        const {
          id,
          name,
          slug,
          description,
          owner,
          external_url,
          html_url,
          created_at,
          updated_at,
          installations_count,
          permissions,
          events,
        } = integration;

        // Owner details
        const isUser = (owner as any).login !== undefined;
        const ownerName = isUser
          ? (owner as AutoViewInputSubTypes.simple_user).login
          : (owner as AutoViewInputSubTypes.enterprise).name;
        const avatarUrl = isUser
          ? (owner as AutoViewInputSubTypes.simple_user).avatar_url
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(ownerName)}&background=0D8ABC&color=fff`;

        // Derived counts and text
        const descText = description ?? "No description available";
        const installCount = installations_count ?? 0;
        const permCount = Object.keys(permissions).length;
        const eventCount = events.length;

        return (
          <div
            key={id}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-5 flex flex-col"
          >
            {/* Title & slug */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {name}
                {slug && (
                  <span className="text-sm text-gray-500"> · {slug}</span>
                )}
              </h3>
              <div className="flex items-center text-gray-500 text-sm">
                <LucideReact.Users size={16} className="mr-1" />
                <span>{installCount}</span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {descText}
            </p>

            {/* Owner info */}
            <div className="mt-3 flex items-center">
              <img
                src={avatarUrl}
                alt={`${ownerName} avatar`}
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    ownerName
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <span className="ml-2 text-sm text-gray-700 truncate">
                {ownerName}
              </span>
            </div>

            {/* Permissions & events */}
            <div className="mt-3 flex items-center space-x-4 text-gray-500 text-sm">
              <div className="flex items-center">
                <LucideReact.Settings size={16} className="mr-1" />
                <span>{permCount} perms</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Zap size={16} className="mr-1" />
                <span>{eventCount} events</span>
              </div>
            </div>

            {/* Links */}
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex items-center text-gray-500">
                <LucideReact.Link size={16} className="mr-1" />
                <span className="truncate">{external_url}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <LucideReact.Link size={16} className="mr-1" />
                <span className="truncate">{html_url}</span>
              </div>
            </div>

            {/* Dates */}
            <div className="mt-3 border-t pt-3 flex justify-between text-xs text-gray-400">
              <span>Created: {formatDate(created_at)}</span>
              <span>Updated: {formatDate(updated_at)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
}
