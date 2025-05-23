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
export type AutoViewInput = AutoViewInputSubTypes.integration;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Handle null or missing data
  if (!value) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <p className="text-lg">No Integration Data</p>
      </div>
    );
  }

  // 1. Data formatting and derived values
  const createdAt = new Date(value.created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const updatedAt = new Date(value.updated_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const description =
    typeof value.description === "string" && value.description.length > 0
      ? value.description
      : null;

  // Owner type guard
  const owner = value.owner;
  const isUser =
    (owner as AutoViewInputSubTypes.simple_user).login !== undefined;

  const ownerName = isUser
    ? (owner as AutoViewInputSubTypes.simple_user).name ||
      (owner as AutoViewInputSubTypes.simple_user).login
    : (owner as AutoViewInputSubTypes.enterprise).name;

  const ownerAvatarUrl = owner.avatar_url;
  const ownerAltText = isUser
    ? (owner as AutoViewInputSubTypes.simple_user).login
    : ownerName;

  // 2. JSX structure
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        {/* Integration Name */}
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.name}
        </h2>

        {/* Slug */}
        {value.slug && (
          <p className="mt-1 text-sm text-gray-500">
            <span className="font-medium">Slug:</span> {value.slug}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="mt-3 text-gray-600 line-clamp-3">{description}</p>
        )}

        {/* Key Details */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span className="ml-1">Created: {createdAt}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span className="ml-1">Updated: {updatedAt}</span>
          </div>
          {typeof value.installations_count === "number" && (
            <div className="flex items-center">
              <LucideReact.Users size={16} className="text-gray-400" />
              <span className="ml-1">
                Installations: {value.installations_count}
              </span>
            </div>
          )}
          <div className="flex items-center col-span-full">
            <LucideReact.Link size={16} className="text-gray-400" />
            <a
              href={value.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 break-all text-blue-600 hover:underline"
            >
              {value.html_url}
            </a>
          </div>
        </div>

        {/* Owner Info */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Owner</h3>
          <div className="flex items-center">
            {ownerAvatarUrl ? (
              <img
                src={ownerAvatarUrl}
                alt={ownerAltText}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(ownerAltText) +
                    "&background=ddd&color=555";
                }}
              />
            ) : (
              <LucideReact.User size={24} className="text-gray-400" />
            )}
            <div className="ml-3">
              <p className="text-gray-700 font-medium truncate">{ownerName}</p>
              <span className="text-xs text-gray-500 px-1.5 py-0.5 bg-gray-100 rounded">
                {isUser ? "User" : "Enterprise"}
              </span>
            </div>
          </div>
        </div>

        {/* Permissions */}
        {value.permissions &&
          Object.keys(value.permissions).length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Permissions
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(value.permissions).map(
                  ([perm, level]) => (
                    <span
                      key={perm}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {perm}: {level}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

        {/* Events */}
        {value.events && value.events.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-800 mb-2">
              Events
            </h3>
            <div className="flex flex-wrap gap-2">
              {value.events.map((evt) => (
                <span
                  key={evt}
                  className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded"
                >
                  {evt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
