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
  // Handle missing data
  if (!value) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <span className="mt-2 text-lg">No Data Available</span>
      </div>
    );
  }

  // Data transformations & derived values
  const integration = value;
  const name = integration.name;
  const description = integration.description?.trim() || "No description provided";
  const createdDate = new Date(integration.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(integration.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const permissionKeys = Object.keys(integration.permissions);
  const displayedPermissions = permissionKeys.slice(0, 5);
  const extraPermissionsCount = permissionKeys.length - displayedPermissions.length;
  const eventsCount = integration.events.length;
  const installationsCount = integration.installations_count ?? 0;

  // Owner details (simple_user vs enterprise)
  const owner = integration.owner;
  let ownerName: string;
  let ownerAvatar: string;
  let ownerUrl: string;
  if ("login" in owner) {
    ownerName = owner.login;
    ownerAvatar = owner.avatar_url;
    ownerUrl = owner.html_url;
  } else {
    ownerName = owner.name;
    ownerAvatar = owner.avatar_url;
    ownerUrl = owner.html_url;
  }
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    ownerName
  )}&background=random&color=fff`;

  // JSX structure
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <LucideReact.Box size={24} className="text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800 truncate">{name}</h2>
      </div>

      {/* Owner */}
      <div className="flex items-center gap-2">
        <img
          src={ownerAvatar}
          alt={ownerName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = avatarFallback;
          }}
          className="w-8 h-8 rounded-full object-cover"
        />
        <a
          href={ownerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-700 hover:underline"
        >
          {ownerName}
        </a>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

      {/* Dates */}
      <div className="flex items-center gap-4 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Updated: {updatedDate}</span>
        </div>
      </div>

      {/* Permissions */}
      <div className="flex flex-wrap items-center gap-2">
        {displayedPermissions.map((perm) => (
          <span
            key={perm}
            className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
          >
            {perm}
          </span>
        ))}
        {extraPermissionsCount > 0 && (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
            +{extraPermissionsCount} more
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <LucideReact.List size={16} />
          <span>{eventsCount} events</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} />
          <span>{installationsCount} installs</span>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2">
        <a
          href={integration.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-500 hover:underline"
        >
          <LucideReact.Link size={16} className="mr-1" />
          View on GitHub
        </a>
        <a
          href={integration.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-500 hover:underline"
        >
          <LucideReact.Link size={16} className="mr-1" />
          Homepage
        </a>
      </div>
    </div>
  );
}
