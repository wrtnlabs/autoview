import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The status of a deployment.
     *
     * @title Deployment Status
    */
    export type deployment_status = {
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
    };
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
        owner: any | any;
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
    export type simple_user = any;
    export type enterprise = any;
}
export type AutoViewInput = AutoViewInputSubTypes.deployment_status[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateColorMap: Record<string, string> = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    failure: "bg-red-100 text-red-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    queued: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((status) => {
        const badgeClasses =
          stateColorMap[status.state] || "bg-gray-100 text-gray-800";
        const createdAt = new Date(status.created_at).toLocaleString();
        const updatedAt = new Date(status.updated_at).toLocaleString();
        const description = status.description?.trim() || "";
        return (
          <div
            key={status.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {status.creator && (
                  <img
                    src={status.creator.avatar_url}
                    alt={status.creator.login}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {status.creator?.login || "Unknown"}
                  </span>
                  <span className="text-xs text-gray-500">{createdAt}</span>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${badgeClasses}`}
              >
                {status.state.replace(/_/g, " ")}
              </span>
            </div>
            {description && (
              <p className="mt-2 text-gray-700 line-clamp-2">{description}</p>
            )}
            {status.environment && status.environment.length > 0 && (
              <div className="mt-2">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded">
                  {status.environment}
                </span>
              </div>
            )}
            <div className="mt-3 text-xs text-gray-500">
              Updated: {updatedAt}
            </div>
          </div>
        );
      })}
    </div>
  );
}
