import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The status of a deployment.
     *
     * @title Deployment Status
    */
    export interface deployment_status {
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The state of the status.
        */
        state: "error" | "failure" | "inactive" | "pending" | "success" | "queued" | "in_progress";
        creator: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * A short description of the status.
        */
        description: string & tags.Default<"">;
        /**
         * The environment of the deployment that the status is for.
        */
        environment?: string & tags.Default<"">;
        /**
         * Closing down notice: the URL to associate with this status.
        */
        target_url: string & tags.Default<"">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        deployment_url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
        /**
         * The URL for accessing your environment.
        */
        environment_url?: string & tags.Default<"">;
        /**
         * The URL to associate with this status.
        */
        log_url?: string & tags.Default<"">;
        performed_via_github_app?: AutoViewInputSubTypes.nullable_integration;
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
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
    } | null;
    /**
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type nullable_integration = {
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
export type AutoViewInput = AutoViewInputSubTypes.deployment_status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString();
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString();

  // Map deployment state to an appropriate icon and color
  const stateIcon = (() => {
    switch (value.state) {
      case "success":
        return <LucideReact.CheckCircle size={20} className="text-green-500" />;
      case "failure":
        return <LucideReact.XCircle size={20} className="text-red-500" />;
      case "error":
        return <LucideReact.AlertTriangle size={20} className="text-red-500" />;
      case "inactive":
        return <LucideReact.MinusCircle size={20} className="text-gray-500" />;
      case "pending":
        return <LucideReact.Clock size={20} className="text-amber-500" />;
      case "queued":
      case "in_progress":
        return <LucideReact.Loader size={20} className="animate-spin text-blue-500" />;
      default:
        return <LucideReact.HelpCircle size={20} className="text-gray-400" />;
    }
  })();

  // Creator information
  const creator = value.creator;
  const creatorName = creator ? (creator.name ?? creator.login) : "Unknown";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName
  )}&background=random`;

  // Description with default
  const description = value.description?.trim() || "No description provided.";

  // Environment label
  const environmentLabel = value.environment?.trim() || "production";

  // Performed via GitHub App
  const integration = value.performed_via_github_app;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: State and Environment */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {stateIcon}
          <span className="ml-2 text-lg font-semibold capitalize text-gray-800">
            {value.state.replace(/_/g, " ")}
          </span>
        </div>
        <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
          {environmentLabel}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-gray-700 line-clamp-2">{description}</p>

      {/* Creator */}
      <div className="flex items-center mb-4">
        <img
          src={creator?.avatar_url ?? avatarFallback}
          alt={creatorName}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = avatarFallback;
          }}
        />
        <span className="ml-2 text-sm text-gray-600">{creatorName}</span>
      </div>

      {/* Timestamps and URLs */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">Created: {formattedCreatedAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">Updated: {formattedUpdatedAt}</span>
        </div>
        {value.target_url && (
          <div className="flex items-center">
            <LucideReact.Link size={16} className="text-gray-400" />
            <span className="ml-1 truncate">{value.target_url}</span>
          </div>
        )}
      </div>

      {/* Performed via GitHub App */}
      {integration && (
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <LucideReact.Github size={16} className="text-gray-400" />
          <span className="ml-1">{integration.name}</span>
        </div>
      )}
    </div>
  );
}
