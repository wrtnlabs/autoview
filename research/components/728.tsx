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
  const stateLabel = value.state
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
  // Select appropriate icon and color for status
  const stateIcon = (() => {
    switch (value.state) {
      case 'error':
      case 'failure':
        return <LucideReact.AlertTriangle size={16} className="text-red-500" />;
      case 'inactive':
        return <LucideReact.MinusCircle size={16} className="text-gray-500" />;
      case 'pending':
      case 'queued':
        return <LucideReact.Clock size={16} className="text-amber-500" />;
      case 'in_progress':
        return <LucideReact.Loader size={16} className="animate-spin text-blue-500" />;
      case 'success':
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      default:
        return <LucideReact.HelpCircle size={16} className="text-gray-400" />;
    }
  })();
  // Creator info
  const creatorName = value.creator?.name ?? value.creator?.login ?? 'Unknown';
  const avatarSrc =
    value.creator?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(creatorName)}&background=ccc&color=fff`;
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm space-y-4">
      {/* Header: Status and Creation Time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {stateIcon}
          <span className="text-lg font-semibold text-gray-800">{stateLabel}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <LucideReact.Calendar size={14} />
          <span>{formattedCreatedAt}</span>
        </div>
      </div>
      {/* Description */}
      <p className="text-gray-700 text-sm line-clamp-3">
        {value.description || 'No description provided.'}
      </p>
      {/* Environment Badge */}
      {value.environment && (
        <div className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
          {value.environment}
        </div>
      )}
      {/* Links */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate block max-w-xs">{value.target_url || '—'}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate block max-w-xs">{value.repository_url}</span>
        </div>
        {value.deployment_url && (
          <div className="flex items-center gap-1">
            <LucideReact.Link size={16} className="text-gray-400" />
            <span className="truncate block max-w-xs">{value.deployment_url}</span>
          </div>
        )}
        {value.log_url && (
          <div className="flex items-center gap-1">
            <LucideReact.FileText size={16} className="text-gray-400" />
            <span className="truncate block max-w-xs">{value.log_url}</span>
          </div>
        )}
      </div>
      {/* Performed Via GitHub App */}
      {value.performed_via_github_app && (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <LucideReact.Github size={16} className="text-gray-500" />
          <span>{value.performed_via_github_app.name}</span>
        </div>
      )}
      {/* Creator */}
      {value.creator && (
        <div className="flex items-center gap-2">
          <img
            src={avatarSrc}
            alt={creatorName}
            onError={(e) =>
              ((e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                creatorName,
              )}&background=ccc&color=fff`))
            }
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800">{creatorName}</span>
        </div>
      )}
      {/* Footer: Last Updated */}
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <LucideReact.Calendar size={12} />
        <span>Updated: {formattedUpdatedAt}</span>
      </div>
    </div>
  );
}
