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
export type AutoViewInput = AutoViewInputSubTypes.deployment_status[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getStateIcon = (state: AutoViewInputSubTypes.deployment_status['state']) => {
    switch (state) {
      case 'success':
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case 'pending':
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      case 'in_progress':
        return <LucideReact.Loader className="animate-spin text-blue-500" size={16} />;
      case 'queued':
        return <LucideReact.Clock className="text-gray-500" size={16} />;
      case 'failure':
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      case 'error':
        return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      case 'inactive':
        return <LucideReact.PauseCircle className="text-gray-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-500" size={16} />;
    }
  };

  // 2. Handle empty or missing data
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No deployment statuses available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((status) => {
        const displayState = status.state
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <div
            key={status.id}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:justify-between"
          >
            {/* State Indicator */}
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              {getStateIcon(status.state)}
              <span className="font-medium">{displayState}</span>
            </div>

            {/* Description & Metadata */}
            <div className="flex-1 px-2">
              <p className="text-gray-700 text-sm line-clamp-2">
                {status.description || 'No description provided.'}
              </p>
              <div className="flex items-center text-gray-500 text-xs mt-2 space-x-4">
                {status.creator && (
                  <div className="flex items-center gap-1">
                    <img
                      src={status.creator.avatar_url}
                      alt={status.creator.login}
                      className="w-6 h-6 rounded-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          status.creator?.login ?? ''
                        )}&background=0D8ABC&color=fff`;
                      }}
                    />
                    <span>{status.creator.login}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={14} />
                  <span>Created: {formatDate(status.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.Edit2 size={14} />
                  <span>Updated: {formatDate(status.updated_at)}</span>
                </div>
              </div>
            </div>

            {/* Links & Tags */}
            <div className="mt-2 sm:mt-0 flex items-center gap-4 flex-wrap">
              {status.environment && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {status.environment}
                </span>
              )}
              {status.target_url && (
                <div className="flex items-center gap-1 text-gray-500 text-xs truncate max-w-xs">
                  <LucideReact.Link size={14} />
                  <span className="truncate">{status.target_url}</span>
                </div>
              )}
              {status.log_url && (
                <div className="flex items-center gap-1 text-gray-500 text-xs truncate max-w-xs">
                  <LucideReact.FileText size={14} />
                  <span className="truncate">{status.log_url}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
